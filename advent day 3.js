const layerOf = (num) => {
  let layer = 1;
  while (num > layer * layer) {
    layer += 2;
  }
  return (layer - 1) / 2
}

const distanceFromCenter = (num) => {
  let layer = layerOf(num) // What's the layer this number is on? Translates to axis-wise movement.
  let sideDimension = layer * 2 + 1 // How large is a side on this layer?
  let layerArea = (sideDimension - 1) * 4 // How many values are in this layer, total?
  let maxLayerValue = sideDimension * sideDimension
  let minLayerValue = maxLayerValue - layerArea

  let side = Math.ceil((num - minLayerValue) / (sideDimension - 1)) // nth side, from 1 to 4

  // Value at the very center of the target side (= 0 cross-axis movement, aligned with "1")
  let sideCenterValue = minLayerValue + (side * (sideDimension - 1)) - (sideDimension - 1) / 2

  // How far is our value from the center value?
  let crossDistance = Math.abs(num - sideCenterValue)

  return layer + crossDistance
}

// Note: The center layer (0) has no "sides" per se,
// and asking for the layer for 1 returns NaN due to the assumptions I'm using

console.log(distanceFromCenter(2)) // 1
console.log(distanceFromCenter(25)) // 4
console.log(distanceFromCenter(277678)) // 475
