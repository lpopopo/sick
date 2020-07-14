import React , {Component} from "react"

import {connect} from "react-redux"
import Dicom from "./DicomShow"
import Dicomtool from './dicomtool'


import "../asset/css/resShow.scss"
import {Button , Table} from "element-react"
import 'element-theme-default'

import {backtohome} from "../actions/counter"

class ResShow extends Component{
    constructor(props){
        super(props)
        this.state={
            urlList:[],
            tagList:[],
            imageID:'',
            resList:[],
            index:0,
            columns: [
                {
                  label: "benign",
                  prop: "datebenign",
                  width: 120
                },
                {
                  label: "malignant",
                  prop: "malignant",
                  width: 120
                },
                {
                  label: "BI-RADS",
                  prop: "BI-RADS",
                  width: 120
                },
                {
                    label:"pathology",
                    prop: "pathology",
                    width: 120
                },
                {
                    label:"abnormality",
                    prop: "abnormality",
                    width: 120
                },
              ],
              data:[
                  {
                    'datebenign':0.1,
                    'malignant':0.9,
                    'BI-RADS':'Suspected malignant lesions, with a malignancy probability of 3% to 94%, biopsy is recommended',
                    'pathology' : 'malignant',
                    'abnormality' : 'calcification'
                },
                {
                    'datebenign':0.1,
                    'malignant':0.9,
                    'BI-RADS':'Suspected malignant lesions, with a malignancy probability of 3% to 94%, biopsy is recommended',
                    'pathology' : 'malignant',
                    'abnormality' : 'calcification'
                },
                {
                    'datebenign':0.1,
                    'malignant':0.9,
                    'BI-RADS':'阴性，无异常发现',
                    'pathology' : '良性',
                    'abnormality' : '钙化'
                },
              ]
        }
    }
    componentDidMount(){
        const {urlList , tagList , resList} = this.props.counter
        this.setState({
            urlList,
            tagList,
            resList,
            imageID : urlList[0]
        })
    }
    changeImageID(index){
        const nowImageID = this.state.urlList[index]
        this.setState({
            imageID : nowImageID,
            index
        })
    }

    render(){
        const {urlList , resList,tagList , imageID } = this.state
        const res  =  resList
        return(
            <div className="resshow">
                <div className="content">
                    <div className="dicomlist">
                        {urlList.map((value , index)=>{
                            return(
                                <div className="dicom" 
                                key={value+index}
                                onClick={()=>this.changeImageID(index)}
                                >
                                    <Dicom imgID={value}/>
                                </div>
                            )
                        })}
                    </div>
                    <div className="dicomtool">
                        { imageID && res.map((value,index)=>{
                            const {datebenign , malignant , pathology ,abnormality} = this.state.data[this.state.index]
                            const BIRADS = this.state.data[this.state.index]['BI-RADS']
                            if(this.state.index === index){
                                return(
                                    <div className="show" key={value + index}>
                                        <Dicomtool imgID={urlList[index]}
                                            res={value}
                                        />
                                        <div className="report">
                                            <Table
                                                style={{ width: '100%' }}
                                                columns={this.state.columns}
                                                border={true}
                                                height={42}
                                            />
                                            <p>
                                                <span className='good'>{datebenign}</span>
                                                <span className= 'bad'>{malignant}</span>
                                                <span>{BIRADS}</span>
                                                <span>{pathology}</span>
                                                <span>{abnormality}</span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        {/* <div className="mianReport">
                            main
                        </div> */}
                    </div>
                </div>
                <div className="btn">
                    <Button type="primary"
                    onClick = {()=>this.props.toolback()}
                    >Upload Again</Button>
                </div>
            </div>
        )
    }
}

const getcounter= state=>{
    return {
      counter : state.counter
    }
  }
  const back = dispatch=>{
    return{
      toolback(){
        dispatch(backtohome())
      }
    }
  }

  export default connect(getcounter , back)(ResShow)