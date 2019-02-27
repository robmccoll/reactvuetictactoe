<template>
<div>
  <div class="board-row" v-for="r in 3" :key="r">
        <Square
          v-for="c in 3"
          :key="(r-1)*3 + (c-1)"
          :index="(r-1)*3 + (c-1)"
          :value="squares[(r-1)*3 + (c-1)]"
          :click="click"
        />
  </div>
</div>
</template>

<script>
import Square from './Square.vue'

export default {
  name: 'Board',
  props: {
    squares: Array,
    click: Function,
  },
  components: {
    Square
  },
}
</script>

<style scoped>
.board-row:after {
  clear: both;
  content: "";
  display: table;
}
</style>
