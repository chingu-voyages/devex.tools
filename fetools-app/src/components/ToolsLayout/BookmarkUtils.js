export function createBookmark(pageName, object, compareProperties, bookmarkLength, setBookmarkLength){

    checkForLocalStorage()
    saveInLocal()
    setBookmarkLength(bookmarkLength+1)

    function saveInLocal(){
        const favoriteItemsJSON = localStorage.getItem(`${pageName}-favorites`)
        const favoriteItems = JSON.parse(favoriteItemsJSON)


        for(let i=0; i<compareProperties.length;i++){
            if(favoriteItems.find((item)=>object[compareProperties[i]]===item[compareProperties[i]])){
                return
            } else{
                favoriteItems.push(object)
            }
        }
      
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

