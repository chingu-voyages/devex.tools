import { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.location.href = "/colors";
  }, []);
  return <main className="h-[100vh]"></main>;
}

export default Home;
