import { Schema } from "mongoose";
import { model } from "mongoose";

const Sdetails= new Schema({
    S_name:{type:String,require:true},
    S_EnrollmentNo:{type:String,require:true,unique:true},
    S_coures:{type:String,require:true},
    S_dateOfEnrollment:{type:Date,default:Date.now}
});
const student = model('StudentDetailes',Sdetails);
export {student}
