export default function ToolHeading({title="Dummy Title", tagline="Dummy Tagline"}){

    return(
        <>
            <div className="max-w-[26rem] flex-1 
            max-sm:w-full">
                <h2 className="block font-bold text-5xl text-nowrap max-sm:text-4xl">{title}</h2>
                <p className="block text-sm text-gray-400">{tagline}</p>
            </div>
        </>
    )
}


