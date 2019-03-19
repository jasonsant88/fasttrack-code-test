<template>
  <section class="question" :key="componentKey">
    <div class="header">
      <div class="number">{{ questionNumber }}</div>
      <div class="text" v-html="question.question"/>
      <div class="difficulty" :class="question.difficulty">{{ question.difficulty }}</div>
    </div>
    <div class="answers">
      <div
        v-for="(answer, ai) in question.answers"
        :key="ai"
        class="answer"
        :class="question.user_choice == answer ? 'chosen' : ''"
        @click="makeChoice(answer)"
        v-html="answer"
      />
    </div>
  </section>
</template>

<script>
export default {
  props: ['questionNumber', 'question'],
  data() {
    return {
      componentKey: 0
    }
  },

  methods: {
    makeChoice(answer) {
      this.question.user_choice = answer
      this.question.unanswered = false
      this.componentKey++
    }
  },

  created() {
    const answers = []
    answers.push(this.question.correct_answer)
    this.question.incorrect_answers.forEach((answer) => {
      answers.push(answer)
    })

    this.question.answers = answers.shuffle()
    this.question.user_choice = null
    this.componentKey++
  }
}

Array.prototype.shuffle = function () {
  const array = this

  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const itemAtIndex = array[randomIndex]

    array[randomIndex] = array[i]
    array[i] = itemAtIndex
  }
  return array
}
</script>

<style lang='less' scoped>
@wide-screen-down: ~'(max-width: 1199px)';
@desktop-down: ~'(max-width: 991px)';
@tablet-down: ~'(max-width: 767px)';
@phone-down: ~'(max-width: 480px)';
@small-phone-down: ~'(max-width: 320px)';

.header {
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  justify-content: center;
  align-items: center;
  border: 5px solid #021f47;
  background: #ffffff;

  .number {
    text-align: center;
    padding: 20px;
    font-size: 30px;
    background-color: #d60070;
    font-weight: bold;
    color: #8c065b;
    left: -10px;
    @media @tablet-down { font-size: 20px;}
  }

  .text {
    font-size: 22px;
    padding: 5px 20px;
    font-weight: lighter;
    @media @tablet-down { font-size: 18px;}
  }

  .difficulty {
    text-transform: capitalize;
    text-align: center;
    @media @tablet-down { font-size: 12px;}

    &.easy {
      color: green;
    }

    &.medium {
      color: orange;
    }

    &.hard {
      color: red;
    }
  }
}
.answers {
  .answer {
    font-size: 20px;
    font-weight: lighter;
    padding: 10px 20px;
    border: 5px solid #021f47;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #01abd0;
      color: #ffffff;
    }
    &.chosen {
      background-color: #027B98;
      color: #ffffff;
    }
  }
}
</style>
