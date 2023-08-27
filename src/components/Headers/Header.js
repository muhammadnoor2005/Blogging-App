import Link from "next/link";
import { useRouter } from "next/router"
import { signOut } from "next-auth/react";

export default function ({props}){
    const router = useRouter();
    const pathName = router.pathname;
    let button;
    let head;
    let bool = false
    if(pathName === "/auth/login"){
        button = <Link href={"/auth/signup"} style={{textDecoration:"none",color:"white"}}>Signup</Link>
        head = "Login"
    }
    else if(pathName === "/auth/signup"){
        button = <Link href={"/auth/login"} style={{textDecoration:"none",color:"white"}}>Login</Link>
        head = "Sign up"
    }
    else if(pathName === "/home"){
        button = <span  
        style={{cursor:"pointer",color:"white"}} 
        onClick={()=>{signOut()}}>Logout</span>
        head = "Dashboard"
        bool = true
    }else{
        button = <span  
        style={{cursor:"pointer",color:"white"}} 
        onClick={()=>{signOut()}}>Logout</span>
        head = "Profile"
    }
    return(
        <div>
        <div style={{
            backgroundColor:"rgba(119, 73, 248, 1)",
            display:"flex",
            justifyContent:'space-between',
            paddingTop:"10px",
            paddingLeft:"9%",
            height:"5vh"
        }}>
            <span style={{
                fontWeight:"500",
                color:"white",
                fontSize:"18px"

            }}>Personal Blogging App</span>
            <div style={{minWidth:"40%"}}>

                <span><Link href={`/profile/${props}`} style={{
                textDecoration:"none",
                paddingRight:"10%",
                color:"white",
                fontWeight:"lighter",}}>{props}</Link></span>

                <span>{button}</span>

            </div>
            
        </div>
            <div style={{
                    fontSize:"30px",
                    fontWeight:"500",
                    paddingLeft:"9%",
                    height:"60px",
                    paddingTop:"1%",
                    backgroundColor:"white"
                }}>
                <span >{head}</span>
            </div>
        </div>
    )
}