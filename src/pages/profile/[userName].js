import AuthPageHeader from "@/src/components/Headers/Header";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { getUser } from "@/src/services/users";
import { getBlogs } from "@/src/services/blogsHandle";
import {
  Button,
  Form,
  Image,
  Input,
} from 'antd';
import { useState } from "react";

export default function(props){
  const [nameUpadteBool,boolval]= useState(false);
  const [fName, fNameFunc] = useState('');
  const [lName, lNameFunc] = useState('');

  const {data:session} = useSession();
  const {userData} = props;
  const [form] = Form.useForm();

  if(!session){
    return<div>Loading...</div>
  }
  const email = session.user.email;
  const emailFind = userData.find((p)=>p.email === email);
  const userName = emailFind.fullName;

  const getFName = (e)=>{
    fNameFunc(e.target.value);
    console.log(fName);
  }
  const getLName = (e)=>{
    lNameFunc(e.target.value);
  }
  const changeName = async () => {
    if(fName.length < 4 || fName.length > 20){
      alert("Enter minimum 3 characters and maximum 20");
      return
    }
    if(lName.length <1 || lName.length > 20){
      alert("Enter minimum 1 characters and maximum 20");
      return
    }
    try{ 
      const response = await fetch("/api/auth/signup",{
          method:"PUT",
          body:JSON.stringify({fName,lName,email}),
          headers:{
              "Content-Type":"application/json"
          }
      })
      if(response.ok){
          alert("Name Changed");
      }
  }catch(err){
      alert(err);
  }
  }
  
  const onFinish = async (values) => {
    try{ 
        const response = await fetch("/api/auth/signup",{
            method:"PATCH",
            body:JSON.stringify({values,emailFind}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response.ok){
            alert("Password Changed");
        }
        else{throw new Error("Old Password not Matched")};
    }catch(err){
        alert(err);
    }
  };

    return(
        <div>
          <div>
            <AuthPageHeader props={userName}/>
          </div>
          <div className={nameUpadteBool?"updateNameDivBg":"updateNameDivHide"}>
            <div className="updateNameDiv">
              <span style={{fontWeight:"500",fontSize:"20px"}}>Change Name</span>
              <br/>
              <div>
                <Input placeholder="First Name" onChange={getFName} style={{marginBottom:"1%"}}/>
                <Input placeholder="Last Name" onChange={getLName} style={{marginBottom:"1%"}}/>
              </div>
              <br/>
              <div>
                <Button type="primary" onClick={()=>{boolval(false)}} style={{minWidth:80,backgroundColor:"white",color:"black",marginRight:"10px"}}>Cancel</Button>
                <Button type="primary" onClick={()=>{changeName();boolval(false)}} style={{width:80,backgroundColor:"rgba(119, 73, 248, 1)"}}>Update</Button>
              </div>
            </div>
          </div>

          <div style={{display:"flex",minWidth:"100%",justifyContent:"center"}}>
            <div className='parentDivSignup'>           
                  <Form
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  style={{
                      width:200,
                      display:"flex",
                      flexDirection:"column",
                      justifyContent:"center",
                  }}
                  scrollToFirstError
                  >
                    <Image src="/images/pfp.jpg" className="editProfileImg" style={{
                        maxWidth: "15vh",
                        borderRadius:"5px"
                    }}/>

                    <div style={{
                      display:"flex",
                      justifyContent:"space-between",
                      alignItems:"center",
                    }}>
                      <h2>{userName}</h2>

                      <span style={{
                        color:"GrayText",
                        cursor:"pointer",
                      }} onClick={()=>{boolval(true)}}>Edit name</span>
                    </div>
                      
                  <Form.Item
                      name="oldPassword"
                      rules={[
                      {
                          required: true,
                          message: 'Please input your password atleast 8 characters!',
                          min: 8
                      },
                      ]}
                      hasFeedback>
                      <Input.Password  placeholder='Old Password' className='inputForm' />
                  </Form.Item>
              
                  <Form.Item
                      name="password"
                      rules={[
                      {
                          required: true,
                          message: 'Please input your password atleast 8 characters!',
                          min: 8
                      },
                      ]}
                      hasFeedback
                  >
                      <Input.Password  placeholder='New Password' className='inputForm' />
                  </Form.Item>

                  <Form.Item
                      name="confirm"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                      {
                          required: true,
                          message: 'The new password that you entered do not match!',
                          min: 8
                      },
                      ({ getFieldValue }) => ({
                          validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                          }
                          return Promise.reject(new Error());
                          },
                      }),
                      ]}
                  >
                      <Input.Password placeholder='Repeat Password' className='inputForm'/>
                  </Form.Item>

                    <div style={{display:'flex',justifyContent:'center'}}>
                        <Form.Item >
                        <Button type="primary" htmlType="submit" style={{width:"100px",
                        backgroundColor:"rgba(119, 73, 248, 1)",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        }}>
                        Update
                        </Button>
                    </Form.Item>
                    </div>
                  </Form>
            </div>
          </div>
        </div>
    )
}


export async function getServerSideProps({req}){
  const session = await getSession({req});
  if (!session){
    return{
      redirect:{
        destination:"/",
        permanent:false,
      }
    }
  }
  const data = getUser();
  const blogs = getBlogs();
  return{
    props:{
      userData:data,
      user:session,
      blogs:blogs
    }
  }
}