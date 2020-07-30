const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    question: {type: Schema.Types.ObjectId, ref: 'Question', required: true},
    answer: {type: String, required: true},
});
// AnswerSchema.methods.percent = function (){
//    return this.populate('question').populate('possibleAnswers').reduce((total, res) => total + res.voters.length);
// };
module.exports = mongoose.model('Answer',AnswerSchema);