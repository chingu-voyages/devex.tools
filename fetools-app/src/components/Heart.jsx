import { useState } from "react";

import HeartIcon from "./HeartIcon";

export default function Heart({addClass, pageName, elementId}){

    checkForLocalStorage(pageName)

    const [heartedItem, setHeartedItem] = useState(false)

    return (
        <>
          <HeartIcon onClick={(evt)=>handleClick(evt)} isHearted={updateHeart()} addClass={addClass}/>
        </>
    )

    function handleState(){
        setHeartedItem(!heartedItem)
    }

    function handleClick(evt){
        const currentElement = evt.target.closest(`#${elementId}`) //get element with id

        const favoriteItemsJSON = localStorage.getItem(`${pageName}-favorites`)
        const favoriteItems = JSON.parse(favoriteItemsJSON)

        if(!favoriteItems.includes(elementId)){
            favoriteItems.push(elementId)
            localStorage.setItem(`${pageName}-favorites`, JSON.stringify(favoriteItems))
        } else{
            const newArray = favoriteItems.filter(element => element !== elementId)
            localStorage.setItem(`${pageName}-favorites`, JSON.stringify(newArray))
        }

        handleState()
    }

    function updateHeart(){
        if(pageName === 'CharacterFinder'){
            return characterFinder()
        }
    }
    
    function characterFinder(){
        const favoriteItemsJSON = localStorage.getItem(`${pageName}-favorites`)
        const favoriteItems = JSON.parse(favoriteItemsJSON)

        if(favoriteItems.includes(elementId)){
            return true
        } else{
            return false
        }
    }

    function checkForLocalStorage(){
        if(!localStorage.getItem(`${pageName}-favorites`)){
            localStorage.setItem(`${pageName}-favorites`, JSON.stringify([]))
        }
    }
}




