import Banner from "@/components/Banner/Banner";
import Recent from "@/components/Recent/Recent";
import { useRouter } from "next/router";

export default function Home() {
  const nav = useRouter();
  setTimeout(() => {
    nav.push("/home");
  }, 1000);
  return (
    <>
      <div className="landing">
        <h1>Welcome visiters</h1>
      </div>
    </>
  );
}
