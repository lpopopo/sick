import React , {Component} from "react"

import  {loadImage} from "../api/api"
class CornerstoneElement extends Component{
  constructor(props){
    super(props)
    this.state = {
      imageID : props.imgID
    }
    this.loadImage = loadImage.bind(this)
  }
  componentDidMount(){
    this.loadImage(this.state.imageID , this.refs)
  }
  // componentWillReceiveProps(nextProps){
  //   this.loadImage(nextProps.imageID , this.refs)
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

export default CornerstoneElement;
