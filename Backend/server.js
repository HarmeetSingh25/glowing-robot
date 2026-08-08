import app from "./src/app.js";
import Config from "./src/config/config.js";
import connectToDB from "./src/config/db.js";

app.listen(Config.PORT ,()=>{
    console.log("Server is running on 3000 port");
    
})
connectToDB()