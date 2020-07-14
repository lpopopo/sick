import React , {Component} from "react"

import {Button , Message , Loading} from "element-react"

import "../asset/css/upload.scss"

import PicUpload from "./picUpload"

import Dicom from "./DicomShow"

import {post} from "../api/ajax"

import  {loadImage , dicomtojpg} from "../api/api"

import {connect} from "react-redux"
import {update} from "../actions/counter"

import {data} from '../asset/json/test.json'

const {ipcRenderer} = window.electron

class Upload extends Component{
    constructor(){
        super()
        this.state = {
            tagList:[],
            urlList: [],
            fileList:[],
            beginParser:false
        }
        this.getUrl = this.getUrl.bind(this)
        this.picSend  = this.picSend.bind(this)   
        this.post = post.bind(this)    
        this.loadImage = loadImage.bind(this) 
        this.dicomtojpg = dicomtojpg.bind(this)
    }
    //添加图片的url
    getUrl(url , tag , file){
        if(this.state.urlList.length < 4){
            this.setState({
                urlList:[...this.state.urlList , url],
                tagList: [...this.state.tagList , tag],
                fileList : [...this.state.fileList , file]
            })
        }else{
            Message('最多只能上传四张照片');
        }
    }
    setStateAsync(state) {
        return new Promise(async(resolve) => {
          await this.setState(state, resolve)
        });
    }

    //图片上传
    async picSend(){
        await this.setStateAsync({beginParser:true})
        const {urlList , tagList , fileList} = this.state
        // const base64List = ipcRenderer.sendSync('tobase64' , fileList)
        // const res = await post('http://30387d5a82.wicp.vip/api/scanner/uploadImg/breastDet',
        // tagList , 
        // base64List
        // ) 
        this.props.test(urlList , tagList , data)
    }

    //深拷贝
    deepCopy(data){
        return JSON.parse(JSON.stringify(data))
    }

    //删除图片
    deletePic(index){
        const{urlList , tagList , fileList} = this.deepCopy(this.state)
        urlList.splice(index , 1)
        tagList.splice(index , 1)
        fileList.splice(index , 1)
        this.setState({
            urlList,
            tagList,
            fileList,
        })
    }
    deleteAll(){
        this.setState({
            urlList:[],
            tagList:[],
            fileList:[]
        })
    }

    render(){
        return(
            <div className="Upload">  
            {this.state.beginParser && <Loading fullscreen={true} text="拼命加载中" />}
                <div className="Upload_fileChoose">
                    <PicUpload getUrl={this.getUrl}></PicUpload>
                </div>                    
                <div className="Upload_picShow">
                    <div className="imgCon">
                        {
                            this.state.urlList.map((key, value) => {
                                return (
                                    <div className="dicomcon" key={key + value}>
                                        <Dicom
                                            imgID={key}
                                        ></Dicom>
                                        <div className="dicommsg">
                                            <p className="filename">{this.state.fileList[value].name}</p>
                                            <p className="quxiao" onClick={()=>{this.deletePic(value)}}></p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {this.state.urlList.length === 0 ? '' : (
                    <div className="buttom">
                        <Button type="primary" plain={true} className="no" onClick={()=>this.deleteAll()}>Cancel</Button>
                        <Button type="primary" onClick={() => { this.picSend() }}>Upload</Button>
                    </div>   
                )}           
            </div>
        )
    }
}

const getcounter= state=>{
    return {
      counter : state.counter
    }
  }
  
  const isupdate = dispatch=>{
    return{
      test(urlList, tagList,resList){
        dispatch(update(urlList , tagList , resList))
      }
    }
  }

export default connect(getcounter , isupdate)(Upload)