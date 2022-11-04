const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// Not sure if objectId is set up correctly below

const reactionSchema = new Schema({
    reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId},
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
},
{
  // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
  // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);
// Create a virtual property `reactionCount that retrieves the length of the thought's reactions array field on query.
// Activity 21

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize Thought model

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;