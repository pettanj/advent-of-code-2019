let parse_input = input => {
  let parsed = input.split(",").map(x => parseInt(x));
  return parsed;
};

let get_instruction = instruction => {
  let op = null;
  let mode1 = 0;
  let mode2 = 0;
  let mode3 = 0;
  if (instruction.length > 1) {
    op = instruction.slice(-1);
    let list = instruction.substring(0, instruction.length - 2).split("");
    if (list.length > 0) {
      mode1 = parseInt(list.pop());
    }
    if (list.length > 0) {
      mode2 = parseInt(list.pop());
    }
    if (list.length > 0) {
      mode3 = parseInt(list.pop());
    }
  } else {
    op = instruction.toString();
  }
  return { op, mode1, mode2, mode3 };
};

let execute_program = (program, input) => {
  // ip = instruction pointer
  let ip = 0;
  let outputs = [];
  while (ip < program.length) {
    let instruction = get_instruction(program[ip].toString());
    console.log(program[ip], instruction);
    if (instruction.op.toString() === "1") {
      program[program[ip + 3]] =
        (instruction.mode1 === 0 ? program[program[ip + 1]] : program[ip + 1]) +
        (instruction.mode2 === 0 ? program[program[ip + 2]] : program[ip + 2]);
      ip += 4;
    } else if (instruction.op.toString() === "2") {
      program[program[ip + 3]] =
        (instruction.mode1 === 0 ? program[program[ip + 1]] : program[ip + 1]) *
        (instruction.mode2 === 0 ? program[program[ip + 2]] : program[ip + 2]);
      ip += 4;
    } else if (instruction.op.toString() === "3") {
      if (instruction.mode1 === 0) {
        program[program[ip + 1]] = input;
      } else {
        program[ip + 1] = input;
      }
      ip += 2;
    } else if (instruction.op.toString() === "4") {
      outputs.push(
        instruction.mode1 === 0 ? program[program[ip + 1]] : program[ip + 1]
      );
      ip += 2;
    } else if (instruction.op.toString() === "5") {
      if (
        (instruction.mode1 === 0
          ? program[program[ip + 1]]
          : program[ip + 1]) !== 0
      ) {
        if (instruction.mode2 === 0) {
          ip = program[program[ip + 2]];
        } else {
          ip = program[ip + 2];
        }
      } else {
        ip += 3;
      }
    } else if (instruction.op.toString() === "6") {
      if (
        (instruction.mode1 === 0
          ? program[program[ip + 1]]
          : program[ip + 1]) === 0
      ) {
        if (instruction.mode2 === 0) {
          ip = program[program[ip + 2]];
        } else {
          ip = program[ip + 2];
        }
      } else {
        ip += 3;
      }
    } else if (instruction.op.toString() === "7") {
      let trueval =
        (instruction.mode1 === 0 ? program[program[ip + 1]] : program[ip + 1]) <
        (instruction.mode2 === 0 ? program[program[ip + 2]] : program[ip + 2]);
      program[program[ip + 3]] = trueval ? 1 : 0;
      ip += 4;
    } else if (instruction.op.toString() === "8") {
      let trueval =
        (instruction.mode1 === 0
          ? program[program[ip + 1]]
          : program[ip + 1]) ===
        (instruction.mode2 === 0 ? program[program[ip + 2]] : program[ip + 2]);
      program[program[ip + 3]] = trueval ? 1 : 0;
      ip += 4;
    } else if (instruction.op.toString() === "9") {
      break;
    } else {
      break;
    }
  }
  return outputs;
};

export default class Day1 {
  first = input => {
    const start = new Date();
    let program = parse_input(input);
    let result = execute_program(program, 1).pop();
    return { result, time: new Date() - start };
  };

  second = input => {
    const start = new Date();
    let program = parse_input(input);
    let result = execute_program(program, 5).pop();
    return { result, time: new Date() - start };
  };
}
