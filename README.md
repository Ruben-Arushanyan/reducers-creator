# Reducers Creator

> ###  **If you want to use it in `redux` projects, please look at this package: [Redux Cool](https://github.com/ruben-arushanyan/redux-cool)**


## Description
**`Reducers Creator`** is an awesome tiny javascript package that allows you to easily and intuitively create reducer functions. Mainly used to create redux reducers. See: [Redux Cool](https://github.com/ruben-arushanyan/redux-cool)

## Installation

```bash
npm install reducers-creator
```

## Getting Started

Create a file named `src/accountReducer.js`

*src/accountReducer.js*
```javascript
import reducersCreator from "reducers-creator"

const initialState = {
    profile: {
        data: null
    }
}

const reducerTree = {
    PROFILE: {
        SET: (state, action) => {
            const [data] = action.args
            state.profile.data = data
        },
        UPDATE_EMAIL: (state, action) => {
            const [email] = action.args
            state.profile.data.email = email
        }
    },
    CLEAR: (state, action) => {
        state.profile.data = null
    }
}

const accountReducer = reducersCreator(
    "ACCOUNT",
    initialState,
    reducerTree,
)

export default accountReducer

```
As you can see in the example above, we create an **`accountReducer`** by calling the `reducersCreator` function and passing it three arguments:

- **`"ACCOUNT"`** : It's the **name** of the reducer, it can be any `String`
- **`initialState`** : It's the **initial state** of the reducer, it can be any `Object`
- **`reducerTree`** : It's an `Object` *(can have any deep and nested structure)* that intuitively and in readible ways, defines `handler functions` for reducer. `Handler functions` as an argument take `state` and `action` and update the state. It automatically uses the [immer library](https://immerjs.github.io/immer/) to do **immutable updates** with normal mutative code, like `state.profile.data.email = email`. There is no need to manually do immutable updates and return the result. If you are not familiar with the [immer library](https://immerjs.github.io/immer/), please look at it, it is very important.

As a result, we get the **`accountReducer`** function, which can handle the following type of actions:
- types: `"PROFILE/SET"` or `"ACCOUNT/PROFILE/SET"`
- types: `"PROFILE/UPDATE_EMAIL"` or `"ACCOUNT/PROFILE/UPDATE_EMAIL"`
- types: `"CLEAR"` or `"ACCOUNT/CLEAR"`

As you can see, each handler can work with **two** types of actions, one consisting of the path described in *reducerTree*, the second is the same as the first type plus the reducer name that should be added from the beginning like `"CLEAR"` and `"ACCOUNT/CLEAR"`. That is the most important and useful feature of this library.
### In both cases (`"CLEAR"` and `"ACCOUNT/CLEAR"`), the **CLEAR** handler is called in the **accountReducer**, but when we have multiple reducers that have the **CLEAR** handler and we need to clear the state of all reducers, we must use `"CLEAR"` action type, but if we need to delete only the **ACCOUNT** reducer state we must use the `"ACCOUNT/CLEAR"` action type.

<br/>

Now for the test, you can use [Redux](https://github.com/ruben-arushanyan/redux-cool), but in this doc, we will create a custom `createStore` function for testing.

To easily create actions, please install [Actions Creator](https://github.com/ruben-arushanyan/actions-creator) library
```bash
npm install actions-creator
```
Create a file named **src/test.js**

*src/test.js*
```javascript
import accountReducer from "./accountReducer.js"
import actionsCreator from "actions-creator"

// Store Creator Function
function createStore(reducer) {
    let prevState
    let currentState = reducer()
    return {
        dispatch(action) {
            prevState = currentState
            currentState = reducer(currentState, action)
        },
        getState() {
            return currentState
        },
        getPrevState() {
            return prevState
        }
    }
}

// Create Store
const store = createStore(accountReducer)

// Dispatch Set Profile Action
store.dispatch(actionsCreator.PROFILE.SET({
        email: 'test@test',
        name: 'Test'
    })
)
console.log(store.getState())
// {
//     profile: {
//         data: {email: 'test@test', name: 'Test'}
//     }
// }


// Dispatch Update Email Action
store.dispatch(actionsCreator.PROFILE.UPDATE_EMAIL('test2@test2'))
console.log(store.getState())
// {
//     profile: {
//         data: {email: 'test2@test2', name: 'Test'}
//     }
// }



// Dispatch Clear Email Action
store.dispatch(actionsCreator.CLEAR())
console.log(store.getState())
// {
//     profile: {
//         data: null
//     }
// }

```


## API


### **`reducersCreator(name, initialState, reducerTree)`**
<br/>

- **`name`** \<String> **name** of the reducer, it can be any `String`
- **`initialState`** \<Object> **initial state** of the reducer, it can be any `Object`
- **`reducerTree`** \<Object> object *(can have any deep and nested structure)* that intuitively and in readible ways, defines `handler functions` for reducer. `Handler functions` as an argument take `state` and `action` and update the state. It automatically uses the [immer library](https://immerjs.github.io/immer/) to do **immutable updates** with normal mutative code, like `state.profile.data.email = email`. There is no need to manually do immutable updates and return the result. If you are not familiar with the [immer library](https://immerjs.github.io/immer/), please look at it, it is very important.

<hr/>

## Maintainers

- [Ruben Arushanyan](https://github.com/ruben-arushanyan)

<hr/>

## License
[MIT](https://github.com/ruben-arushanyan/reducers-creator/blob/master/LICENSE)
