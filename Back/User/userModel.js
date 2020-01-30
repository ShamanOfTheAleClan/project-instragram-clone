const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    // admin: Boolean,
    profPic: {
        type: String,//bus saugomas URL?
        // required: true,
    },
    // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
    // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Likes' }],
    // following: [{
    //     _id: { type: [mongoose.Schema.Types.ObjectId], ref: 'Users' },
    //     username: { type: String, ref: 'Users' }
    // }],
    // followers: [{
    //     _id: { type: [mongoose.Schema.Types.ObjectId], ref: 'Users' },
    //     username: { type: String, ref: 'Users' }
    // }],
    photos: [{
        filename: String,
        filepath: String,
    }],
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next()
            })
        })
    } else {
        next()
    }

});


let User = mongoose.model('Users', userSchema)

module.exports = User