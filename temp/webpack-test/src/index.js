// var flattenDeep = require('lodash.flattendeep');
import flattenDeep from 'lodash.flattendeep'

// function flattenDeepAMS(...arr) {
//     let str = arr.toString();
//     const newArr = [...(new Set(str.split(',')))];
//     return newArr;
// }
// // const a = [[1, 2, 3, 4, 5], [1, [2], [3, [[4]]], [5, 6]]]
// // console.warn(flattenDeepAMS(a));
// c.warn(b1 = new Set(a1));

// console.warn(new Set(flattenDeep([[1, 2, 3, 4, 5], [1, [2], [3, [[4]]], [5, 6]]])));
// let a2 = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7];
// console.log(Math.random())

// console.log(Math.random())
function snake(a) {
    let x0 = 0, y0 = 0, ciklStart = 0, ciklFinish = 0
    let arr1 = []
    let j = 0
    for (let i = 0; i < a; i++) {
        arr1[i] = []
        for (let j = 0; j < a; j++) {
            arr1[i][j] = "a";


        }

    } x0 = 0;
    let constI = 0, constJ = 0
    for (let i = 0; i < a; i++) {
        if (x0 > a - 2) { x0 -= a }
        if (x0 == 0) {
            for (j = 0; j < a; j++) {
                arr1[y0][j] = ciklStart + 1 + j
            }
            ciklFinish += j
            ciklStart = ciklFinish
            x0++;
            if (x0 == 1) {
                for (j = 0; j < a; j++) {
                    arr1[j][a - x0] = j + ciklStart
                }
                x0++
                ciklFinish += j
                ciklStart = ciklFinish
            }
            if (x0 == 2) {
                for (j = 0; j < a; j++) {
                    arr1[a - x0 + 1][a - j - 1 - y0] = ciklStart + j - 1
                }
                ciklFinish += j
                ciklStart = ciklFinish
                x0++;
            }
            if (x0 == 3) {
                y0++
                for (j = 0; j < a - y0; j++) {
                    arr1[a - 1 - j][y0 - 1] = ciklStart + j - 2
                }
                ciklFinish += j
                ciklStart = ciklFinish
                x0++;
            }
        }

    }
    return arr1
}
console.log(snake(5))