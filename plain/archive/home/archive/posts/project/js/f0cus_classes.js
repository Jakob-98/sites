// F0CUS CLASS DEFINITIONS

//CLASS Model
class Model {
  constructor() {
    this.processes = []; //processes of the model sorted by x value
    this.pLinks = [];
    this.selection = [];
    this.activeLink = null;
    this.parentLevel = "A0";
  }
  addProcess (Parent) { //adding a process to the model, called by MOUSE
    var p = new Process(Parent); 
    this.processes.push(p); //pushes the created process to the processes of the MODEL
	  p.x = MOUSE.pageXUp;
	  p.y = MOUSE.pageYUp;
    p.name = "process: " + (this.processes.indexOf(p) + 1);
    p.parent.subProcesses.push(p);
    p.doDraw();
    console.log("process created on:"+p.x+":"+p.y); 
  }
  addLink () {
    var l = new Link();
    this.pLinks.push(l);
    this.activeLink = l;
    l.x = MOUSE.pageXDown
    l.y = MOUSE.pageYDown;
    l.xEnd = MOUSE.pageXDown;
    l.yEnd = MOUSE.pageYDown;
    l.doDraw();
  }
  reDraw() { //redrawing the model, drawing each element of MODEL
    this.linkManager();
    this.sortArrays();

    paper.clear();
    for (var process of this.processes) {
      process.doDraw();
    }
    for (var links of this.pLinks) {
      links.doDraw();
    }
  }
  clearSelection () { //clear the selection
    this.selection = [];
  }
  sortArrays() { 
    this.processes.sort(this.x);//sort the processes by x value
    this.pLinks.sort(this.yEnd);//sort the links by their y end value
  }
  linkManager() {
    for (var process of this.processes) {
      process.linksClear();
    }
    for (var link of this.pLinks) {
      if (link !== this.activeLink){
        if (link.P1) {
          link.P1.linksOut.push(link);
        }
        if (link.P2) {
          link.P2.linksIn.push(link);
          switch (link.type) {
            case "I":
              link.P2.linksInI.push(link);
              break;
            case "M":
              link.P2.linksInM.push(link);
              break;
            case "C":
              link.P2.linksInC.push(link);
              break;
          
            default:
              break;
          }
        }
      }
    }
  }
}
//END CLASS Model


