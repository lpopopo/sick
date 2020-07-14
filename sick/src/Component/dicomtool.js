import React , {Component} from "react"

import  {loadImageTools} from "../api/api"
class CornerstoneElementtool extends Component{
  constructor(props){
    super(props)
    this.state = {
      imageID : props.imgID,
      res : props.res
    }
    this.loadImageTools = loadImageTools.bind(this)
  }
  componentDidMount(){
    this.loadImageTools(this.state.imageID , this.refs , this.state.res)
  }
  // componentWillReceiveProps(nextProps){
  //   this.loadImageTools(nextProps.imgID , this.refs , nextProps.res)
  // }
  render(){
    return(
      <div 
      ref={ref=>this.refs = ref}
      onClick = {this.deletePic}
      >
      </div>
    )
  }
}

export default CornerstoneElementtool;