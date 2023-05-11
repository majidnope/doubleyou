import Banner from "@/components/Banner/Banner";

import Blog from "@/components/Blogs/Blog";
import Instagram from "@/components/Instagram/Instagram";
import YouTube from "@/components/YouTube/YouTube";
import { useEventListener } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    window.addEventListener('keydown',(e)=>{
      if(e.key==="F8"){
        router.push("/admin")
      }
 
    })
  },[])

  return (
    <>
      <div className="main">
        <Banner />
        <div className="body">
          <Blog latest />
          <YouTube latest />
          <Instagram latest />
        </div>
      </div>
    </>
  );
}
