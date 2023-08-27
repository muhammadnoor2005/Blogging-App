
import React from 'react';
import { Button, Form, Input } from 'antd';
import {getSession, signIn} from "next-auth/react"
import AuthPageHeader from '@/src/components/Headers/Header';
export default function LoginForm(){
  const onFinish = (values) => {
    const {email,password} = values;
    signIn("credentials",{
      redirect:true,email,password
    })
    console.log("Login successful");
  };
  return (

    <div>
      <AuthPageHeader/>
    <div className='grandDiv'>
        <div className='formParentDiv'>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            style={{
              width:300,
              display:"flex",
              flexDirection:"column",
              justifyContent:"center"

            }}
          >
          
            
            <Form.Item
                name="email"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input placeholder='Email' className='inputForm'/>
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
            >
                <Input.Password  placeholder='Password' className='inputForm'/>
            </Form.Item>
            <div style={{display:'flex',justifyContent:'center'}}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{width:80,backgroundColor:"rgba(119, 73, 248, 1)"}}>
                  Log in
                </Button>
              </Form.Item>
            </div>
            
          </Form>
        </div>
    </div>
    </div>
  );
};
export async function getServerSideProps({req}){
  const session =await getSession({req});
  if (session){
    return{
      redirect:{
        destination:"/home/",
        permanent:false,
      }
    }
  }
  return{
    props:{}
  }
}
