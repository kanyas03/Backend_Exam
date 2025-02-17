import express,{json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { adminauth } from './adminauth.js';
dotenv.config();

const app = express();
app.use(json());
app.use('/',adminauth);
mongoose.connect('mongodb://localhost:27017/STUDENTS').then(()=>{
    console.log('mongodb connceted to students project');
    })
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
});
app.listen(process.env.PORT,function(){
    console.log(`server listen to ${process.env.PORT}`);
    
})
