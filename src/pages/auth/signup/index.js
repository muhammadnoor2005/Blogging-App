import {getSession} from "next-auth/react"
import {
  Button,
  Form,
  Input,
} from 'antd';

import { useRouter } from 'next/router';
import AuthPageHeader from "@/src/components/Headers/Header";

export default function SignupForm (){
  const router = useRouter()
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try{ 
        const response = await fetch("/api/auth/signup",{
            method:"POST",
            body:JSON.stringify(values),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response.ok){
            alert("Sign up successful");
            router.push("../auth/login");
        }
        else{throw new Error("Email already exits")}
    }catch(err){
        alert(err);
    }
};



return (
    <div>
        <AuthPageHeader/>
        <div className='ima'>
            <div className='parentDivSignup' >
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
                <Form.Item
                    name="firstName"
                    rules={[
                    {
                        type: 'text',
                        message: 'The input is not valid',
                    },
                    {
                        required: true,
                        message: 'Minimum length 3 characters and max 20',
                        min:3,
                        max:20,
                    },
                    ]}
                >
                    <Input placeholder='First Name' className='inputForm'  />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    rules={[
                    {
                        type: 'text',
                        message: 'The input is not valid',
                        
                    },
                    {
                        required: true,
                        message: 'Minimum length 1 characters and max 20',
                        min:1,
                        max:20,
                    },
                    ]}
                >
                    <Input placeholder='Last Name' className='inputForm'/>
                </Form.Item>

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
                    hasFeedback
                >
                    <Input.Password  placeholder='Password' className='inputForm' />
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
                    Signup
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
