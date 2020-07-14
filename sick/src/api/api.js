
  import  * as cornerstone from "cornerstone-core"
  import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader"
  import dicomParser from "dicom-parser"
  
  //tools
//   import cornerstoneMath from "cornerstone-math"
//   import cornerstoneTools from "cornerstone-tools"
//   import Hammer from "hammerjs"

  cornerstoneWADOImageLoader.external.cornerstone = cornerstone
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser

//   cornerstoneTools.external.cornerstone = cornerstone
//   cornerstoneTools.external.Hammer = Hammer
//   cornerstoneTools.external.cornerstoneMath = cornerstoneMath

  
//   const cornerstoneToolsConfig = {
//     mouseEnabled: true,
//     touchEnabled: true,
//     globalToolSyncEnabled: false,
//     showSVGCursors: false,
//   }

//   cornerstoneTools.init(cornerstoneToolsConfig)

//   const LengthTool = cornerstoneTools.LengthTool

let shouldclearRect = []

const mouseWheelEvents = ['mousewheel', 'DOMMouseScroll']

//放大与缩小
const mousedown = (e , ref)=>{
    let lastX = e.pageX;
    let lastY = e.pageY;

    function mouseMoveHandler(e) {
      const deltaX = e.pageX - lastX;
      const deltaY = e.pageY - lastY;
      lastX = e.pageX;
      lastY = e.pageY;

      const viewport = cornerstone.getViewport(ref);
      viewport.translation.x += (deltaX / viewport.scale);
      viewport.translation.y += (deltaY / viewport.scale);
      cornerstone.setViewport(ref, viewport);
    }

    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}
 const addEventListenerforref = (ref)=>{
    mouseWheelEvents.forEach(function(eventType) {
        ref.addEventListener(eventType, function (e) {
              // Firefox e.detail > 0 scroll back, < 0 scroll forward
              // chrome/safari e.wheelDelta < 0 scroll back, > 0 scroll forward
              let viewport = cornerstone.getViewport(ref);
              if (e.wheelDelta < 0 || e.detail > 0) {
                viewport.scale -= 0.25;
              } else {
                viewport.scale += 0.25;
              }
        
              cornerstone.setViewport(ref, viewport);
        
              // Prevent page from scrolling
              return false;
            });
          });
 }
  
  export const imageID = (file)=>{
      return cornerstoneWADOImageLoader.wadouri.fileManager.add(file)
  }
  
  export const onImageRendered = function(){
      const viewport = cornerstone.getViewport(this.element);
      this.setState({
        viewport
      });
  }
  
  export const loadImage = function(imageID , ref){
      // const imageID = this.state.imageID
      // const ref  = this.refs
      cornerstone.enable(ref);
      cornerstone.loadImage(imageID).then((image)=>{
        const  viewport = cornerstone.getDefaultViewportForImage(ref, image)
        cornerstone.displayImage(ref , image , viewport)
      })
  }

  export const  loadImageTools = function(imageID , ref , res){
    console.log(res)
      const rectList = []
      let results
      try{
         results = res['results'][0]['lesion_pos']
         for(let i = 0 ; i < results.length ; i++){
          const rect = results[i]["rect"]
          rectList.push(rect)

        }         
      }catch{
      }
      cornerstone.enable(ref);
      cornerstone.loadImage(imageID).then((image)=>{
          const  viewport = cornerstone.getDefaultViewportForImage(ref, image)
          cornerstone.displayImage(ref , image , viewport)
      })   
      ref.addEventListener("mousedown" , e=>{
          mousedown(e , ref)
      })
      addEventListenerforref(ref)
      ref.addEventListener('cornerstoneimagerendered', e=>{
        const eventData = e.detail
        cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, eventData.canvasContext);

        // NOTE: The coordinate system of the canvas is in image pixel space.  Drawing
        // to location 0,0 will be the top left of the image and rows,columns is the bottom
        // right.
        const context = eventData.canvasContext;
        // console.log(context)
        // if(shouldclearRect.length !== 0){
        //   context.drawCanvas()
        //   for(let i = 0 ; i < shouldclearRect.length ; i++){
        //     // context.fillStyle = "white"
        //     // context.clearRect(shouldclearRect[i][0] , shouldclearRect[i][1] , shouldclearRect[i][2] , shouldclearRect[i][3])
        //   }
        // }
        context.beginPath();
        context.strokeStyle = 'red'
        context.lineWidth =10;
        for(let i = 0 ; i < rectList.length ; i++){
            try{
                context.rect(rectList[i][0] , rectList[i][1] , rectList[i][2],rectList[i][3])
            }catch{

            }
        }
        // shouldclearRect = rectList
        context.stroke()
        context.fillStyle = "white"
        // context.font = "500px Arial"
        // context.fillText("Tumor Here", 400, 800)
      });       
  }
  
  
  //解析dicom文件
  export const dicomparser = (arrayBuffer)=>{
      let byteArray = new Uint8Array(arrayBuffer);
      let dataSet = dicomParser.parseDicom(byteArray);
      let spoUID =  dataSet.string("x00020003")
      let seriesNo = dataSet.string("x0020000e")
      const R_positon = dataSet.string('x00200020')
      const L_positon = dataSet.string('x00200060')
      const position = L_positon + "-" + R_positon
      //const piexdataElement = dataSet.elements.x7fe00010
      //const piexdata = new Uint8Array( dataSet.byteArray.buffer, piexdataElement.offset, piexdataElement.length )
      // base  = base64.encode(piexdata)
      return  {spoUID , seriesNo  , position}    
  }
  
  
  //压缩
  export const compress = ()=>{}
  
  export const dicomtojpg = (canvas)=>{
      let base = ''
      // const canvasList = document.getElementsByClassName('cornerstone-canvas')
      // const canvas = document.getElementById('dwv').getElementsByClassName('cornerstone-canvas')[0]
      base = canvas.toDataURL("image/png" , 1).split(";")[1].split(",")[1]
      return base
  }
  