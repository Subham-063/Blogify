const {Schema, model} = require('mongoose') ;

const commentSchema = new Schema ({
    content: {
        type: String ,
        required: true,
    },
    blog_id: {
         type: Schema.Types.ObjectId ,
        ref: 'Blog',
    },
    created_by: {
        type: Schema.Types.ObjectId ,
        ref: 'User',
    },
},
{timestamps: true},
) ;

const Comment = model('Comment', commentSchema) ;

module.exports = Comment ;