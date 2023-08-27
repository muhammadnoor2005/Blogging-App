import { saveUser,updatedPass,updateName } from "@/src/services/users";
import {updateBlogName} from "@/src/services/blogsHandle"
export default async function handler(req,res){
    if(req.method === "POST"){
        const details = req.body
        try{
            await saveUser(details); 
            res.status(201).send();
        }catch(err){
            res.status(400).json({message:err});
        }
    }
    if(req.method === "PATCH"){
        const {values,emailFind} = req.body;
        try{
            await updatedPass(values,emailFind);
            res.status(201).send();
        }catch(err){
            res.status(400).json({message:err});
        }
    }
    if(req.method === "PUT"){
        const {fName,lName,email} = req.body;
        try{
            updateName(fName,lName,email);
            updateBlogName(fName,lName,email)
            res.status(201).send();
        }catch(err){
            res.status(400).json({message:err});
        }
    }
    return res.status(404).send();
}