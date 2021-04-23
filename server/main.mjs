import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { getData } from '../logic/data.mjs';

const app = express();
const port = 3001;

let args = process.argv.slice(2);
let isDev = args.includes("--dev");

app.use(cors());

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


app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})