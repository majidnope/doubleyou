import Banner from "@/components/Banner/Banner";

import Blog from "@/components/Blogs/Blog";
import Instagram from "@/components/Instagram/Instagram";
import YouTube from "@/components/YouTube/YouTube";

export default function Home() {
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
