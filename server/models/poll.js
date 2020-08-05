const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    latest: {type: Schema.Types.ObjectId, ref: 'Question', required: true},
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
    version: {type: Schema.Types.Number, default: 1}
});

module.exports = mongoose.model('Poll', PollSchema);