const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    
    email: {
        type: String, 
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String, 
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
      try{
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(this.password, salt);
          this.password = hashPassword;
          next();
      }catch(error){
          next(error);
      }
});


userSchema.methods.isvalidPassword = async function(newPassword){
    try{
        //Compare Original password with hash password..
       return await bcrypt.compare(newPassword, this.password);
    }catch(error){
        throw new Error(error);
    }
}


module.exports = mongoose.model('user', userSchema);