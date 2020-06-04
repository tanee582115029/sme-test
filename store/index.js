export const state = () => ({
    userId: ''
  })
  
  export const mutations = {
    add (state, input) {
      state.userId = input
    }
  }