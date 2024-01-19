import GoDeeper from "../components/GoDeeper"
import ToolHeading from "../components/ToolHeading"

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
    <main className="flex-col mt-8 sm:mt-12 lg:mt-20">
      <section className="flex justify-between 
      max-lg:flex-col max-lg:items-center max-lg:gap-y-4 max-lg:mx-6
      lg:mx-48">
          <ToolHeading title="Tool title" tagline="
          Tool tag line Tool tagline Tool tagline Tool tagline Tool tagline Tool tagline Tool tagline"/>
      </section>

      <GoDeeper linksData={linksData}/>
    
    </main>
  )
}


export default Home
