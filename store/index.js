import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      results: []
    },
    mutations: {
      addResult(state, score) {
        state.results.push({
          name: 'Player ' + (parseInt(state.results.length) + 1),
          score: score,
          timestamp: new Date()
        })
      }
    },
    actions: {
      addResult(context, score) {
        context.commit('addResult', score)
      }
    },
    getters: {
      results(state) {
        return state.results
      }
    }
  })
}

export default createStore
