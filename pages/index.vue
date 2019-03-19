<template>
  <section class="container">
    <Header />
    <Quiz />
  </section>
</template>

<script>
import Header from '~/components/Header.vue'
import Quiz from '~/components/Quiz.vue'

export default {
  components: {
    Header,
    Quiz
  },
  computed: {
    results() {
      return this.$store.getters.results
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans');
</style>