//CLASS Process
class Process { //TO DO: the this.x/y is currently in the left top corner, this should be in the middle instead. 
  constructor(Parent) {
    this.parent = Parent;
    this.subProcesses = [];
    this.shape = null;
    this.fillColor = '#DCDCDC';
    this.stepNr = 0;
    this.relativePos = {x : 0, y : 0};
    this.selectDragArea = "";
    this.dragAreaPath = [];
    this.linksOut = [];
    this.linksIn = [];
    this.linksInI = [];
    this.linksInC = [];
    this.linksInM = [];
    this.linksInYUp = []; //how many links have the same x coordinates on the "halfway up-point" of the line.
		this.linksInYDown = [];
		this.linksOverM = false;
    this.linksOverC = false;
    this.xMargin = 1/4 * RECT_WIDTH;
    this.yMargin = 1/3 * RECT_HEIGHT;
  }
  doDraw() { //draw itself
    if (MODEL.selection.includes(this)) { //changes color when selected
      this.fillColor = '#DCDCDC';
    } else {
      this.fillColor = 'White';
    }
    this.calcStepNr(); //calculate the step number
    this.linkSorter(); //linksorter shouldnt be called from here for cleanlyness (one sort per movement is enough) will change later. BUG/Thing that I dont get; this.linksIn wont work in linksorter, so I have to add (this). Fix for later.

    if (this.shape) this.shape.remove();
    this.shape = paper.set();
    this.shape.push(paper.rect(this.x - 1/2 * RECT_WIDTH, 
      this.y - 1/2 * RECT_HEIGHT, RECT_WIDTH, RECT_HEIGHT)
      .attr({cursor: 'pointer', fill: this.fillColor}));

    this.detDragPath();

    this.shape.push(paper.path(this.dragAreaPath)
      .attr({
        'opacity' : 1,
        'fill' : 'lightblue',
         'fill-opacity' : 0.3,
        'cursor': 'pointer'
      }));	
    this.shape.push(paper.text(this.x, this.y, this.name)
      .attr({cursor: 'pointer'}));
    this.shape.push(paper.text(this.x + 3/9 * RECT_WIDTH, this.y + 3/9 * RECT_HEIGHT,'A' + this.stepNr) //TODO add parent "number" -> parent is A1, add 1 to A number 
      .attr({cursor: 'pointer'}));
  }
  onElement (e) { //returns true if element is under cursor, adds element to selection
    if (Math.abs(MOUSE.x - this.x) <= 0.5 * RECT_WIDTH &&
    Math.abs(MOUSE.y- this.y) <= 0.5 * RECT_HEIGHT) {
      return true;
    } else {
      return;
    }
  }
  pointInProcess (x, y) {//returns true if point is in process including margins
    if (Math.abs(x - this.x) < 0.5 * RECT_WIDTH + this.xMargin &&
    Math.abs(y- this.y) < 0.5 * RECT_HEIGHT + this.yMargin) {
      return true;
    }
    return false;
  }
  calcStepNr() { //calculate which step this is
    var nr = 1;
    for (var process of MODEL.processes) { //TODO sort processes and links  by x value
      if (process.x < this.x) {
        nr += 1;
      }
    }
    this.stepNr = nr;
  }
  detDragArea() {//determines in what area youre dragging the link, then sets the value of the selectDragArea
    if ((MOUSE.y - this.y) - (MOUSE.x - this.x) <= 0 && - (MOUSE.x - this.x) - (MOUSE.y - this.y) >= 0 ) {
      this.selectDragArea = "C";
    } 
    if ((MOUSE.y - this.y) - (MOUSE.x - this.x) >= 0 && - (MOUSE.x - this.x) - (MOUSE.y - this.y) <= 0 ) {
      this.selectDragArea = "M";
    } 
    if ((MOUSE.y - this.y) + (MOUSE.x - this.x) <= 0 && - (MOUSE.x - this.x) + (MOUSE.y - this.y) >= 0 ) {
      this.selectDragArea = "I";
    } 
    if ((MOUSE.y - this.y) + (MOUSE.x - this.x) >= 0 && - (MOUSE.x - this.x) + (MOUSE.y - this.y) <= 0 ) {
      this.selectDragArea = "O";
    }
  }
  detDragPath() {
    if (MOUSE.ON_EL !== this || !LINK_ELEM) {
      this.selectDragArea = "";
    }
    this.dragAreaPath = getDragArea(this.selectDragArea, this.x, this.y);
  }
  removeSelf() {
    if(this.parent) {
      this.parent.subProcesses.splice(this.parent.subProcesses.indexOf(this));
    }
    MODEL.processes.splice(MODEL.processes.indexOf(this));
    MODEL.redraw();
	}
  pathOnSelf(startX, startY, endX, endY, pathType) {  
    if (
      pathType === "horizontal" 
      &&(startX < (this.x + 0.5 * RECT_WIDTH + this.xMargin) && endX > (this.x - 0.5 * RECT_WIDTH - this.xMargin))
      && (Math.abs(startY - this.y) <= 0.5 * (RECT_HEIGHT + this.yMargin)) //for horizontal paths startY = endY. 
    ){
      return this;
    }
    if (
      pathType === "vertical" 
      &&(startY < (this.y + 0.5 * RECT_HEIGHT + this.yMargin) && endY > (this.y - 0.5 * RECT_HEIGHT - this.yMargin))
      && (Math.abs(startX - this.x) <= 0.5 * (RECT_WIDTH + this.xMargin)) //for horizontal paths startY = endY. 
    ){
      return this;
    }
    return null;
	}
  linksClear() {
    this.linksOut = [];
    this.linksIn = [];
    this.linksInI = [];
    this.linksInC = [];
    this.linksInM = [];
    this.linksInYUp = []; 
    this.linksInYDown = [];
  }
  linkSorter() {
  this.linksOut.sort(function(a, b) {
      return parseInt(a.yEnd) - parseInt(b.yEnd);
  });
  this.linksInI.sort(function(a, b) {
    return parseInt(a.yEnd) - parseInt(b.yEnd);
});
  this.linksInC.sort(function(a, b) {
    return parseInt(a.y) + parseInt(b.y);
  });    
  this.linksInM.sort(function(a, b) {
    return parseInt(a.y) - parseInt(b.y);
  });

  this.linksInYUp = [];
  this.linksInYDown = [];

  // for (var links of this.linksIn) {
  //   if (links.yEnd > links.P1.y) {
  //     this.linksInYUp.push(links);
  //   } else {
  //     this.linksInYDown.push(links);
  //   }
  // }
  // this.linksInYUp.sort(function(a, b) {
  //   return parseInt(a.x) - parseFloat(b.x);
  // });
  // this.linksInYDown.sort(function(a, b) {
  //   return parseInt(a.x) - parseFloat(b.x);
  // });

 }
}
//END CLASS Process

