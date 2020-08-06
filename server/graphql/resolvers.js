const Question = require('../models/question');
const Answer = require('../models/answer');
const Poll = require('../models/poll');
const UserAnsweredPoll = require('../models/user_answered_polls');
const {accountsServer} = require('.././accounts-js');
const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectID;

const resolvers = {
    Query: {
        poll: async (_, {pollId, userId}) => {
            const poll = (pollId) ? [await Poll.findById(pollId).exec()] : await Poll.find({});
            return poll.map(async e => {
                e.latest = await Question.findById(e.latest).populate('possibleAnswers').populate('deleteAnswers').exec();
                e.answerForUser = (userId && await UserAnsweredPoll.exists({
                    poll: e._id,
                    version: e.version,
                    user: new ObjectID(userId)
                })) ?
                    (await UserAnsweredPoll.findOne({
                        poll: e._id,
                        version: e.version,
                        user: userId
                    }).exec()).answer : null;
                return e;
            });
        },
        user: async (_, {userId}) => {
            let user = [];
            if (userId) {
                user = [accountsServer.findUserById(userId)];
                user._id = user.id
            } else {
                mongoose.connection.db.collection('users', async function (_, collec) {
                    user = collec.find({}).toArray();
                });
            }
            return user
        }
    },
    Mutation: {
        async createPoll(_, {literalQuestion, answers}) {
            let poll = new Poll;
            let question = new Question;
            poll.questions = [question.id];
            poll.latest = question.id;
            poll.save();
            question.poll = poll.id;
            question.question = literalQuestion;
            question.possibleAnswers = answers.map(ans => {
                let answer = new Answer;
                answer.question = question.id;
                answer.answer = ans;
                answer.save();
                return answer.id
            });
            question.save();

            return poll.id;
        },
        async modifyPoll(_, {newQuestion, addAnswer, deleteAnswer, pollID}) {
            let poll = await Poll.findOne({_id: new ObjectID(pollID)}).populate('latest').exec();
            poll.version += 1;
            poll.save();
            let question;
            if (newQuestion) {
                question = new Question;
                question.possibleAnswers = poll.latest.possibleAnswers;
                question.question = newQuestion;
                question.poll = poll._id;
                poll.questions.push(question);
                poll.latest = question;
                question.save();
                poll.save();
            } else {
                question = poll.latest;
            }
            if (addAnswer) {
                let possibleAnswers = addAnswer.map(ans => {
                    let answer = new Answer;
                    answer.question = question.id;
                    answer.answer = ans;
                    answer.save();
                    return answer.id
                });
                question.possibleAnswers.push(possibleAnswers);
                question.save();
            }
            if (deleteAnswer) {
                deleteAnswer.forEach(e => {
                    let i = question.possibleAnswers.indexOf(e);
                    i !== -1 && question.deleteAnswers.push(e) && question.possibleAnswers.splice(i, 1);
                });
                question.save();
            }
            question.possibleAnswers.forEach(e => {
                let ans = Answer.findById(e).exec();
                ans.voters = [];
            });
            return poll._id;
        },

        async answerPoll(_, {pollId, userId, answerId}) {
            let versionPoll = await Poll.findOne({_id: new ObjectID(pollId)}, 'version').exec();
            const answerend = new UserAnsweredPoll;
            answerend.poll = pollId;
            answerend.user = userId;
            answerend.answer = answerId;
            answerend.version = versionPoll.version;
            answerend.save();
            return answerend._id;
        },
        async modifyUser(_, {userId, fullName, avatar, rol}) {
            const user = await accountsServer.findUserById(userId);
            if(fullName){
                user.profile.fullName = fullName
            }
            if(avatar){
                user.profile.avatar = avatar
            }
            if(rol){
                user.profile.rol = rol
            }
            mongoose.connection.db.collection('users', async function (_, collec) {
                collec.replaceOne({_id: new ObjectID(userId)}, user);
            });
            return user.id
        }
    }
};
module.exports = resolvers;