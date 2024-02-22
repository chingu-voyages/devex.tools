export function createBookmark(
    pageName, 
    object, 
    compareProperty, 
    compareSubProperties,
    bookmarkLength, 
    setBookmarkLength
){

    checkForLocalStorage(pageName)
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

export function compareItems(a, b) {
    // First try simple comparison for strings and numbers
    if (a === b) return true;
  
    // Check if objects have same length
    if (Object.keys(a).length !== Object.keys(b).length) return false;
  
    // Check if all properties are the same
    for (let key in a) {
      if (a[key] !== b[key]) return false;
    }
  
    return true;
}
