const particles = require('fs').readFileSync("./inputs/day20.txt").toString()

let accelRegexGlobal = /a=<(.*?)>/g,
    accelRegex       = /a=<(.*?)>/,
    velocityRegex    = /v=<(.*?)>/,
    positionRegex    = /p=<(.*?)>/

let speed, lowestSpeed = 10000,
    currentParticle = 0, slowestParticle = 0

// All that matters for part 1 is how slow the particle accelerates away from the center

do {
  speed = accelRegexGlobal.exec(particles)
  if (speed != undefined) {
    speed = speed[1].split(",").reduce((a, v) => Math.abs(a * 1) + Math.abs(v * 1))
    if (speed < lowestSpeed) {
      lowestSpeed = speed
      slowestParticle = currentParticle
    }
    currentParticle ++
    }
} while (speed)

// Part 1
console.log("Slowest: " + slowestParticle)

// Now map them all out
let ps = particles.split("\n").map(line => {
  return {
    p: line.match(positionRegex)[1].split(",").map(x => parseInt(x)),
    a: line.match(accelRegex)[1].split(",").map(x => parseInt(x)),
    v: line.match(velocityRegex)[1].split(",").map(x => parseInt(x))
  }
  positionRegex.lastIndex=0
})

// Add A to V, then add V to P

const tick = (particles) => {
  let occupiedOnce = [], collision = []

  particles = particles.map(particle => {
    particle.p.forEach((_, i) => {
      particle.v[i] += particle.a[i]
      particle.p[i] += particle.v[i]
    })
    if (occupiedOnce.indexOf(particle.p.join()) != -1) {
      collision.push(particle.p.join())
    }
    occupiedOnce.push(particle.p.join())
    return particle
  })

  return particles.filter( particle => collision.indexOf(particle.p.join()) == -1 )
}

let i = 0
while (i < 300) { // They get away from the center fast, this is more than enough
  ps = tick(ps)
  i++
}

// Part 2
console.log(ps.length)
