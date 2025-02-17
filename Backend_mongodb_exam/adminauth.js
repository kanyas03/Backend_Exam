import { Router } from "express";
import { student } from "./model/student.js";


const adminauth=Router();
adminauth.post('/addstudent',async(req,res)=>{
    try{
        const{StudentName,EnrollmentNumber,Course,DateOfEnrollment}=req.body;
        const ExisitingStudent = await student.findOne({S_EnrollmentNo:EnrollmentNumber});
        if(ExisitingStudent){
            res.status(404).send("Student Deteils already exisit");
        }
        else{
            const newStudent = new student({
                S_name:StudentName,
                S_EnrollmentNo:EnrollmentNumber,
                S_coures:Course,
                S_dateOfEnrollment:DateOfEnrollment
            })
            await newStudent.save();
            res.status(200).send("Successfully added")
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send("server error")
        
    }
});

adminauth.get('/getStudent',async(req,res)=>{
    try{
        const s_enNo = req.query.S_EnrollmentNo
        const result=await student.find()
         if(result){
            console.log(result)
            res.status(200).json({data:result})
        }
        else{
        res.status(404).json({message:"student details not exist"})
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
});



adminauth.put('/update' ,async(req,res)=>{
    try{
        const{StudentName,EnrollmentNumber,Course,DateOfEnrollment}=req.body;
           const result =await student.findOne({S_EnrollmentNo:EnrollmentNumber});
           console.log(result)
        
           if(result){
            result.S_name=StudentName,
            result.S_EnrollmentNo=EnrollmentNumber,
            result.S_coures=Course,
            result.S_dateOfEnrollment=DateOfEnrollment
            
            console.log(result)

               await result.save();
               res.status(200).json({Msg:`Updated successfuly`})
           }
           
       }
       catch{
           res.status(500).send("server Error")
       }
});

adminauth.delete('/delete',async(req,res)=>{
    try{
        const {EnrollmentNumber}=req.body;
        const result = await student.findOne({EnrollmentNumber})
        if(result){
        
            await student.findOneAndDelete({EnrollmentNumber})
            res.status(200).send(" Successfully deleted")

        }else{
            res.status(404).send("Student not found")
        }
    }
    catch(error){
        console.log(error);
        
        res.status(500).send("Server Error")
    }
})

export {adminauth}
