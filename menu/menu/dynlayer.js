// Dynamic Layer Object
// sophisticated layer/element targeting and animation object which provides the core 
// functionality needed in most DHTML applications
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynduo/

// BrowserCheck Object
// provides browser checking variables
function BrowserCheck() {
	var b = navigator.appName
	if (b=="Netscape") this.b = "ns"
	else if (b=="Microsoft Internet Explorer") this.b = "ie"
	else this.b = b
	this.version = navigator.appVersion
	this.v = parseInt(this.version)
	this.ns = (this.b=="ns" && this.v>=4)
	this.ns4 = (this.b=="ns" && this.v==4)
	this.ns5 = (this.b=="ns" && this.v==5)
	this.ie = (this.b=="ie" && this.v>=4)
	this.ie4 = (this.version.indexOf('MSIE 4')>0)
	this.ie5 = (this.version.indexOf('MSIE 5')>0)
	this.min = (this.ns||this.ie)
}
is = new BrowserCheck()

// DynLayer Constructor
function DynLayer(id,nestref,frame) {
	if (!DynLayer.set && !frame) DynLayerInit()
	if (is.ns) {
		if (is.ns) {
			if (!frame) {
				if (!nestref) var nestref = DynLayer.nestRefArray[id]
				if (DynLayer.useTest && !DynLayerTest(id,nestref)) return
				this.css = (nestref)? eval("document."+nestref+".document."+id) : document.layers[id]
			}
			else this.css = (nestref)? eval("parent."+frame+".document."+nestref+".document."+id) : parent.frames[frame].document.layers[id]
			this.elm = this.event = this.css
			this.doc = this.css.document
		}
		if (is.ns5) {
			this.elm = document.getElementById(id)
			this.css = this.elm.style
			this.doc = document
		}
		this.x = this.css.left
		this.y = this.css.top
		this.w = this.css.clip.width
		this.h = this.css.clip.height
	}
	else if (is.ie) {
		this.elm = this.event = (frame)? parent.frames[frame].document.all[id] : document.all[id]
		this.css = (frame)? parent.frames[frame].document.all[id].style : document.all[id].style
		this.doc = document
		this.x = this.elm.offsetLeft
		this.y = this.elm.offsetTop
		this.w = (is.ie4)? this.css.pixelWidth : this.elm.offsetWidth
		this.h = (is.ie4)? this.css.pixelHeight : this.elm.offsetHeight
	}
	this.id = id

	this.obj = id + "DynLayer"
	eval(this.obj + "=this")
	this.moveTo = DynLayerMoveTo
	this.moveBy = DynLayerMoveBy
	this.show = DynLayerShow
	this.hide = DynLayerHide
	this.slideInit = DynLayerSlideInit
	this.clipInit = DynLayerClipInit
	this.write = DynLayerWrite
}

// DynLayer Core Methods (moveTo, moveBy, hide, show)
function DynLayerMoveTo(x,y) {
	if (x!=null) {
		this.x = x
		if (is.ns) this.css.left = this.x
		else this.css.pixelLeft = this.x
	}
	if (y!=null) {
		this.y = y
		if (is.ns) this.css.top = this.y
		else this.css.pixelTop = this.y
	}
}
function DynLayerMoveBy(x,y) {
	this.moveTo(this.x+x,this.y+y)
}
function DynLayerShow() {
	this.css.visibility = (is.ns)? "show" : "visible"
}
function DynLayerHide() {
	this.css.visibility = (is.ns)? "hide" : "hidden"
}

// DynLayer Slide Methods (optional)
// straight line animation methods
function DynLayerSlideInit() {
	this.slideTo = DynLayerSlideTo
	this.slideBy = DynLayerSlideBy
	this.slideStart = DynLayerSlideStart
	this.slide = DynLayerSlide
	this.onSlide = new Function("")
	this.onSlideEnd = new Function("")
}
function DynLayerSlideTo(endx,endy,inc,speed,fn) {
	if (endx==null) endx = this.x
	if (endy==null) endy = this.y
	var distx = endx-this.x
	var disty = endy-this.y
	this.slideStart(endx,endy,distx,disty,inc,speed,fn)
}
function DynLayerSlideBy(distx,disty,inc,speed,fn) {
	var endx = this.x + distx
	var endy = this.y + disty
	this.slideStart(endx,endy,distx,disty,inc,speed,fn)
}
function DynLayerSlideStart(endx,endy,distx,disty,inc,speed,fn) {
	if (this.slideActive) return
	if (!inc) inc = 10
	if (!speed) speed = 20
	var num = Math.sqrt(Math.pow(distx,2) + Math.pow(disty,2))/inc
	if (num==0) return
	var dx = distx/num
	var dy = disty/num
	if (!fn) fn = null
	this.slideActive = true
	this.slide(dx,dy,endx,endy,num,1,speed,fn)
}
function DynLayerSlide(dx,dy,endx,endy,num,i,speed,fn) {
	if (!this.slideActive) return
	if (i++ < num) {
		this.moveBy(dx,dy)
		this.onSlide()
		if (this.slideActive) setTimeout(this.obj+".slide("+dx+","+dy+","+endx+","+endy+","+num+","+i+","+speed+",\""+fn+"\")",speed)
		else this.onSlideEnd()
	}
	else {
		this.slideActive = false
		this.moveTo(endx,endy)
		this.onSlide()
		this.onSlideEnd()
		eval(fn)
	}
}

