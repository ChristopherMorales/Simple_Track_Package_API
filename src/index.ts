import * as dotenv from "dotenv";
dotenv.config();

const cors = require('cors');

import config from './config'
import app from './server'

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
})

app.get("/", (req,res) => {
    res.json({message: 'ok'})
});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 
