<template>
  <div class="results">
    <div id="resultsHeader">
      <span class="text-left">Player</span>
      <span>Score</span>
    </div>
    <div v-for="(result, index) in results" :key="index" class="result">
      <span class="text-left">{{ result.name }}</span>
      <span>{{ result.score }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: this.$store.getters.results
    }
  }
}
</script>

<style lang="less">
.results {
  max-width: 800px;
  margin: 30px auto;

  #resultsHeader {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 9fr 1fr;
    border: 5px solid #d60070;
    background-color: #d60070;
    padding: 10px 20px;
    span {
      color: #ffffff;
      font-weight: bold;
      font-size: 20px;
    }
  }

  .result {
    display: grid;
    grid-template-columns: 9fr 1fr;
    padding: 10px 20px;
    border: 0px solid #01244e;
    background-color: #ffffff;
    margin: 5px 0;
    &:nth-child(odd) {
      background-color: #FFD7EC;
    }

    span {
      color: #000;
      font-size: 18px;
    }
  }

  .text-left {
    text-align: left;
  }
}
</style>
