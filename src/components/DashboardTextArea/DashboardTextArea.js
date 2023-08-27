import React, { useState } from 'react';
import { Input,Button } from 'antd';
const { TextArea } = Input;


export default function({email,name}){
    const [titleVal,titleFunc] = useState('');
    const [descVal,descFunc] = useState('');
    
    const fullName = name;
    const userEmail = email;
    const date = new Date()
    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const milliSec = date.getTime()

    const year = date.getFullYear()
    const day = date.getDate()
    const month = monthsArray[date.getMonth()];

    const completeDate = `${month} ${day}, ${year}`

    const getTitle = (e)=>{
        titleFunc(e.target.value);
    }
    const getDesc = (e)=>{
       descFunc(e.target.value);
    }
    const publishBlog = async()=>{
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
                method:"POST",
                body:JSON.stringify({titleVal,descVal,completeDate,fullName,userEmail,milliSec}),
                headers:{
                    "Content-Type":"application/json"
                }
        })
            if(response.ok){
                alert("Published! Reload page to see changes");
            }
        }catch(err){
            console.log(err);
        }
        console.log(titleVal,descVal);
    }
    return(
        <div className='dashboardTextareaParent'>
            <div >
                <Input placeholder="Title" onChange={getTitle} style={{marginBottom:"1%"}}/>
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
                />
            </div>
            <div>
                <Button type="primary" style={{
                    marginTop:"1%",
                    width:"100px",
                    backgroundColor:"rgba(119, 73, 248, 1)",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }} onClick={()=>{publishBlog()}}>Publish Blog</Button>
            </div>
        </div>
);
        
}
