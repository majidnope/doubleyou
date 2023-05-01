import Banner from "@/components/Banner/Banner";
import Recent from "@/components/Recent/Recent";
import Blog from "@/components/Blogs/Blog";
import Instagram from "@/components/Instagram/Instagram";

export default function Home() {
  return (
    <>
      <div className="main">
        <Banner />
        <div className="body">
          <Blog latest />
          <Recent />
          <Instagram />
        </div>
      </div>
    </>
  );
}