//CLASS Link
class Link {
  constructor() {
    this.shape = null;
    this.pathAttr = {
      'opacity' : 1,
      'arrow-end':   'classic-wide-long'
    }
    this.type = ""; //type is either "I" for input, "C" for control, "M" for 
    this.path = [];
    this.on_process = null;

  }
  doDraw() {
    this.checkValidity(); //check if the link is valid or should be removed
    this.createPath();
    
    if (this.shape) this.shape.remove();
    this.shape = paper.set();
    this.shape.push(paper.path(this.path).attr(this.pathAttr));
    
  }
  removeSelf() { //removes itself from different arrays then finally popping of the MODEL stack.
    if (this.P1) {
      this.P1.linksOut.splice(this.P1.linksOut.indexOf(this));
    }
    if (this.P2) { 
      this.P2.linksIn.splice(this.P2.linksIn.indexOf(this));
      switch (this.type) {
        case "I":
        this.P2.linksInI.splice(this.P2.linksInI.indexOf(this));
          break;
        case "C":
        this.P2.linksInC.splice(this.P2.linksInC.indexOf(this));
          break;
          case "M":
          this.P2.linksInM.splice(this.P2.linksInM.indexOf(this));
          break;
      
        default:
          break;
      }
    }
    MODEL.pLinks.splice(MODEL.pLinks.indexOf(this));
  }
  checkValidity() { 
    if((!this.P1 || !this.P2) && this !== MODEL.activeLink) {
      this.removeSelf();
    }
  }
  createPath () {

    if (this.P1 && this.P2) {
      this.x = this.P1.x;
      this.y = this.P1.y;
      this.xEnd = this.P2.x;
      this.yEnd = this.P2.y;
    }

    //path attributes
    if (MODEL.activeLink === this) {
      this.pathAttr['opacity'] = 0.5;	
      this.pathAttr['stroke-dasharray'] = "--"
      this.path = [ //path is simple if the line is still being drawn
        "M", this.x, this.y, 
        "L", this.xEnd, this.yEnd
      ];
    } else {
      this.pathAttr['opacity'] = 1;	
      this.pathAttr['stroke-dasharray'] = undefined;  
    }
    //initialising x/y start and end value variables, and helper variables. 
    var xStart = this.x;
    var yStart = this.y;
    var xEnd = this.xEnd;
    var yEnd = this.yEnd;
    var xProcessMargin = 1/4 * RECT_WIDTH;
    var yProcessMargin = 1/3 * RECT_HEIGHT;

    xStart += 1/2 * RECT_WIDTH + xProcessMargin; //xStart is outside of the process + margin


    switch (this.type) { //determine the proper end values of the path
      case "M":
        yEnd += 1/2 * RECT_HEIGHT + yProcessMargin;
        break;
      case "C":
        yEnd += -(1/2 * RECT_HEIGHT + yProcessMargin);
        break;
      case "I":
        xEnd += -(1/2 * RECT_WIDTH + xProcessMargin);
        break;
      default:
        break;
    }
    if (this !== MODEL.activeLink){
      this.detPaths(xStart, yStart, xEnd, yEnd);
    }
  }

