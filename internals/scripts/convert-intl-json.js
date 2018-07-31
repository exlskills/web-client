/* eslint-disable */
/**
 * This script will convert the CSVs back into .json format.
 */
const fs = require('fs')
const nodeGlob = require('glob')
const transform = require('babel-core').transform
const path = require('path')
const animateProgress = require('./helpers/progress')
const addCheckmark = require('./helpers/checkmark')

const pkg = require('../../package.json')

require('shelljs/global')

// Glob to match all ts files except test files
const CSV_FILE = process.argv[2]

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
const readFile = fileName =>
  new Promise((resolve, reject) => {
    fs.readFile(
      fileName,
      'utf8',
      (error, value) => (error ? reject(error) : resolve(value))
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

const localeMappings = {}
const extractFromFile = async fileName => {
  try {
    var translations = await readFile(fileName)
    // Process csv
    var allTextLines = translations.split(/\r\n|\n/)
    var headers = allTextLines[0].split(',')
    for (let i = 1; i < headers.length; i++) {
      let locale = headers[i]
      localeMappings[locale] = {}
    }
    for (let i = 1; i < allTextLines.length; i++) {
      var data = allTextLines[i].split(',')
      if (data.length == headers.length) {
        // Key is first column
        let key = data[0]
        for (let j = 1; j < headers.length; j++) {
          let locale = headers[j]
          localeMappings[locale][key] = data[j]
        }
      }
    }
  } catch (error) {
    if (error.code == 'ENOENT') {
      process.stderr.write(`\nError: Invalid file path\n`)
      process.exit()
    }
  }
}

async function main() {
  if (!CSV_FILE) {
    console.log('Please enter a file path')
    process.exit()
  }
  const extractTaskDone = task('Extracting csv file')
  // Extract file specified in argument
  await extractFromFile(CSV_FILE)
  extractTaskDone()

  // Make the directory if it doesn't exist, especially for first run
  mkdir('-p', 'app/translations/csv')

  var csvContent = ''
  for (let locale of Object.keys(localeMappings)) {
    const localeTaskDone = task(`Writing to file ${locale}`)
    try {
      // Sort the translation JSON file so that git diffing is easier
      // Otherwise the translation messages will jump around every time we extract
      let messages = {}
      Object.keys(localeMappings[locale]).sort().forEach(function(key) {
        messages[key] = localeMappings[locale][key]
      })

      // Write to file the JSON representation of the translation messages
      const prettified = `${JSON.stringify(messages, null, 2)}\n`
      await writeFile(path.resolve(__dirname + `/../../${locale}`), prettified)
      localeTaskDone()
    } catch (error) {
      localeTaskDone(`Error: ${error}`)
    }
  }
  process.exit()
}

main()
