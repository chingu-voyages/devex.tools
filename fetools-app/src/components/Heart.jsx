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
        const currentElement = getElement(evt, elementId)

        const favoriteItemsJSON = localStorage.getItem(`${pageName}-favorites`)
        const favoriteItems = JSON.parse(favoriteItemsJSON)

        if(!favoriteItems.includes(elementId)){
            favoriteItems.push(elementId)
            console.log(favoriteItems)
            localStorage.setItem(`${pageName}-favorites`, JSON.stringify(favoriteItems))
        } else{
            console.log(favoriteItems.pop())
            localStorage.setItem(`${pageName}-favorites`, JSON.stringify(favoriteItems))
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


}

function checkForLocalStorage(pageName){
    if(!localStorage.getItem(`${pageName}-favorites`)){
        localStorage.setItem(`${pageName}-favorites`, JSON.stringify([]))
    }
}

function getElement(evt, elementId){
    return evt.target.closest(`#${elementId}`)
}

