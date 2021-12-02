const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            trim: true,
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    }
},
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    try {

        if (this.method !== 'local') {
            next();
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.local.password, salt);
        this.local.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});


userSchema.methods.isvalidPassword = async function (newPassword) {
    try {
        //Compare Original password with hash password..
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = mongoose.model('user', userSchema);