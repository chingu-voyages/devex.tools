export default function createBookmark(pageName, object, compareProperties){

    checkForLocalStorage()
    saveInLocal()

    function checkForLocalStorage(){
        if(!localStorage.getItem(`${pageName}-favorites`)){
            localStorage.setItem(`${pageName}-favorites`, JSON.stringify([]))
        }
    }

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




