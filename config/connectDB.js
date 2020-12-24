const mongoose = require("mongoose");




function connectDB() {
        const Options = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,

        };
  mongoose.connect( process.env.MONGO_URL,Options).then(()=>{
   console.log ("DATA BASE IS CONNECTED") 
 } ).catch((err)=> console.log (err))
  
}

module.exports = connectDB;
