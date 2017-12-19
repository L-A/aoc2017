import input from "./inputs/day18"
const instructions = input.default.split("\n").map(x => x.split(" "))

const v = (register, i) => {
  if (typeof i == "number") { return i }
  else if (typeof i == "string" && parseInt(i, 10)) { return i * 1 }
  else if (register.hasOwnProperty(i)) { return register[i] * 1 }
  return 0
}

const setv = (register, i, val) => {
  register[i] = v(register, val)
}

let sent = 0

const execute = (instructions, register, pos = 0, queue, identity) => {
  let waiting = false
  while (pos < instructions.length && !waiting) {
    let line = instructions[pos]
    switch(line[0]) {
      case "set":
        setv(register, line[1], line[2])
      break

      case "add":
        setv(register, line[1], v(register, line[1]) + v(register, line[2]))
      break

      case "mul":
        setv(register, line[1], v(register, line[1]) * v(register, line[2]))
      break

      case "mod":
        setv(register, line[1], v(register, line[1]) % v(register, line[2]))
      break

      case "jgz":
        if (v(register, line[1]) > 0) { pos += v(register, line[2]) - 1 }
      break

      case "snd":
        programs[!identity * 1].receive(v(register, line[1]))
        if (identity == 1) { sent++ }
      break

      case "rcv":
        if (queue.length > 0) {
          setv(register, line[1], queue.pop())
        } else {
          waiting = true
          pos--
        }
      break
    }
    pos++
  }
  return pos
}

let program = (p) => ({
  identity: p,
  register: {"p": p},
  position: 0,
  queue: [],
  receive (i) { this.queue.unshift(i) },
  waiting () { return instructions[this.position][0] == "rcv" && this.queue.length == 0 },
  step () { this.position = execute(instructions, this.register, this.position, this.queue, this.identity) },
})

let programs = [program(0), program(1)]

programs[0].step()

while (!programs[0].waiting() || !programs[1].waiting()) {
  if (programs[0].waiting()) { programs[1].step() }
  else if (programs[1].waiting()) { programs[0].step() }
}

console.log(sent)
