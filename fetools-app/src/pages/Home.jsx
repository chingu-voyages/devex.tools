import { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.location.href = "/colors";
  }, []);
  return null;
}

export default Home;
