import ToolHeaderSection from "../components/ToolHeaderSection"
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
      
      <ToolHeaderSection>
        <ToolHeading title="Tool title" tagline="
        Tool tag line Tool tagline Tool tagline Tool tagline Tool tagline Tool tagline Tool tagline"/>
        <ToolHeading title="Tool title" tagline="
        Tool tag line Tool tagline Tool tagline Tool tagline Tool tagline Tool tagline Tool tagline"/>
      </ToolHeaderSection>

      <GoDeeper linksData={linksData}/>
    
    </main>
  )
}


export default Home
