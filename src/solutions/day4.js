let parseInput = input => {
  let parsed = input.split("-").map(x => parseInt(x));
  return parsed;
};

let removeItem = (list, item) => {
  let array = [];
  let removed = false;
  list.forEach(x => {
    if (!removed && x === item) {
      removed = true;
    } else {
      array.push(x);
    }
  });
  return array;
};

let hasDouble = list => {
  let double = false;
  list.forEach(x => {
    if (removeItem(list, x).includes(x)) {
      double = true;
    }
  });
  return double;
};

let hasDouble2 = list => {
  let double = false;
  list.forEach(x => {
    if (removeItem(list, x).includes(x)) {
      if (!removeItem(removeItem(list, x), x).includes(x)) {
        double = true;
      }
    }
  });
  return double;
};

let validate = (password, min, max) => {
  let valid = true;
  if (password > max || password < min) {
    valid = false;
  } else {
    password = password.toString().split("");
    if (!hasDouble(password)) {
      valid = false;
    }
    if (password.length !== 6) {
      valid = false;
    } else {
      let prev = null;
      password.forEach(x => {
        if (prev !== null) {
          if (parseInt(x) < parseInt(prev)) {
            valid = false;
          }
        }
        prev = x;
      });
    }
  }
  return valid;
};

let validate2 = (password, min, max) => {
  let valid = true;
  if (password > max || password < min) {
    valid = false;
  } else {
    password = password.toString().split("");
    if (!hasDouble2(password)) {
      valid = false;
    }
    if (password.length !== 6) {
      valid = false;
    } else {
      let prev = null;
      password.forEach(x => {
        if (prev !== null) {
          if (parseInt(x) < parseInt(prev)) {
            valid = false;
          }
        }
        prev = x;
      });
    }
  }
  return valid;
};

let getPasswordCount = (min, max) => {
  let pw = min;
  let count = 0;
  for (let i = 0; i < max; i++) {
    if (validate(pw, min, max)) {
      count++;
    }
    pw++;
  }
  return count;
};

let getPasswordCount2 = (min, max) => {
  let pw = min;
  let count = 0;
  for (let i = 0; i < max; i++) {
    if (validate2(pw, min, max)) {
      count++;
    }
    pw++;
  }
  return count;
};

export default class Day4 {
  first = input => {
    const start = new Date();
    let list = parseInput(input);
    let min = list[0];
    let max = list[1];
    let result = getPasswordCount(min, max);
    return { result, time: new Date() - start };
  };

  second = input => {
    const start = new Date();
    let list = parseInput(input);
    let min = list[0];
    let max = list[1];
    let result = getPasswordCount2(min, max);
    return { result, time: new Date() - start };
  };
}
