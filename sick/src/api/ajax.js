import axios from "axios"


export const post = async function(url, tagList , base64List){
    const promiseArr = []
    let header = {
        "scannerType" : 1,
        "fileType" : "DICOM",
        "seriesNo" : '',
        "status" : 1,
        "images" : []
    }
    for(let i = 0 ; i < tagList.length ; i++){
        const json = JSON.parse(JSON.stringify(header))
        json.seriesNo = tagList[i].seriesNo
        json.images.push({
            "seriesNo": tagList[i].seriesNo,
            "sopNo" : tagList[i].spoUID,
            "position" : tagList[i].position,
            "content" : base64List[i]
        })
        promiseArr.push(axios.post(url , json))
    }
    const resdata =  await Promise.all(promiseArr)
    return resdata
}

// post('http://30387d5a82.wicp.vip/api/scanner/uploadImg/breastDet' , json)
  