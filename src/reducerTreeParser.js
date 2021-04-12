/**
 * Copyright (c) 2020-present Ruben Arushanyan (https://github.com/ruben-arushanyan)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const {
    isFunction,
    isObject,
} = require('./utils')

const reducerTreeParser = (reducer_tree, reducer_name='') => {
    const handlers = {}
    const findHandlers = (tree_branch, prefix='') => {
        if (isObject(tree_branch)) {
            for (const [key, value] of Object.entries(tree_branch)) {
                const type = prefix ? `${prefix}/${key}` : key
                if (isFunction(value)) {
                    handlers[type] = value
                    if (reducer_name) {
                        handlers[`${reducer_name}/${type}`] = value
                    }
                } else {
                    findHandlers(value, type)
                }
            }
        }
    }

    findHandlers(reducer_tree)
    return handlers
}

module.exports = reducerTreeParser