const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    _id:{ 
        type:String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    age: Number,
    nationality: String
});

exports.User = mongoose.model("User", UserSchema);
