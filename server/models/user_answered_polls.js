const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserAnsweredPollsSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    poll: {type: Schema.Types.ObjectId, ref: 'Poll', required: true},
    version: {type: Schema.Types.Number, required: true},
    answer: {type: Schema.Types.ObjectId, ref: 'Answer', required: true},
});

module.exports = mongoose.model('user_answered_polls', UserAnsweredPollsSchema);