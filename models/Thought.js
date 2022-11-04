const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// Not sure if objectId is set up correctly below

const reactionSchema = new mongoose.Schema({
    reactionId: {datatype : ObjectId},
    reactionBody: {type: String, required: true, minlength: 280},
    username: {type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
})


const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      username: {
        type: String,
        required: true,
        trim: true,
      },
        reactions: [reactionSchema],
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;