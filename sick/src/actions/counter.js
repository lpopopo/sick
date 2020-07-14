import {
    UPLOADED,
    UPLOADAGAIN,
    ONLOAD
} from "../constants/counter"



export const update = (urlList , tagList , resList)=>{
    return {
        type:UPLOADED,
        urlList,
        tagList,
        resList
    }
}

export const backtohome = ()=>{
    return{
        type:UPLOADAGAIN
    }
}

export const markOnload = ()=>{
    return{
        type:ONLOAD
    }
}