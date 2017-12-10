const list =  [...Array(256).keys()] //[0,1,2,3,4]
const input = [120,93,0,90,5,80,129,74,1,165,204,255,254,2,50,113] //[3, 4, 1, 5]

// Part 1

const circularSlice = (array, index, length) => {
  let hasOverflow = index + length >= array.length
  if (hasOverflow) {
    return (array.slice(index).concat(array.slice(0, index + length - array.length)))
  } else {
    return array.slice(index, index + length)
  }
}

const circularReplace = (array, arrayToInsert, position) => {
  let result = array.slice(0)
  for (let i = 0, l = arrayToInsert.length; i < l; i++) {
    result[(i + position) % array.length] = arrayToInsert[i]
  }
  return result
}

const knotHash = (array, input, rounds) => {
  let result = array.slice(0), skipSize = 0, position = 0
  while (rounds >= 1) {
    for (let length of input) {
      if (length <= result.length) {
        let temporaryArray = circularSlice(result, position, length).reverse()
        result = circularReplace(result, temporaryArray, position)
      }
      position = (position + length + skipSize++) % result.length
    }
    rounds--
  }
  return result
}

let transformedArray = knotHash(list, input, 1)

console.log(transformedArray[0] * transformedArray[1])

// Part 2
let t2 = list.slice(0)
let input2 = input.join(',').split('').map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23])

t2 = knotHash(t2, input2, 64)

let denseHash = (array) => {
  let result = []
  for (let i = 0; i <= 240; i += 16) {
    result.push(array.slice(i, i + 16).reduce((a,b) => a ^ b))
  }
  console.log(result)
  return result.map(num => ("0" + num.toString(16)).substr(-2)).join('') // "Left", uh "pad". It works for this.
}

console.log(denseHash(t2))
