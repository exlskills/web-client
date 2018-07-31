/* eslint-disable */
/**
 * This script will extract the message IDs from the app/translations/*.json files into csvs.
 */
const fs = require('fs')
const nodeGlob = require('glob')
const transform = require('babel-core').transform
const animateProgress = require('./helpers/progress')
const addCheckmark = require('./helpers/checkmark')

const pkg = require('../../package.json')

require('shelljs/global')

// Glob to match all ts files except test files
const FILES_TO_PARSE = 'app/translations/*.json'
const savePath = process.argv[2]

const newLine = () => process.stdout.write('\n')
const mergedFiles = {}
const locales = []

// Progress Logger
let progress
const task = message => {
  progress = animateProgress(message)
  process.stdout.write(message)

  return error => {
    if (error) {
      process.stderr.write(error)
    }
    clearTimeout(progress)
    return addCheckmark(() => newLine())
  }
}

// Wrap async functions below into a promise
const glob = pattern =>
  new Promise((resolve, reject) => {
    nodeGlob(
      pattern,
      (error, value) => (error ? reject(error) : resolve(value))
    )
  })

const readFile = fileName =>
  new Promise((resolve, reject) => {
    fs.readFile(
      fileName,
      (error, value) => (error ? reject(error) : resolve(JSON.parse(value)))
    )
  })

const writeFile = (fileName, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      fileName,
      data,
      (error, value) => (error ? reject(error) : resolve(value))
    )
  })

const extractFromFile = async fileName => {
  try {
    const translationFile = await readFile(fileName)
    Object.keys(translationFile).forEach(function(key) {
      if (!mergedFiles[key]) {
        mergedFiles[key] = {}
      }
      mergedFiles[key][fileName] = translationFile[key]
    })
  } catch (error) {
    process.stderr.write(`Error transforming file: ${fileName}\n${error}`)
  }
}

async function main() {
  if (!savePath) {
    console.log('Please enter a file path')
    process.exit()
  } else if (savePath.slice(-4) !== '.csv') {
    console.log('File extension not .csv')
    process.exit()
  }
  const memoryTaskDone = task('Storing translation files in memory')
  const files = await glob(FILES_TO_PARSE)
  memoryTaskDone()

  const extractTaskDone = task('Run extraction on all files')
  // Run extraction on all .json translation files that match the glob on line 16
  await Promise.all(files.map(fileName => extractFromFile(fileName)))
  extractTaskDone()

  // Make the directory if it doesn't exist, especially for first run
  const localeTaskDone = task(`Writing csvs`)
  try {
    // Sort the translation JSON file so that git diffing is easier
    // Otherwise the translation messages will jump around every time we extract
    var csvContent = ''
    Object.keys(mergedFiles).sort().forEach(function(key) {
      let arr = []
      Object.keys(mergedFiles[key]).sort().forEach(function(locale) {
        if (locales.indexOf(locale) == -1) {
          locales.push(locale)
        }
        arr.push(mergedFiles[key][locale])
      })
      csvContent += key + ',' + arr.join(',') + '\n'
    })
    const headers = 'messageID,' + locales.join(',') + '\n'
    csvContent = headers + csvContent

    // Write to file the JSON representation of the translation messages
    // const prettified = `${JSON.stringify(messages, null, 2)}\n`;

    await writeFile(savePath, csvContent)

    localeTaskDone()
  } catch (error) {
    localeTaskDone(`Error: ${error}`)
  }

  process.exit()
}

main()
