import * as dotenv from "dotenv";
dotenv.config();

import config from './config'
import app from './server'


app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
})

app.get("/", (req,res) => {
    res.json({message: 'ok'})
});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 
