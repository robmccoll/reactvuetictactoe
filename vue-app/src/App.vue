<template>
  <div class="game">
    <div class="game-board">
      <Board 
        :squares="history[step].squares"
        :click="handleClick"
      />
    </div>
    <div class="game-info">
      <div>{{status}}</div>
      <ol>
        <li v-for="move in moves" :key="move[0]" >
          <button @click="jumpTo(move[0])">{{move[1]}}</button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import Board from './components/Board.vue'

export default {
  name: 'app',
  data() {
    return {
      history: [{
          squares: Array(9).fill(null),
      }],
      step: 0,
      xNext: true,
    };
  },
  components: {
    Board
  },
  computed: {
    winner() {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      const squares = this.history[this.step].squares;
      console.log(squares);
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          console.log(squares[a]);
          return squares[a];
        }
      }
      return null;
    },
    status() {
      return this.winner ? ('Winner: ' + this.winner) : ('Next player: ' + (this.xNext ? 'X' : 'O'))
    },
    moves() {
      return this.history.map((step, move) => {
        return [move, move ? ('Go to move #' + move) : ('Go to game start')];
      });
    },
  },
  methods: {
    handleClick(i) {
      const history = this.history.slice(0, this.step + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (this.winner || squares[i]) {
        return;
      }
      squares[i] = this.xNext? 'X' : 'O';
      this.history = history.concat([{
          squares: squares,
      }]);
      this.step = history.length;
      this.xNext = !this.xNext;
    },
    jumpTo(step) {
      this.step = step;
      this.xNext = step % 2 == 0;
    },
  },
}
</script>

<style>
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}

ol, ul {
  padding-left: 30px;
}

.status {
  margin-bottom: 10px;
}

.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}
</style>