  detPaths(xStart, yStart, xEnd, yEnd) {
    var blindPath = []; //create a 'blind' optimal path - no checks for collision yet. 
    var pathArray = [];
    var optimalPath = [];
    var middlePoint1 = [];
    var middlePoint2 = [];

    if (this.P1 && this.P2) {
    middlePoint1 = [0.5 * (this.P1.x + this.P2.x), yStart]
    middlePoint2 = [0.5 * (this.P1.x + this.P2.x), yEnd]
    }

//DETERMINE THE BLINDPATH
    blindPath.push([xStart, yStart]);
    switch (this.type) {
      case "M":
      if (xStart < xEnd - 1/2 * RECT_WIDTH) {
        if (yStart > yEnd) { 
          blindPath.push([xEnd,yStart]);
          blindPath.push([xEnd,yStart]);
        } else {
          blindPath.push([middlePoint1[0],middlePoint1[1]]);
          blindPath.push(middlePoint2);
        }
      } else {
        if (yStart > yEnd) {
          blindPath.push([xStart, Math.min(yEnd, yStart - RECT_HEIGHT)]);
          blindPath.push([middlePoint1[0],Math.min(yEnd, yStart - RECT_HEIGHT)]);
          blindPath.push([middlePoint1[0],yEnd]);
        } else {
          blindPath.push([xStart, Math.max(yEnd, yStart + RECT_HEIGHT)]);
          blindPath.push([middlePoint1[0],Math.max(yEnd, yStart + RECT_HEIGHT)]);
          blindPath.push([middlePoint1[0],yEnd]);
        }
      } 
        break;
      case "C":
      if (xStart < xEnd - 1/2 * RECT_WIDTH) {
        if (yStart < yEnd) { 
          blindPath.push([xEnd,yStart]);
          blindPath.push([xEnd,yStart]);
        } else {
          blindPath.push([middlePoint1[0],middlePoint1[1]]);
          blindPath.push(middlePoint2);
        }
      } else {
        if (yStart > yEnd) {
          blindPath.push([xStart, Math.min(yEnd, yStart - RECT_HEIGHT)]);
          blindPath.push([middlePoint1[0],Math.min(yEnd, yStart - RECT_HEIGHT)]);
          blindPath.push([middlePoint1[0],yEnd]);
        } else {
          blindPath.push([xStart, Math.max(yEnd, yStart + RECT_HEIGHT)]);
          blindPath.push([middlePoint1[0],Math.max(yEnd, yStart + RECT_HEIGHT)]);
          blindPath.push([middlePoint1[0],yEnd]);
        }
      } 
        break;
      case "I":
      if (xStart < xEnd - 1/2 * RECT_WIDTH) {
        blindPath.push(middlePoint1);
        blindPath.push(middlePoint2);
      } else {
        blindPath.push([xStart, yEnd + RECT_HEIGHT]);
        blindPath.push([xEnd,yEnd + RECT_HEIGHT]);
        blindPath.push([xEnd,yEnd]);
      }
        break;
      default:
        break;
    }
    blindPath.push([xEnd,yEnd]);
//END DETERMINING BLINDPATH
    
  for (var i = 0; i < blindPath.length - 1; i++) {
    // if (!(blindPath[i][0] == blindPath[i+1][0] && [blindPath[i][1] == blindPath[i + 1][1]])) {
    //   pathArray.push([[blindPath[i][0],blindPath[i][1]],[blindPath[i + 1][0],blindPath[i + 1][1]]]);
    // } 
    pathArray.push([[blindPath[i][0],blindPath[i][1]],[blindPath[i + 1][0],blindPath[i + 1][1]]]);
  }
  for (var i = 0; i < pathArray.length; i++) {
    const direction = this.checkDirection(pathArray[i][0][0],pathArray[i][1][0]);
    var intersectingProcess = null;
    var pointsInProcess = 0;
    for (var process of MODEL.processes) {
      if (process.pathOnSelf(pathArray[i][0][0], pathArray[i][0][1], pathArray[i][1][0], pathArray[i][1][1], direction) !== undefined) {
        console.log('test');
        intersectingProcess = process.pathOnSelf(pathArray[i][0][0], pathArray[i][0][1], pathArray[i][1][0], pathArray[i][1][1], direction);
      }
      if (process.pointInProcess(pathArray[i][0][0],pathArray[i][0][1])) { pointsInProcess += 1; }
      if (process.pointInProcess(pathArray[i][1][0],pathArray[i][1][1])) { pointsInProcess += 1; }
    }
      if(intersectingProcess) {
        if (direction === "horizontal") {
          if (pointsInProcess == 0) {
            optimalPath.push([pathArray[i][0][0],pathArray[i][0][1]])
            optimalPath.push([intersectingProcess.x - 1/2 * RECT_WIDTH - intersectingProcess.xMargin , pathArray[i][0][1]])
            optimalPath.push([intersectingProcess.x - 1/2 * RECT_WIDTH - intersectingProcess.xMargin , intersectingProcess.y - 1/2 * RECT_HEIGHT - intersectingProcess.yMargin])
            optimalPath.push([intersectingProcess.x + 1/2 * RECT_WIDTH + intersectingProcess.xMargin , intersectingProcess.y - 1/2 * RECT_HEIGHT - intersectingProcess.yMargin])
            optimalPath.push([intersectingProcess.x + 1/2 * RECT_WIDTH + intersectingProcess.xMargin , pathArray[i][0][1]])
          }
          if (pointsInProcess == 1) {

          }
        }
        if (direction === "vertical") {
          if (pointsInProcess == 0) {
            optimalPath.push([pathArray[i][0][0], pathArray[i][0][1]])
            optimalPath.push([pathArray[i][0][0], intersectingProcess.y - 1/2 * RECT_HEIGHT - intersectingProcess.yMargin])
            optimalPath.push([intersectingProcess.x + 1/2 * RECT_WIDTH + intersectingProcess.xMargin , intersectingProcess.y - 1/2 * RECT_HEIGHT - intersectingProcess.yMargin])
            optimalPath.push([intersectingProcess.x + 1/2 * RECT_WIDTH + intersectingProcess.xMargin , intersectingProcess.y + 1/2 * RECT_HEIGHT + intersectingProcess.yMargin])
            optimalPath.push([pathArray[i][0][0] ,intersectingProcess.y + 1/2 * RECT_HEIGHT + intersectingProcess.yMargin])
          }
        }
      } else {
        optimalPath.push(pathArray[i][0],pathArray[i][1])
      }
    }
    optimalPath.unshift([xStart, yStart])
    optimalPath.push([xEnd, yEnd])

      this.path = [
        "M",optimalPath[0][0],optimalPath[0][1],"L",optimalPath[1][0],optimalPath[1][1]
      ]
      for (var i = 1; i < optimalPath.length; i++) {
        this.path.push("L",optimalPath[i][0],optimalPath[i][1]);
      }
    }

