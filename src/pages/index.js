import AllBlogsHeader from "../components/Headers/AllBlogsHeader";
import { getSession } from "next-auth/react";
import { getBlogs } from "../services/blogsHandle";
import {Image} from "antd";
import Link from "next/link";

export default function Home(props) {
  const {blogs} = props;
  
  const blogList = blogs.map((b)=>{
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
                <Link style={{ color:"rgba(119, 73, 248, 1)",textDecoration:"none"}}href={`/${b.fullName}`}>
                  see all from this user</Link>
            </div>
        </div>
    )
  })

  return(
    <div>
      <div>
        <AllBlogsHeader/>
      </div>

      <div className="mainBlogDiv">
        <span style={{
                  fontWeight:500,
                  fontSize:"25px"
              }}>All Blogs</span>

        <div>{blogList}</div>
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
