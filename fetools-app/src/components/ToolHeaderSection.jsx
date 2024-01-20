export default function ToolHeaderSection({children}){
    return(
        <section className="flex justify-between 
        max-lg:flex-col max-lg:items-center max-lg:gap-y-4 max-lg:mx-6
        lg:mx-48">
            {children}
        </section>
    )
}