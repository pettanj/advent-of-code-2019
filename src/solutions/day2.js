let parse_input = (input, initialValues) => {
  let parsed = input.split(",").map(x => parseInt(x));
  if (initialValues) {
    Object.entries(initialValues).forEach(x => {
      parsed[x[0]] = x[1];
    });
  }
  return parsed;
};

let execute_program = program => {
  // ip = instruction pointer
  let ip = 0;
  while (ip < program.length) {
    if (program[ip] === 1) {
      program[program[ip + 3]] =
        program[program[ip + 1]] + program[program[ip + 2]];
    } else if (program[ip] === 2) {
      program[program[ip + 3]] =
        program[program[ip + 1]] * program[program[ip + 2]];
    } else if (program[ip] === 99) {
      break;
    } else {
      alert("somwthing went wrong. instruction has value: ", program[ip]);
      break;
    }
    ip += 4;
  }
  return program;
};

export default class Day2 {
  first = input => {
    const start = new Date();
    let program = parse_input(input, { 1: 12, 2: 2 });

    program = execute_program(program);
    return {
      result: program[0],
      time: new Date() - start
    };
  };

  second = input => {
    const start = new Date();
    let noun = 0;
    let verb = 0;
    let finished = false;
    for (let n = 0; n <= 99; n++) {
      for (let v = 0; v <= 99; v++) {
        let program = parse_input(input, { 1: n, 2: v });
        if (execute_program(program)[0] === 19690720) {
          noun = n;
          verb = v;
          finished = true;
          break;
        } else {
          v++;
        }
      }
      if (finished) {
        break;
      } else {
        n++;
      }
    }

    return {
      result: 100 * noun + verb,
      time: new Date() - start
    };
  };
}
