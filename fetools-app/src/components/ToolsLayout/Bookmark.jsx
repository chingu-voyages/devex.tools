import { useEffect, useRef, useState } from "react"
import { MdCheck, MdOutlineEdit, MdClose } from "react-icons/md"
import { checkForLocalStorage, saveNewArray } from "./BookmarkUtils"

export default function Bookmark({
    pageName,
    getStyleFromBookmark,
    addStyle,
    className,
    childClassName,
    deleteProperty,
    setBookmarkLength,
    childElement,
    bookmarkHoverElement,
    childProperty,
    childSubProperty
}){

    const [editMode, setEditMode] = useState(false)
    const parentRef = useRef()

    useEffect(()=>{
        if(parentRef.current.children.length===0){
            setEditMode(false)
        }
        parentRef.current
        .parentElement
        .parentElement
        .parentElement.addEventListener('mouseleave', (e)=>{setEditMode(false)})
    },[])
    
    return(
    <>
        <div>
            <div className="text-right pb-2">
                <button
                onClick={()=>setEditMode(!editMode)} 
                className="text-2xl">
                    {editMode?<MdCheck></MdCheck>:<MdOutlineEdit></MdOutlineEdit>}
                </button>
            </div>
            <div ref={parentRef} 
            className={`        
            flex flex-wrap justify-start
            min-[395px]:gap-x-5 max-[440px]:justify-between 
            max-[550px]:justify-items-center
            sm:justify-start gap-y-5 ${className||''}`}>
                {getBookmarked()}
            </div>
        </div>
    </>
    )

    function getBookmarked(){
        
        const stored = checkForLocalStorage(pageName)       

        if(stored.length===0){return}

        const bookmarkedItems = stored.map((item, idx)=>{
            return (
                <div
                id={`bookmark-${idx}`}
                key={`bookmark-${idx}`}
                style={setStyles(item)}
                className={`relative rounded-md rounded-tl-none min-w-[100px] ${childClassName||''}`}>
                    {childElement?childElement(item[childProperty][childSubProperty]):null}
                    <div className="absolute w-[115%] h-[125%] left-[-9%] top-[-22%]">
                        <span id={`closeBook-${idx}`} onClick={deleteBookmarked} 
                        className={`
                        cursor-pointer hover:animate-wiggle p-2 bg-black/75 rounded-full
                        absolute left-1 top-3 font-bold text-sm text-white z-20
                        ${editMode?'':'hidden'}
                        `}><MdClose className="pointer-event-auto"/></span>
                    </div>
                    {childSubProperty
                    ?bookmarkHoverElement(item[childProperty][childSubProperty], editMode)
                    :bookmarkHoverElement(item[childProperty], editMode)
                    }

                </div>
            )
        })

        return <>{bookmarkedItems}</>

        function setStyles(item){
            const newStyles = getStyleFromBookmark.map(({
                styleProperty, 
                bookmarkProperty, 
                bookmarkSubProperty,
                bookmarkSubSubProperty})=>{
                
                if(bookmarkSubSubProperty){
                    return {[styleProperty]: item[bookmarkProperty][bookmarkSubProperty][bookmarkSubSubProperty]}
                }
                
                if(bookmarkSubProperty){
                    return {[styleProperty]: item[bookmarkProperty][bookmarkSubProperty]}
                }
                
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

        function deleteBookmarked(e){
            const id = parseInt(
                e.target.tagName==='SPAN'?
                e.target.id.replace('closeBook-',''):
                e.target.closest('span').id.replace('closeBook-','')
            )

            const stored = checkForLocalStorage(pageName)
            
            const newArr = stored.filter(item=>item[deleteProperty]!==stored[id][deleteProperty])
            
            saveNewArray(pageName, newArr)
            setBookmarkLength(newArr.length)
        }
    }

}