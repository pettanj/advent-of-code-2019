let parse_input = input => {
  let parsed = input.split("\n").map(x =>
    x.split(",").map(y => {
      return { direction: y.charAt(0), steps: parseInt(y.substr(1)) };
    })
  );
  return parsed;
};

let draw_line = commands => {
  let x = 0;
  let y = 0;
  let grid = {};
  commands.forEach(item => {
    if (item.direction === "U") {
      for (let i = 0; i < item.steps; i++) {
        y++;
        if (Array.isArray(grid[x])) {
          grid[x].push(y);
        } else {
          grid[x] = [y];
        }
      }
    } else if (item.direction === "D") {
      for (let i = item.steps; i > 0; i--) {
        y--;
        if (Array.isArray(grid[x])) {
          grid[x].push(y);
        } else {
          grid[x] = [y];
        }
      }
    } else if (item.direction === "L") {
      for (let i = item.steps; i > 0; i--) {
        x--;
        if (Array.isArray(grid[x])) {
          grid[x].push(y);
        } else {
          grid[x] = [y];
        }
      }
    } else if (item.direction === "R") {
      for (let i = 0; i < item.steps; i++) {
        x++;
        if (Array.isArray(grid[x])) {
          grid[x].push(y);
        } else {
          grid[x] = [y];
        }
      }
    }
  });
  return grid;
};

let draw_line_extended = commands => {
  let x = 0;
  let y = 0;
  let grid = {};
  let total = 0;
  commands.forEach(item => {
    if (item.direction === "U") {
      for (let i = 0; i < item.steps; i++) {
        y++;
        total++;
        if (Array.isArray(grid[x])) {
          grid[x].push({ y, total });
        } else {
          grid[x] = [{ y, total }];
        }
      }
    } else if (item.direction === "D") {
      for (let i = item.steps; i > 0; i--) {
        y--;
        total++;
        if (Array.isArray(grid[x])) {
          grid[x].push({ y, total });
        } else {
          grid[x] = [{ y, total }];
        }
      }
    } else if (item.direction === "L") {
      for (let i = item.steps; i > 0; i--) {
        x--;
        total++;
        if (Array.isArray(grid[x])) {
          grid[x].push({ y, total });
        } else {
          grid[x] = [{ y, total }];
        }
      }
    } else if (item.direction === "R") {
      for (let i = 0; i < item.steps; i++) {
        x++;
        total++;
        if (Array.isArray(grid[x])) {
          grid[x].push({ y, total });
        } else {
          grid[x] = [{ y, total }];
        }
      }
    }
  });
  return grid;
};

let calculate_manhattan_distance = (a, b) => {
  return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
};

let shared_values = (a, b) => {
  let temp = [];
  a.forEach(x => {
    if (b.includes(x)) {
      temp.push(x);
    }
  });
  return temp;
};

let shared_values_extended = (a, b) => {
  let temp = [];
  a.forEach(aitem => {
    b.forEach(bitem => {
      if (aitem.y === bitem.y) {
        temp.push({ y: aitem.y, total: aitem.total + bitem.total });
      }
    });
  });
  return temp;
};

let find_intersections = (firstLine, secondLine) => {
  let intersections = [];
  Object.keys(firstLine).forEach(key => {
    if (secondLine[key]) {
      const sharedValues = shared_values(firstLine[key], secondLine[key]);
      if (sharedValues.length > 0) {
        sharedValues.forEach(sv => {
          intersections.push({
            x: parseInt(key),
            y: sv,
            distance: calculate_manhattan_distance(
              { x: 0, y: 0 },
              { x: parseInt(key), y: sv }
            )
          });
        });
      }
    }
  });
  return intersections;
};

let find_intersections_extended = (firstLine, secondLine) => {
  let intersections = [];
  Object.keys(firstLine).forEach(key => {
    if (secondLine[key]) {
      const sharedValues = shared_values_extended(
        firstLine[key],
        secondLine[key]
      );
      if (sharedValues.length > 0) {
        sharedValues.forEach(sv => {
          intersections.push({
            x: parseInt(key),
            y: sv.y,
            distance: sv.total
          });
        });
      }
    }
  });

  return intersections;
};

let find_smallest_distance = list => {
  let smallest = null;
  list.forEach(x => {
    if (smallest === null || x.distance < smallest) {
      smallest = x.distance;
    }
  });
  return smallest;
};

export default class Day3 {
  first = input => {
    const start = new Date();
    let list = parse_input(input);
    let firstLine = draw_line(list[0]);
    let secondLine = draw_line(list[1]);
    let intersections = find_intersections(firstLine, secondLine);
    let result = find_smallest_distance(intersections);
    return { result, time: new Date() - start };
  };

  second = input => {
    const start = new Date();
    let list = parse_input(input);

    let firstLine = draw_line_extended(list[0]);
    let secondLine = draw_line_extended(list[1]);

    let intersections = find_intersections_extended(firstLine, secondLine);
    let result = find_smallest_distance(intersections);
    return { result, time: new Date() - start };
  };
}
