import GoDeeper from "../components/GoDeeper"
function Home() {
  
  const linksData = [
  {
    url: 'https://en.wikipedia.org/wiki/Gabe_Newell',
    textValue: 'Dummy Link 1'
  },
  {
    url: 'https://en.wikipedia.org/wiki/SteamOS',
    textValue: 'Dummy Link 2'
  },
  {
    url: 'https://en.wikipedia.org/wiki/Half-Life:_Alyx',
    textValue: 'Dummy Link 3'
  }
  ]
  
  return (
    <main className="
    flex-col min-h-[81vh]
    ">
      <p className="
      font-mono text-6xl
      ">Home Page</p>

      <GoDeeper linksData={linksData}/>
    
    </main>
  )
}

export default Home
