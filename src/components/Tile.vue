<template>
  <div class="tile" :class="solution ? '-active':''">
    <div class="clicked" v-if="clicked">
      <a class="hide" @click="toggle()">Hide</a>
      <div class="tile-header">
        <button @click="solve1()">First</button>
        <button @click="solve2()">Second</button>
      </div>
      <div v-if="result !== null && time !== null">
        <b>Assignment {{assignmentNumber}}</b>
        <br />
        <b>Result:</b>
        {{result}}
        <br />
        <b>Time:</b>
        {{time}}ms
      </div>
    </div>
    <div class="cover" v-if="!clicked" @click="toggle()">
      <h2>{{number}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tile",
  props: ["number", "solution", "input"],
  data() {
    return {
      result: null,
      time: null,
      clicked: false,
      assignmentNumber: null
    };
  },
  methods: {
    toggle() {
      if (this.solution) {
        if (this.clicked) {
          this.clicked = false;
          this.result = null;
          this.time = null;
        } else {
          this.clicked = true;
        }
      }
    },
    solve1() {
      let sol = this.solution.first(this.input);
      this.result = sol.result;
      this.time = sol.time;
      this.assignmentNumber = 1;
    },
    solve2() {
      let sol = this.solution.second(this.input);
      this.result = sol.result;
      this.time = sol.time;
      this.assignmentNumber = 2;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clicked {
  background-color:rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.hide {
  position: absolute;
  bottom: 0;
  right: 0;
}
.cover {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tile-header {
  position: relative;
  width: 100;
  display: flex;
  flex-direction: row;
}

button {
  width: 50%;
  padding: auto;
  background-color: transparent;
  color: white;
  text-shadow: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
}

.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: calc(20% - 2px);
  height: calc(20% - 2px);

  border: 1px solid white;
  color: white;
  text-shadow: rgba(255, 255, 255, 0.2);
}

.tile.-active:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
</style>
