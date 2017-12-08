import input from "./inputs/day7"

// Helpers and input setup

const flatInput = input.default.split("\n").map((s) => {
  let name = s.slice(0, s.indexOf(" "))
  let weight = s.slice(s.indexOf("(") + 1, s.indexOf(")")) * 1
  let children = s.indexOf(">") != -1 ? s.slice(s.indexOf(">") + 2).split(", ") : []

  return { name: name, weight: weight, childrenNames: children }
})

const childWithName = (name, array) => {
  let result = {}
  array.some((element) => {
    if(element.name == name) {
      result = element
      return true
    }
    return false
  })
  return result
}


const buildWithChildren = (childName, flatArray) => {
  let childObject = childWithName(childName, flatArray)
  if (childObject.childrenNames && childObject.childrenNames.length > 0) {
    childObject.children = []
    childObject.childrenNames.forEach((name) => {
      childObject.children.push(buildWithChildren(name, flatArray))
    })
  }
  delete childObject.childrenNames
  return childObject
}

const addWeightToObject = (obj) => {
  obj.combinedWeights = obj.weight
    if (obj.children) {
      obj.children.map((child) => {
        return addWeightToObject(child)
      })
      obj.children.forEach((child) => {
        obj.combinedWeights += child.combinedWeights
      })
    }
    return obj
  }

// There!
// (Part 1 was answered in 15 seconds of cmd+f in the browser)

let structuredInput = buildWithChildren("vtzay", flatInput)
let weightedInput = addWeightToObject(structuredInput)

// (Well, part 2 was answered after all this, but still just browsing the tree by hand in a few seconds)
// "lnpuarm" weights 918 and should weight 910 to balance it all – its children have the same weight
