const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI; 

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;


db.on("error", function(err){
    console.log(err);
})


db.on("open", function(){
    console.log("Connected to the database.");
})


module.exports = db;
