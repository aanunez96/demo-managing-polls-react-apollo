
module.exports = {
  Query: {
    question: async (_, { questionId }, __) => {
      let text = `Some text :${questionId}`

      return {
        text,
      }
    }
  }
}
