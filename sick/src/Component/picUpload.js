import React ,{Component} from "react"
import "../asset/css/picUpload.scss"
import "../asset/font/iconfont.css"
import { Message} from "element-react"
import 'element-theme-default';


import {imageID , dicomparser} from "../api/api"


class PicUpload extends Component{
    constructor(){
        super()
        this.ref = React.createRef()
        this.inputOnchnage = this.inputOnchnage.bind(this)
        this.refShow = this.refShow.bind(this)
        this.readFileToBase = this.readFileToBase.bind(this)
        this.checkMaxLength = this.checkMaxLength.bind(this)
        this.fileDrop = this.fileDrop.bind(this)
        this.dicomCheck = this.dicomCheck.bind(this)
        this.MAX_FILE_SIZE = 5 * 1000 * 1000 //最大限制不超过5M
    }
    //验证是否为dicom文件
    dicomCheck(file){
        const typeArr = file.name.split(".")
        const type = typeArr[typeArr.length-1]
        if(type === "dcm") return "dcm"
        if(file.type.match("image/*")) return "image"
        return false
    }
    //click上传
    refShow() {
        this.ref.click()
    }
    //读取文件
    readFileToBase(file , type){
        const filemsg = {
            name : file.name,
            path : file.path
        }
        return new Promise( (reslove , reject)=>{
            let url;
            if(type === "image"){
                // const reader = new FileReader()
                // reader.readAsDataURL(file)
                // reader.onload = (res)=>{
                //     //更新url
                //     base = res.target.result
                //     console.log(url)
                //     reslove({ base, url })
                // }                
            }else{
                url = imageID(file)
                const reader = new FileReader()
                reader.readAsArrayBuffer(file)
                reader.onload = function(res){
                    let arrayBuffer = res.target.result
                    let { seriesNo , spoUID , position} = dicomparser(arrayBuffer)
                    let image = { seriesNo, spoUID , position}
                    reslove({ url, image , filemsg})
                }
            }
        })
    }

    //检查是否最大长度
    checkMaxLength(file){
        return file.size > this.MAX_FILE_SIZE ? false : true
    }

    //处理点击事件的任务
    inputOnchnage(e){
        const file = e.target.files[0] //获取图片资源
        const fileType = this.dicomCheck(file)
        if(fileType) {  //只允许传输图片或dicom文件
            this.readFileToBase(file , fileType).then((data) => {
                const { url, image , filemsg } = data
                this.props.getUrl(url , image , filemsg)
            })
        }else{
            Message("暂时仅支持DICOM文件")
        } 
    }

    //拖拽上传
    fileDragover(e){
        e.preventDefault()    //阻止默认事件
        e.stopPropagation()   //阻止冒泡
    }

    fileDrop(e){
        e.preventDefault()    
        e.stopPropagation()     
        const files = [...e.dataTransfer.files]
        const file = files[files.length-1]
        const fileType = this.dicomCheck(file)
        if(fileType) {  //只允许传输图片或dicom文件
            this.readFileToBase(file , fileType).then((data) => {
                const { url, image , filemsg } = data
                this.props.getUrl(url , image , filemsg)
            })
        }else{
            Message("暂时仅支持DICOM文件")
        } 
    }

    fileDropEnter(e){
        e.preventDefault()    
        e.stopPropagation()         
    }
    fileDropLeave(e){
        e.preventDefault()    
        e.stopPropagation() 
    }



    render(){
        return(
            <div className="picUpload">
                <div className="picCon" 
                onClick = {this.refShow}
                onDrop = {this.fileDrop}
                onDragOver = {this.fileDragover}
                >
                    <span>Drag and drop the file to this point or<span>&nbsp;&nbsp;click Browse to&nbsp;&nbsp;</span>upload the file</span>
                    <input 
                    ref = {(node)=> this.ref=node}
                    type="file" 
                    accept="" 
                    onChange={e=>this.inputOnchnage(e)}
                    ></input>
                </div>
            </div>
        )
    }
}

export default PicUpload;