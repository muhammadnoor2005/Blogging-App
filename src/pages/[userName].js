import { useRouter } from "next/router";
import AllBlogsHeader from "../components/Headers/AllBlogsHeader";
import { getSession } from "next-auth/react";
import { getBlogs } from "../services/blogsHandle";
import { Image } from "antd";
export default function(props){
    const {blogs} = props;
    const router = useRouter();
    const {userName} = router.query;

    let fromThisUser = [];
    blogs.forEach((blog)=>{
        if(blog.fullName === userName){
            fromThisUser.push(blog)
        }
    })
    const email = fromThisUser[0].userEmail;
   
    const blogList = fromThisUser.map((b)=>{
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
                    marginLeft:"1%",
                    color:"rgba(119, 73, 248, 1)",
                    fontSize:"11px",
                    cursor:"pointer"
                }}>
                    
                </div>
            </div>
        )
      })
    return(
        <div>
            <div>
                <AllBlogsHeader/>
            </div>
            <div style={{display:"flex"}}>
                <div className="mainBlogDiv">
                    <span style={{
                        fontWeight:500,
                        fontSize:"25px"
                    }}>All from {userName}</span>

                    <div>{blogList}</div>
                </div>
                <div style={{width:"200%",marginTop:"2%"}}>
                    <span>{email}</span><br/>
                    <span style={{
                        fontWeight:"500",
                        fontSize:"26px",
                        color:"rgba(119, 73, 248, 1)"
                    }}>{userName}</span>
                    <br/>
                    <Image src="/images/pfp.jpg" className="woLoginImg"/>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({req}){
    const session = await getSession({req});
    if (session){
      return{
        redirect:{
          destination:"/home/",
          permanent:false,
        }
      }
    }
    const blogs = getBlogs()
    return{
      props:{
        blogs:blogs
      }
    }
  }