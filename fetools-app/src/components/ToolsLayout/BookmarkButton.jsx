import { useState } from "react";
import { compareItems, checkForLocalStorage, saveNewArray } from "./BookmarkUtils";

import Icon from "../Icon";

export default function BookmarkButton({
    className, 
    comparisonObj, 
    checkProperty, 
    pageName, 
    checkObjectKeys = false, 
    setBookmarkLength
}){

    const [isBookmarked, setIsBookmarked] = useState(compareItems(comparisonObj, pageName, checkProperty, checkObjectKeys))

    console.log(compareItems(comparisonObj, pageName, checkProperty, checkObjectKeys))

    return(
        <Icon 
        name={isBookmarked?'bookmark_remove':'bookmark_add'}
        onClick={isBookmarked?deleteBookmarked:saveInLocal}
        className={`cursor-pointer ${className}`}
        />
    )

    function saveInLocal(){
        const bookmarkedItems = checkForLocalStorage(pageName)
        if(bookmarkedItems.find((item)=>comparisonObj[checkProperty]===item[checkProperty])){
            return
        }
        bookmarkedItems.push(comparisonObj)
        localStorage.setItem(`${pageName}-favorites`, JSON.stringify(bookmarkedItems))
        setBookmarkLength(bookmarkedItems.length)
        setIsBookmarked(true)
    }


    function deleteBookmarked(){

        const storedBookmarks = checkForLocalStorage(pageName)
        
        const newArr = storedBookmarks.filter((item,idx)=>item[checkProperty]!==storedBookmarks[idx][checkProperty])
        
        saveNewArray(pageName, newArr)
        setBookmarkLength(newArr.length)
        setIsBookmarked(false)
    }
}