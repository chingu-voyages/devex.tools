export default function ToolHeaderSection({children}){
    return(
        <section className="flex justify-between m-8 mb-10 
        md:mx-12 md:mt-12
        max-lg:flex-col max-lg:items-center max-lg:gap-y-4 max-lg:mx-6
        lg:mx-48 lg:mt-20">
            {children}
        </section>
    )
}