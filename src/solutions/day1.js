let parse_input = input => {
  let parsed = input.split("\n").map(x => parseInt(x));
  return parsed;
};

let second_helper = (item, total) => {
  const fuel = Math.floor(item / 3) - 2;
  if (fuel <= 0) {
    return total;
  } else {
    total += fuel;
    return second_helper(fuel, total);
  }
};
export default class Day1 {
  first = input => {
    const start = new Date();
    let list = parse_input(input);
    let total = 0;
    list.forEach(x => {
      total += Math.floor(x / 3) - 2;
    });
    return { result: total, time: new Date() - start };
  };

  second = input => {
    const start = new Date();
    let list = parse_input(input);
    let total = 0;

    list.forEach(x => {
      let fuel = second_helper(x, 0);
      total += fuel;
    });
    return { result: total, time: new Date() - start };
  };
}
