import { Image } from "antd"

import {Button,Input} from "antd";
import { useState } from "react";
const { TextArea } = Input;

export default function({blog,email,name}){
    const [delBool,changeBool] = useState(false);
    const [delBlogId,delBlogState] = useState(0);

    const [editBool,editState] = useState(false);
    const [titleVal,titleFunc] = useState('');
    const [descVal,descFunc] = useState('');
    const [blogMilliSec,blogMilliSecState] = useState(0)

    const getTitle = (e)=>{
        titleFunc(e.target.value);
    }
    const getDesc = (e)=>{
       descFunc(e.target.value);
    }

    const editBlogVal = (milliSec)=>{
        blogMilliSecState(milliSec);
        editState(true);
    }
   
    const updateBlog = async()=>{
        if(titleVal.length < 5){
            alert("Title should be atleast 5 characters");
            return
        }
        if(descVal.length < 100){
            alert("Description should be atleast 100 characters");
            return
        }
        try{
            const response  = await fetch("/api/blogs",{
                method:"PATCH",
                body:JSON.stringify({titleVal,descVal,blogMilliSec}),
                headers:{
                    "Content-Type":"application/json"
                }
        })
            if(response.ok){
                alert("Updated! Reload page to see changes");
            }
        }catch(err){
            console.log(err);
        }
        
    }
    const delBlogConfirm  = (id)=>{
        delBlogState(id);
        changeBool(true);
    }
    const delBlog = async ()=>{
        try{ 
            const response = await fetch("/api/blogs",{
                method:"PUT",
                body:JSON.stringify(delBlogId),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.ok){
                alert("Deleted! Reload page to see changes");
            }
        }catch(err){
            alert(err);
        }
    }
    let currUserBlogs = [];
    blog.forEach((blog)=>{
        if(blog.userEmail === email){
            currUserBlogs.push(blog);
        }
    });
    if (currUserBlogs.length === 0){
        return(
            <div>
                <span style={{display:"flex",justifyContent:"center",color:"GrayText",fontSize:"18px"}}>
                    You didn't posted any Blog yet
                </span>
            </div>
        )
    }
    const blogList = currUserBlogs.map((b)=>{
        return(
            <div className="blogMap" key={b.id}>
                <div className="blogHeading">
                    <Image src="/images/pfp.jpg" className="blogImg"/>
                    <div style={{marginLeft:"2%"}}>
                        <span style={{
                            fontSize:"20px",
                            fontWeight:"500",
                        }}>{b.titleVal}</span><br/>

                        <span style={{
                            fontSize:"11px",
                            color:"GrayText"
                        }}>{`${b.fullName} - ${b.completeDate}`}</span><br/>
                    </div>
                </div>
                <br/>

                <div style={{color:"gray",fontSize:"14px",overflow:"clip"}}>
                    {b.descVal}
                </div>

                <br/>
                <div style={{
                    marginLeft:"5%",
                    color:"rgba(119, 73, 248, 1)",
                    fontSize:"11px",
                    cursor:"pointer"
                }}>
                    <span onClick={()=>{delBlogConfirm(b.id)}}>Delete</span>
                    <span onClick={()=>{editBlogVal(b.milliSec)}}style={{marginLeft:"1%"}}>Edit</span>
                </div>
            </div>
        )
    })
    return(
        <div className="mainBlogDiv">
            <span style={{
                fontWeight:500,
                fontSize:"25px"
            }}>My Blogs</span>

            <div className={editBool?"dashboardEditShow":"dashboardEditHide"}>
                <div className='editBlogTextArea'>
                    <div >
                        <Input placeholder="Title" onChange={getTitle} style={{marginBottom:"1%"}} id="titleOld"/>
                    </div>

                    <div>
                        <TextArea
                        showCount
                        maxLength={3000}
                        required={true}
                        style={{
                            height: 120,
                            resize: 'none',
                        }}
                        onChange={getDesc}
                        placeholder="What is in your mind?"
                        id="descOld"
                        />
                    </div>
                    <div className='editBlogConfirm'>
                        <Button type="primary" onClick={()=>{editState(false)}}style={{minWidth:80,backgroundColor:"white",color:"black",marginRight:"10px"}}>Cancel</Button>
                        <Button type="primary" onClick={()=>{updateBlog();editState(false)}} style={{width:80,backgroundColor:"rgba(119, 73, 248, 1)"}}>Confirm</Button>
                    </div>
                </div>
            </div>

            <div className={delBool?"showDiv":"hideDiv"}>
                <div className="confirmDelDiv">
                    <span>Are your sure you want to delete this blog?</span>
                    <br/>
                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                        <Button type="primary" onClick={()=>{changeBool(false)}}style={{minWidth:80,backgroundColor:"white",color:"black",marginRight:"10px"}}>Cancel</Button>
                        <Button type="primary" onClick={()=>{delBlog();changeBool(false);}} style={{width:80,backgroundColor:"rgba(119, 73, 248, 1)"}}>Delete</Button>
                    </div>
                </div>
            </div>

            <div>
                {blogList}
            </div>
        </div>
    )
}