/**
* Copyright (c) 2020-present Ruben Arushanyan (https://github.com/ruben-arushanyan)
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
* 
*/

const isFunction = (x) => typeof x === 'function'
const isString = (x) => typeof x === 'string'
const isObject = (x) => (typeof x === 'object') && (x !== null)
const isUndefined = (x) => typeof x === 'undefined'

module.exports = {
    isFunction,
    isString,
    isObject,
    isUndefined,
}

