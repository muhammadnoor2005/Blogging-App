import Link from "next/link";
import { useRouter } from "next/router";
export default function(){
    const router = useRouter();
    const pathName = router.pathname;
    const date = new Date();
    const hours = date.getHours();
   console.log(hours)
    let head;
    if (pathName != "/"){
        head = <Link style={{textDecoration:"none",color:"rgba(119, 73, 248, 1)"}} href={"/"}>Back to all blogs</Link>
    }
    
    else{
    if(hours >= 5 && hours < 12){
        head = "Good Morning Readers!"
    }
    else if(hours >= 12 && hours < 16){
        head = "Good Afternoon Readers!"
    }
    else if(hours >= 16 && hours < 20){
        head = "Good Evening Readers!"
    }
    else{
        head = "Good Night Readers!"
    }}
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

                <div style={{minWidth:"20%"}}>
                    <Link style={{textDecoration:"none",color:"white"}} href={"/auth/login/"}>Login</Link>
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