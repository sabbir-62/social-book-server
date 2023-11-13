const mongoose = require('mongoose');
const {Schema,model} = mongoose;


const userSchema = new Schema(
    {
        firstName:{
            type: String,
            trim: true,
            retuired: true,
            minlength:3,
            maxlength:15
        },
        lastName:{
            type: String,
            trim: true,
            retuired: true,
            minlength:3,
            maxlength:15
        },
        userName:{
            type: String,
            trim: true,
            retuired: true,
            unique: true
        },
        email:{
            type: String,
            trim: true,
            retuired: true,
            unique: true
        },
        password:{
            type: String,
            trim: true,
            retuired: true
        },
        activied:{
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true, versionKey: false
    }
);

const userModel = model('user',userSchema);

module.exports = userModel;