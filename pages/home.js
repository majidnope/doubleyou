import Banner from "@/components/Banner/Banner";
import Recent from "@/components/Recent/Recent";
import RecentBlog from "@/components/RecentBlogs/RecentBlog";

export default function Home() {
  return (
    <>
      <div className="main">
        <Banner />
        <div className="body">
          <RecentBlog />
          <Recent />
        </div>
      </div>
    </>
  );
}
