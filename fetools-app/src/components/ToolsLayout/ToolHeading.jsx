export default function ToolHeading({title="Dummy Title", tagline="Dummy Tagline"}){

    return(
        <>
            <div className="flex-1 max-sm:max-w-80">
                <h2 className="block font-bold text-5xl">{title}</h2>
                <p className="block text-sm text-gray-400">{tagline}</p>
            </div>
        </>
    )
}