  checkDirection(x1, x2) {
    if(x1 === x2){
     return 'vertical';
    } else {
      return 'horizontal';
    }

  }
}
//END CLASS Link



// CLASS MouseManager
class MouseManager {
  constructor(name) {
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.pageXDown = 0;
    this.pageYDown = 0;
    this.pageXUp = 0;
    this.pageYUp = 0;
    this.ON_EL = null;
  } 
  
  mouseMove(e) { 
    this.x = e.pageX - PAPER_OFFSET.left;
    this.y = e.pageY - PAPER_OFFSET.top;
    this.ON_EL = null;

    for (var process of MODEL.processes) {
      if (process.onElement(e)) {  //is there an object under the cursor?
        this.ON_EL = process;
        if (LINK_ELEM) {
        this.ON_EL.detDragArea();
        }
        break; 
      }
    }

    if (LINK_ELEM && MODEL.activeLink) {
      MODEL.activeLink.xEnd = e.pageX - PAPER_OFFSET.left; //when the link is being dragged (active) the end is just the values of your mouse pointer
      MODEL.activeLink.yEnd = e.pageY - PAPER_OFFSET.top;
    }
    if (!LINK_ELEM){
      for (var selected of MODEL.selection) {
        selected.x = this.x + selected.relativePos.x; //enables dragging of multiple objects at the same time
        selected.y = this.y + selected.relativePos.y;
      }
    }
    MODEL.reDraw();
  }


  mouseDown(e) {
    this.pageXDown = e.pageX - PAPER_OFFSET.left;
    this.pageYDown = e.pageY - PAPER_OFFSET.top;

    if(this.ON_EL) { //if there is an object under the cursor, it gets added to the model selection. 
      MODEL.selection.push(this.ON_EL);
    }
    

    for (var selected of MODEL.selection) {
      selected.relativePos.x = selected.x - this.pageXDown; //determine the relative position to the clicked object to allow dragging of multiple objects. 
      selected.relativePos.y = selected.y - this.pageYDown;
    }
  
    if (LINK_ELEM) { 
      MODEL.addLink();
      if (this.ON_EL) {
        MODEL.activeLink.P1 = this.ON_EL;		
      }
    }
  }


  mouseUp(e) {
    this.pageXUp = e.pageX - PAPER_OFFSET.left;
    this.pageYUp = e.pageY - PAPER_OFFSET.top;

      if (!this.ON_EL){
        if (DRAW_RECT) {
          MODEL.addProcess(A0);
        }
      }

      if (LINK_ELEM) {

        if (this.ON_EL) {
          MODEL.activeLink.P2 = this.ON_EL;
          MODEL.activeLink.type = this.ON_EL.selectDragArea;
          // if (MODEL.activeLink.P1.linksOut.length > 5) {
          //   MODEL.activeLink.removeSelf();
          //   console.log("too many links out")
          // } 
        }
        resetStateAll(); //I currently don't want users to create multiple links after eachother just by spam clicking before I fix some issues with the links, so I disable the link button after use
      }

      MODEL.activeLink = null;
      if (!SELECT_ELEM) {
        MODEL.clearSelection();
      } 
      MODEL.reDraw();
    }
  }
//END CLASS MouseManager