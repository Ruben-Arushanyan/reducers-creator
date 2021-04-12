/**
* Copyright (c) 2020-present Ruben Arushanyan (https://github.com/ruben-arushanyan)
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
* 
*/



////////////////////////// TEST ////////////////////////////

const actionsCreator = require('actions-creator')
const reducersCreator = require('../src')

const initialState = {
    profile: {
		data: null
	},
    permissions: {
        data: null
    }
}


const reducer_tree = {
	PROFILE: {
        SET: (state, action) => {
            const [data] = action.args
            state.profile.data = data
        },
        UPDATE_EMAIL: (state, action) => {
            const [email] = action.args
            state.profile.data.email = email
        },
        CLEAR: (state, action) => {
            state.profile.data = null
        }
    }
}

// Create Reducer
const accountReducer = reducersCreator(
    'ACCOUNT',
    initialState,
    reducer_tree,
)

// Store Creator Function
function createStore(reducer) {
    let prevState = undefined
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

test('Reducers Creator Test', () => {
    
    store.dispatch(actionsCreator.PROFILE.SET({email: 'test1@test1.test1', name: 'Test1'}))
    let currentState = store.getState()
    let prevState = store.getPrevState()
    expect(currentState)
    .toEqual({
        profile: {
            data: {email: 'test1@test1.test1', name: 'Test1'}
        },
        permissions: {
            data: null
        }
    })
    expect(currentState.profile === prevState.profile).toBe(false)
    expect(currentState.permissions === prevState.permissions).toBe(true)

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

    store.dispatch(actionsCreator.ACCOUNT.PROFILE.SET({email: 'test2@test2.test2', name: 'Test2'}))
    currentState = store.getState()
    prevState = store.getPrevState()
    expect(currentState)
    .toEqual({
        profile: {
            data: {email: 'test2@test2.test2', name: 'Test2'}
        },
        permissions: {
            data: null
        }
    })
    expect(currentState.profile === prevState.profile).toBe(false)
    expect(currentState.permissions === prevState.permissions).toBe(true)

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

    store.dispatch(actionsCreator.ACCOUNT.PROFILE.UPDATE_EMAIL('test3@test3.test3'))
    currentState = store.getState()
    prevState = store.getPrevState()
    expect(currentState)
    .toEqual({
        profile: {
            data: {email: 'test3@test3.test3', name: 'Test2'}
        },
        permissions: {
            data: null
        }
    })
    expect(currentState.profile === prevState.profile).toBe(false)
    expect(currentState.permissions === prevState.permissions).toBe(true)


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

    store.dispatch(actionsCreator.ACCOUNT.PROFILE.CLEAR())
    currentState = store.getState()
    prevState = store.getPrevState()
    expect(currentState)
    .toEqual({
        profile: {
            data: null
        },
        permissions: {
            data: null
        }
    })
    expect(currentState.profile === prevState.profile).toBe(false)
    expect(currentState.permissions === prevState.permissions).toBe(true)
})
