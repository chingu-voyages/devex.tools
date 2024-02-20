export function createBookmark(
    pageName, 
    object, 
    compareProperty, 
    compareSubProperties,
    bookmarkLength, 
    setBookmarkLength
){

    checkForLocalStorage()
    saveInLocal()
    setBookmarkLength(bookmarkLength+1)

    function saveInLocal(){
        const favoriteItemsJSON = localStorage.getItem(`${pageName}-favorites`)
        const favoriteItems = JSON.parse(favoriteItemsJSON)

        if(favoriteItems.find((item)=>object[compareProperty]===item[compareProperty])){
            return
        } else if(compareSubProperties){
            for(let i=0; i<compareSubProperties.length;i++){
                if(favoriteItems.find((item)=>(
                    object[compareProperty][compareSubProperties[i]]
                    ===
                    item[compareProperty][compareSubProperties[i]]
                ))){
                return
                } else{
                    favoriteItems.push(object)
                }
            }
            localStorage.setItem(`${pageName}-favorites`, JSON.stringify(favoriteItems))
            return
        }
      
        favoriteItems.push(object)
        localStorage.setItem(`${pageName}-favorites`, JSON.stringify(favoriteItems))
    }

}

export function checkForLocalStorage(pageName){
    if(!localStorage.getItem(`${pageName}-favorites`)){
        localStorage.setItem(`${pageName}-favorites`, JSON.stringify([]))
    }

    return JSON.parse(localStorage.getItem(`${pageName}-favorites`))
}

export function saveNewArray(pageName, newArr){
    localStorage.setItem(`${pageName}-favorites`, JSON.stringify(newArr))
}

