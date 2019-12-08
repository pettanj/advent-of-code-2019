<template>
  <div class="grid">
    <tile
      v-for="x in tiles"
      :key="x.number"
      :number="x.number"
      :solution="x.solution"
      :input="x.input"
    ></tile>
  </div>
</template>

<script>
// @ is an alias to /src
import Tile from "@/components/Tile.vue";

// Solutions
import Day1 from "../solutions/day1";
import Day2 from "../solutions/day2";
import Day3 from "../solutions/day3";
import Day4 from "../solutions/day4";
import Day5 from "../solutions/day5";

// Inputs
import input1 from "../assets/inputs/1";
import input2 from "../assets/inputs/2";
import input3 from "../assets/inputs/3";
let input4 = `137683-596253`;
import input5 from "../assets/inputs/5";

let shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export default {
  name: "home",
  components: {
    Tile
  },
  data() {
    return {
      tiles: shuffle([
        { number: 1, solution: new Day1(), input: input1 },
        { number: 2, solution: new Day2(), input: input2 },
        { number: 6 },
        { number: 3, solution: new Day3(), input: input3 },
        { number: 4, solution: new Day4(), input: input4 },
        { number: 5, solution: new Day5(), input: input5 },
        { number: 7 },
        { number: 8 },
        { number: 9 },
        { number: 10 },
        { number: 11 },
        { number: 12 },
        { number: 13 },
        { number: 14 },
        { number: 15 },
        { number: 16 },
        { number: 17 },
        { number: 18 },
        { number: 19 },
        { number: 20 },
        { number: 21 },
        { number: 22 },
        { number: 23 },
        { number: 24 },
        { number: 25 }
      ])
    };
  }
};
</script>

<style>
.grid {
  position: relative;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 100%;
  height: 100%;

  background: url("../assets/img/bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
