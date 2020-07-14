
import {
    UPLOADED,
    UPLOADAGAIN,
    ONLOAD
} from "../constants/counter"

const INITIAL_STATE = {
    imageid : [],
    taglist : [],
    resList : [],
    upload : false,
    onload:false
}

export default function counter(state = INITIAL_STATE , action){
    let newstate = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case UPLOADED:
            const {urlList , taglist , resList} = action
            newstate.upload = true
            newstate.urlList = urlList
            newstate.taglist = taglist
            newstate.resList = resList
            return newstate
        case UPLOADAGAIN:
            return {
                imageid: [],
                taglist: [],
                resList: [],
                upload: false,
                onload : true
            }    
        case ONLOAD:    
            newstate.onload = true
        return newstate
        default:
            return state
    }
}