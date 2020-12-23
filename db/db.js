const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/userDB";

exports.connect = function(){
    const opts = {useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true};
    return mongoose.connect(url, opts); 
}
