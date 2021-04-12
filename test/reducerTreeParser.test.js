/**
* Copyright (c) 2020-present Ruben Arushanyan (https://github.com/ruben-arushanyan)
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
* 
*/

////////////////////////// TEST ////////////////////////////

const reducerTreeParser = require('../src/reducerTreeParser.js')

const f1 = () => 1
const f2 = () => 2
const f3 = () => 3
const f4 = () => 4
const f5 = () => 5

const reducer_tree = {
    A1: {
        A2: 4,
        B2:{
            A3: f1,
            B3: {
                A4:f2,
                B4: f3,
            },
            C3: {}
        },
    },
    B1: {
        A2: f4,
        B2: f5,
    },
    C1: {},
    D1: "str"
}

const empty_reducer_tree = {}
const no_object_reducer_tree = "no_object_reducer_tree"

test('Reducer Tree Parser Test', () => {
    expect(reducerTreeParser(reducer_tree, 'books'))
    .toEqual({
        'A1/B2/A3': f1,
        'books/A1/B2/A3': f1,
        'A1/B2/B3/A4': f2,
        'books/A1/B2/B3/A4': f2,
        'A1/B2/B3/B4': f3,
        'books/A1/B2/B3/B4': f3,
        'B1/A2': f4,
        'books/B1/A2': f4,
        'B1/B2': f5,
        'books/B1/B2': f5,
    })

    expect(reducerTreeParser(empty_reducer_tree, 'books'))
    .toEqual({})

    expect(reducerTreeParser(no_object_reducer_tree, 'books'))
    .toEqual({})
})
