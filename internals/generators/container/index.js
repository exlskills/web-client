/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
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
      type: 'list',
      name: 'component',
      message: 'Select a base component:',
      default: 'PureComponent',
      choices: () => ['PureComponent', 'Component']
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?'
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/selectors/reducer tuple for this container?'
    },
    {
      type: 'confirm',
      name: 'wantSagas',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)'
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
    const actions = [
      {
        type: 'add',
        path: '../../app/pages/{{properCase name}}/index.tsx',
        templateFile: './container/index.tsx.hbs',
        abortOnFail: true
      },
      {
        type: 'add',
        path: '../../app/pages/{{properCase name}}/loader.ts',
        templateFile: './container/loader.ts.hbs',
        abortOnFail: true
      }

      //   {
      //   type: 'add',
      //   path: '../../app/pages/{{properCase name}}/tests/index.test.js',
      //   templateFile: './container/test.js.hbs',
      //   abortOnFail: true,
      // }
    ]

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/pages/{{properCase name}}/messages.ts',
        templateFile: './container/messages.ts.hbs',
        abortOnFail: true
      })
    }

    // If they want actions and a reducer, generate actions.ts, constants.ts,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../app/pages/{{properCase name}}/store/actions.ts',
        templateFile: './container/actions.ts.hbs',
        abortOnFail: true
      })
      // actions.push({
      //   type: 'add',
      //   path: '../../app/pages/{{properCase name}}/tests/actions.test.js',
      //   templateFile: './container/actions.test.js.hbs',
      //   abortOnFail: true,
      // });

      // Constants
      actions.push({
        type: 'add',
        path: '../../app/pages/{{properCase name}}/constants.ts',
        templateFile: './container/constants.ts.hbs',
        abortOnFail: true
      })

      // Selectors
      actions.push({
        type: 'add',
        path: '../../app/pages/{{properCase name}}/store/selectors.ts',
        templateFile: './container/selectors.ts.hbs',
        abortOnFail: true
      })
      // actions.push({
      //   type: 'add',
      //   path: '../../app/pages/{{properCase name}}/tests/selectors.test.js',
      //   templateFile: './container/selectors.test.js.hbs',
      //   abortOnFail: true,
      // });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../app/pages/{{properCase name}}/store/reducer.ts',
        templateFile: './container/reducer.ts.hbs',
        abortOnFail: true
      })
      // actions.push({
      //   type: 'add',
      //   path: '../../app/pages/{{properCase name}}/tests/reducer.test.js',
      //   templateFile: './container/reducer.test.js.hbs',
      //   abortOnFail: true,
      // });
    }

    // Sagas
    if (data.wantSagas) {
      actions.push({
        type: 'add',
        path: '../../app/pages/{{properCase name}}/store/sagas.ts',
        templateFile: './container/sagas.ts.hbs',
        abortOnFail: true
      })
      // actions.push({
      //   type: 'add',
      //   path: '../../app/pages/{{properCase name}}/tests/sagas.test.js',
      //   templateFile: './container/sagas.test.js.hbs',
      //   abortOnFail: true,
      // });
    }

    return actions
  }
}
