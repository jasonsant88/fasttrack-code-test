<template>
  <section>
    <div id="quizContainer" v-if="mode === 'quiz'">
      <div v-for="(question, index) in questions" :key="index" class="question">
        <Question :question="question" :question-number="index + 1" />
      </div>
      <div id="submitContainer">
        <button @click="submit()">Submit</button>
      </div>
    </div>

    <div id="statusContainer">
      <p class="submission-message" :class="submissionMessageClass" v-if="submissionMessage" v-html="submissionMessage" />
    </div>

    <div id="resultsContainer" v-if="mode === 'results'">
      <h3>Quiz Results</h3>
      <Results />
      <button @click="tryAgain()">Try Again</button>
    </div>
  </section>
</template>

<script>
import Question from '~/components/Question.vue'
import Results from '~/components/Results.vue'

export default {
  components: {
    Question,
    Results
  },
  data() {
    return {
      mode: 'quiz',
      submissionMessage: null,
      submissionMessageClass: null,
      questions: []
    }
  },
  methods: {
    tryAgain() {
      this.initialise()
      this.mode = 'quiz'
      this.submissionMessage = null
      this.submissionMessageClass = null
    },
    submit() {
      if (this.validateQuiz()) {
        // Calculate score
        let finalScore = 0
        this.questions.forEach((question) => {
          if (question.user_choice === question.correct_answer) {
            finalScore++
          }
        })

        // Calculate better than percentage
        const results = this.$store.getters.results
        let worseResults = 0
        results.forEach((result) => {
          if (result.score < finalScore) {
            worseResults++
          }
        })
        const betterThanPercentage = ((worseResults / results.length) * 100).toFixed(0)

        // Save score
        this.$store.commit('addResult', finalScore)
        if (!isNaN(betterThanPercentage)) {
          this.submissionMessage = '<strong>Quiz Submitted!</strong> Your score is ' + finalScore + '. You did better than ' + betterThanPercentage + '% of the quiz takers'
        } else {
          this.submissionMessage = '<strong>Quiz Submitted!</strong> Your score is ' + finalScore + '. You are the first person to take this quiz.'
        }
        this.submissionMessageClass = 'success'
        this.questions = null
        this.mode = 'results'
      }
    },

    validateQuiz() {
      let numberOfUnanswered = 0
      this.questions.forEach((question) => {
        if (question.user_choice == null) {
          this.submissionMessage = 'Please attempt all questions before submitting.'
          this.submissionMessageClass = 'warning'
          numberOfUnanswered++
        }
      })

      return numberOfUnanswered === 0
    },

    async initialise() {
      const questions = await this.$axios.$get('https://opentdb.com/api.php?amount=10&category=21&type=multiple')
      this.questions = questions.results
    }
  },
  computed: {
    results() {
      return this.$store.state.results.results
    }
  },

  mounted() {
    this.initialise()
  }
}
</script>

<style lang='less' scoped>
#quizContainer {
  background-color: #01244e;
  width: 100%;
  position: relative;
  padding-bottom: 30px;

  .question {
    margin: 0 auto;
    margin-bottom: 20px;
    max-width: 800px;
  }

  #submitContainer {
    text-align: center;
    padding: 20px;
  }
}

#resultsContainer {
  background-color: #01244e;
  width: 100%;
  position: relative;
  padding-bottom: 30px;
  margin: 0 auto;
  text-align: center;

  h3 {
    font-size: 34px;
    color: #ffffff;
  }
}

#statusContainer {
  background-color: #01244e;
  width: 100%;
  position: relative;
  padding-bottom: 30px;

  .submission-message {
      padding: 20px;
      font-size: 20px;
      max-width: 800px;
      margin: 0 auto;
      margin-bottom: 20px;
      text-align: center;

      &.warning {
        background-color: #fff3cd;
        color: #856404;
      }

      &.success {
        background-color: #ceffcc;
        color: #008817;
      }
    }
}

button {
  padding: 20px 30px;
  text-transform: uppercase;
  border: 2px solid #ffffff;
  color: #ffffff;
  background-color: transparent;
  font-size: 20px;
  font-weight: lighter;
  cursor: pointer;
  &:hover {
    border: 2px solid #d60070;
    color: #d60070;
  }
}
</style>
