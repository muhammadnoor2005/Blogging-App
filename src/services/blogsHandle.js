import fs from "fs";
import path from "path";

const blogsPath = path.join(process.cwd(),"src","data","blogs.json");

export function getBlogs(){
    const blogs = fs.readFileSync(blogsPath);
    return (JSON.parse(blogs));
} 
export function writeBlog({titleVal,descVal,completeDate,fullName,userEmail,milliSec}){
    const data = getBlogs();
    data.unshift({
        titleVal,descVal,completeDate,fullName,userEmail,
        id:data.length + 1,milliSec
    })
    fs.writeFileSync(blogsPath,JSON.stringify(data));
}
export function deleteBlog(id){
    const data = getBlogs();
    const blogDel = data.find((blog)=>blog.id === id);
    const index = data.indexOf(blogDel);
    data.splice(index,1)
    fs.writeFileSync(blogsPath,JSON.stringify(data))
}
export function editBlog({titleVal,descVal,blogMilliSec}){
    const data = getBlogs();
    const blogToEdit = data.find((blog)=>blog.milliSec === blogMilliSec);
    blogToEdit.titleVal = titleVal;
    blogToEdit.descVal = descVal;
    fs.writeFileSync(blogsPath,JSON.stringify(data));
}