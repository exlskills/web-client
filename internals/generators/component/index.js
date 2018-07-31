/**
 * Component Generator
 */

/* eslint strict: ["off"] */

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => ['Stateless Function', 'ES6 Class (Pure)', 'ES6 Class']
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true
        }

        return 'The name is required'
      }
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?'
    }
  ],
  actions: data => {
    // Generate index.tsx and index.test.js
    let componentTemplate

    switch (data.type) {
      case 'ES6 Class': {
        componentTemplate = './component/es6.ts.hbs'
        break
      }
      case 'ES6 Class (Pure)': {
        componentTemplate = './component/es6.pure.ts.hbs'
        break
      }
      case 'Stateless Function': {
        componentTemplate = './component/stateless.ts.hbs'
        break
      }
      default: {
        componentTemplate = './component/es6.ts.hbs'
      }
    }

    const actions = [
      {
        type: 'add',
        path: '../../app/common/components/{{properCase name}}/index.tsx',
        templateFile: componentTemplate,
        abortOnFail: true
      }
      //   {
      //   type: 'add',
      //   path: '../../app/common/components/{{properCase name}}/tests/index.test.js',
      //   templateFile: './component/test.js.hbs',
      //   abortOnFail: true,
      // }
    ]

    // If they want a i18n messages file
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/common/components/{{properCase name}}/messages.ts',
        templateFile: './component/messages.ts.hbs',
        abortOnFail: true
      })
    }

    return actions
  }
}
