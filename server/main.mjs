import express from 'express';
import fs from 'fs';
import { getData } from '../logic/data.mjs';
import proxy from 'express-http-proxy';

const app = express();
const port = 3001;
let devPort = process.env["DEV_PORT"] || 19006;

let args = process.argv.slice(2);
let isDev = args.includes("--dev");

app.use("/api/data",async (req,res)=>{
    function fetchAndSend(){
        getData().then(data=>{
            res.send(data);
            fs.writeFileSync("./data.json",JSON.stringify(data));
        })
    }
    if (!fs.existsSync("./data.json")){
        console.log("file does not exist, fetching");
        fetchAndSend();
    } else {
        let mtime = fs.statSync("./data.json").mtime;
        let now = new Date();
        let minutesSince = (now - mtime)/1000/60;
        if (minutesSince >= 15){
            console.log(minutesSince+" minutes since modified, fetching");
            fetchAndSend();
        } else {
            console.log("sending cached file ("+minutesSince+")");
            res.sendFile("data.json",{root: "./"});
        }
    }
});
if (isDev){
    app.use(proxy('localhost:'+devPort));
} else {
    app.use("/timetable/*",(req,res)=>{
        res.sendFile("index.html",{root:'../dist/'});
    })
    app.use(express.static("../dist/"));
}



app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})