let machine = {
  stepsLeft: 0,
  tape: {"0" : false},
  position: 0,
  state: 0,
  states: [ // I suppose I could have parsed the input
    { ifFalse: [true, true, 1], ifTrue: [false, false, 2] },
    { ifFalse: [true, false, 0], ifTrue: [true, true, 3] },
    { ifFalse: [true, true, 0], ifTrue: [false, false, 4] },
    { ifFalse: [true, true, 0], ifTrue: [false, true, 1] },
    { ifFalse: [true, false, 5], ifTrue: [true, false, 2] },
    { ifFalse: [true, true, 3], ifTrue: [true, true, 0] }
  ],
  read () { return this.tape[this.position] },
  write (v) { this.tape[this.position] = v },
  left () { this.position -= 1 },
  right () { this.position += 1 },
  step () {
    let stateInstructions = this.states[this.state][this.read() ? "ifTrue" : "ifFalse"]
    this.write(stateInstructions[0])
    if (stateInstructions[1]) { this.right() }
    else { this.left() }
    this.state = stateInstructions [2]
  },
  run (count) {
    this.stepsLeft = count
    while (this.stepsLeft > 0) {
      this.step()
      this.stepsLeft --
    }
    let checksum = 0
    for (let position in this.tape) {
      if (this.tape[position]) { checksum ++ }
    }
    return checksum
  }
}

console.log("Checksum:", machine.run(12173597))
