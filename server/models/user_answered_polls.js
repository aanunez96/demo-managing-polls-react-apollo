const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserAnsweredPollsSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    poll: {type: Schema.Types.ObjectId, ref: 'Poll', required: true},
    version: {type: Schema.Number, required: true},
    answer: {type: Schema.ObjectId, ref: 'Answer', required: true},
});

module.exports = mongoose.model('UserAnsweredPolls', UserAnsweredPollsSchema);