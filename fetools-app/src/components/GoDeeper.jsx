export default function GoDeeper({linksData}){
    return(
        <aside 
        className="
        flex flex-col flex-1 gap-3
        md:p-48
        ">
            <h1 className="
            font-bold text-3xl leading-none
            ">Go Deeper...</h1>
            <ul className="
            flex flex-col gap-3 list-none list-inside
            ">
               {generateAnchorElements(linksData)} 
            </ul>
        </aside>
    )

    function generateAnchorElements(array){
        console.log(array)
    
        const liElements = array.map((data)=>(
            <li key={`GoLink-${array.indexOf(data)}`}>
                <a href={data.url}
                className="
                underline underline-offset-4 text-md font-bold
                ">{data.textValue}</a>
            </li>
        ))

        return liElements
        

    }

}