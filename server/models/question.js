const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {type: String, required: true},
    possibleAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer', required: true}],
    poll: {type: Schema.Types.ObjectId, ref: 'Poll', required: true},
    deleteAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
},);
// QuestionSchema.methods.ifVoted = function (user) {
//     return this.possibleAnswer.find(e => e.voters.includes(user))
// };

module.exports = mongoose.model('Question', QuestionSchema, 'question');