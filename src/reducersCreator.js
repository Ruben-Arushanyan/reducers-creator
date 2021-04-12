/**
 * Copyright (c) 2020-present Ruben Arushanyan (https://github.com/ruben-arushanyan)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */

const {
    produce,
} = require('immer')
const {
    isString,
    isUndefined,
    isObject,
} = require('./utils')
const reducerTreeParser = require('./reducerTreeParser')

const reducersCreator = (
    reducer_name,
    initial_state,
    reducer_tree,
) => {
    if (!isString(reducer_name)) {
        throw new TypeError('reducer name must be the String')
    }
    const reducerHandlers = reducerTreeParser(reducer_tree, reducer_name)

    return (state=initial_state, action) => {
        action = isObject(action) ? action : {}
        const type = String(action.type)
        if (reducerHandlers.hasOwnProperty(type)) {
            const reducerHandler = reducerHandlers[type]
            return produce(state, (draftState) => {
                const returnedValue = reducerHandler(draftState, action)
                if (!isUndefined(returnedValue)) {
                    return returnedValue
                }
            })
        } else {
            return state
        }
    }
}

module.exports = reducersCreator