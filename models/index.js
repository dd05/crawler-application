const db = require("mongoose");
module.exports = models= {};
const DB_URL = "mongodb://localhost:27017/medium_test";

models.init = async() =>{
    console.log("connecting to database... ",DB_URL);
    try{
        await db.connect(DB_URL);
        console.log(`Connected to database`);
    }catch(err){
        console.error(err);
        throw err;
    }
}