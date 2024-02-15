import { MdOutlineEdit } from "react-icons/md"

export default function Bookmark({
    pageName,
    getStyleFromBookmark,
    addStyle,
    className,
    childClassName,
    children
}){

    return(
    <>
        <div >
            <div className="text-right pb-2">
                <button className="text-2xl"><MdOutlineEdit></MdOutlineEdit></button>
            </div>
            <div className={className}>{getBookmarked()}</div>
        </div>
    </>
    )

    function getBookmarked(){
        
        const stored = checkForLocalStorage(pageName)
        
        if(stored.length===0){return}

        const bookmarkedItems = stored.map((item, idx)=>{
            return (
                <div key={`bookmark-${idx}`}
                style={setStyles(item)}
                className={childClassName}>
                    {children}
                </div>
            )
        })

        return <>{bookmarkedItems}</>


        function setStyles(item){
            const newStyles = getStyleFromBookmark.map(({styleProperty, bookmarkProperty})=>{
                return {[styleProperty]: item[bookmarkProperty]}
            })

            const newStyleObj = {}

            for(let i=0; i<newStyles.length; i++){
                
                for(const key in newStyles[i]){
                    newStyleObj[key] = newStyles[i][key] 
                }
            }

            for(const key in addStyle){
                newStyleObj[key] = addStyle[key] 
            }

            return newStyleObj
        }
    }

    function checkForLocalStorage(){
        if(!localStorage.getItem(`${pageName}-favorites`)){
            localStorage.setItem(`${pageName}-favorites`, JSON.stringify([]))
        }

        return JSON.parse(localStorage.getItem(`${pageName}-favorites`))
    }

}