const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    description: String,
    isbn: {
        type: String, 
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    datePosted: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);