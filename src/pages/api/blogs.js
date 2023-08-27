import { writeBlog ,deleteBlog,editBlog} from "@/src/services/blogsHandle";
export default async function handler(req,res){
    if(req.method === "POST"){
        const blogsData = req.body
        try{
            writeBlog(blogsData);
            res.status(201).send();
        }catch(err){
            res.status(400).json({message:err});
        }
    }
    if (req.method === "PUT"){
        const blogId = req.body;
        try{
            deleteBlog(blogId);
            res.status(201).send();
        }catch(err){
            res.status(400).json({message:err});
        }
        
    }
    if(req.method === "PATCH"){
        const blogToEdit = req.body;
        try{
            editBlog(blogToEdit);
            res.status(201).send();
        }catch(err){
            res.status(400).json({message:err});
        }
    }
    return res.status(404).send();
}