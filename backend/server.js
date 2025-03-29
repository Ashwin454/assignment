const app = require("./app");
const dotenv = require("dotenv");
const { connectDB } = require('./config/database');

dotenv.config({path: "./config/config.env"});
connectDB();

app.listen(8000, ()=>{
    console.log("Server is up");
})