// DynLayer Clip Methods (optional)
// provides layer clipping functionality
function DynLayerClipInit(clipTop,clipRight,clipBottom,clipLeft) {
	this.clipTo = DynLayerClipTo
	this.clipBy = DynLayerClipBy
	this.clipValues = DynLayerClipValues
	if (is.ie) {
		if (arguments.length==4) this.clipTo(clipTop,clipRight,clipBottom,clipLeft)
		else if (is.ie4) this.clipTo(0,this.css.pixelWidth,this.css.pixelHeight,0)
	}
}
function DynLayerClipTo(t,r,b,l) {
	if (t==null) t = this.clipValues('t')
	if (r==null) r = this.clipValues('r')
	if (b==null) b = this.clipValues('b')
	if (l==null) l = this.clipValues('l')
	if (is.ns) {
		this.css.clip.top = t
		this.css.clip.right = r
		this.css.clip.bottom = b
		this.css.clip.left = l
	}
	else if (is.ie) this.css.clip = "rect("+t+"px "+r+"px "+b+"px "+l+"px)"
}
function DynLayerClipBy(t,r,b,l) {
	this.clipTo(this.clipValues('t')+t,this.clipValues('r')+r,this.clipValues('b')+b,this.clipValues('l')+l)
}
function DynLayerClipValues(which) {
	if (is.ie) var clipv = this.css.clip.split("rect(")[1].split(")")[0].split("px")
	if (which=="t") return (is.ns)? this.css.clip.top : Number(clipv[0])
	if (which=="r") return (is.ns)? this.css.clip.right : Number(clipv[1])
	if (which=="b") return (is.ns)? this.css.clip.bottom : Number(clipv[2])
	if (which=="l") return (is.ns)? this.css.clip.left : Number(clipv[3])
}

// DynLayer Write Method (optional)
// rewrites the contents of the layer
function DynLayerWrite(html) {
	if (is.ns) {
		this.doc.open()
		this.doc.write(html)
		this.doc.close()
	}
	else if (is.ie) {
		this.event.innerHTML = html
	}
}

// DynLayerTest Function (optional - disable with DynLayer.useTest=false)
// makes sure the layer target is correct before assigning the DynLayer, outputs useful info if incorrect
function DynLayerTest(id,nestref) {
	var ref = new Array()
	if (nestref) ref = nestref.split('.document.')
	ref[ref.length] = id
	var refstr = (is.ns)? 'document.'+ref[0] : 'document.all.'+ref[0]
	for (var i=1; i<=ref.length; i++) {
		if (eval(refstr)) {
			if (ref.length==i) return true
			else refstr += (is.ns)? '.document.'+ref[i] : '.all.'+ref[i]
		}
		else {
			var str ='DynLayer Error:'
			for (j in ref) {
				str += '\n'+ref[j]
				if (j==i-1) str += '  <-- this layer cannot be found'
			}
			if (DynLayerTest.count++<5) alert(str)
			else alert("Too many DynLayer errors, quitting.")
			return false
		}
	}
	return false
}
DynLayerTest.count = 0

// DynLayerInit
// automatically retrieves nested heirarchy of the layer and defines DynLayers named with "Div"
function DynLayerInit(nestref) {
	if (!DynLayer.set) DynLayer.set = true
	if (is.ns) {
		if (nestref) ref = eval('document.'+nestref+'.document')
		else {nestref = ''; ref = document;}
		for (var i=0; i<ref.layers.length; i++) {
			var divname = ref.layers[i].name
			DynLayer.nestRefArray[divname] = nestref
			var index = divname.indexOf("Div")
			if (index > 0) {
				eval(divname.substr(0,index)+' = new DynLayer("'+divname+'","'+nestref+'")')
			}
			if (ref.layers[i].document.layers.length > 0) {
				DynLayer.refArray[DynLayer.refArray.length] = (nestref=='')? ref.layers[i].name : nestref+'.document.'+ref.layers[i].name
			}
		}
		if (DynLayer.refArray.i < DynLayer.refArray.length) {
			DynLayerInit(DynLayer.refArray[DynLayer.refArray.i++])
		}
	}
	else if (is.ie) {
		for (var i=0; i<document.all.tags("DIV").length; i++) {
			var divname = document.all.tags("DIV")[i].id
			var index = divname.indexOf("Div")
			if (index > 0) {
				eval(divname.substr(0,index)+' = new DynLayer("'+divname+'")')
			}
		}
	}
	return true
}
DynLayer.nestRefArray = new Array()
DynLayer.refArray = new Array()
DynLayer.refArray.i = 0
DynLayer.set = false
DynLayer.useTest = true

// CSS function (optional)
// returns CSS syntax for generated layers
function css(id,left,top,width,height,color,vis,z,other) {
	if (id=="START") return '<STYLE TYPE="text/css">\n'
	else if (id=="END") return '</STYLE>'
	var str = (left!=null && top!=null)? '#'+id+' {position:absolute; left:'+left+'px; top:'+top+'px;' : '#'+id+' {position:relative;'
	if (arguments.length>=4 && width!=null) str += ' width:'+width+'px;'
	if (arguments.length>=5 && height!=null) {
		str += ' height:'+height+'px;'
		if (arguments.length<9 || other.indexOf('clip')==-1) str += ' clip:rect(0px '+width+'px '+height+'px 0px);'
	}
	if (arguments.length>=6 && color!=null) str += (is.ns)? ' layer-background-color:'+color+';' : ' background-color:'+color+';'
	if (arguments.length>=7 && vis!=null) str += ' visibility:'+vis+';'
	if (arguments.length>=8 && z!=null) str += ' z-index:'+z+';'
	if (arguments.length==9 && other!=null) str += ' '+other
	str += '}\n'
	return str
}
function writeCSS(str,showAlert) {
	str = css('START')+str+css('END')
	document.write(str)
	if (showAlert) alert(str)
}
