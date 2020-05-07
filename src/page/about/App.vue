<template>
  <div class="about">
    <h1>{{ title }}</h1>
    <span>{{ id }}</span>
  </div>
</template>
<script>
import { generateId } from '../../util/index'

export default {
  data() {
    return {
      title: 'hello about',
      id: generateId(),
    }
  },
  methods: {

  },
}
</script>
<style lang="scss" scoped>
.unuse {
  background: red;
}
</style>

