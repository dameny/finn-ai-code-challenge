const {app} = require("./app.js");
const db = require("./db/db.js");
const mongoose = require("mongoose");


const port = 3000;

async function startServer(){
    try {
        await db.connect();
        app.listen(port, () => {
            console.log('Listening on port: ' + port)});
    } catch (error) {
       console.log(error); 
    }
}

startServer()


// const url = "mongodb://localhost:27017/userDB";

// mongoose.connect(url, {useNewUrlParser: true});

// app.listen(port, () => {
//     console.log('Listening on port: ' + port)});