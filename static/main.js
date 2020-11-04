var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')
ctx.lineWidth = 10
var button = document.querySelector('button')
var mouse = {x: 0, y: 0}

canvas.addEventListener('mousemove', function(e) {
	mouse.x = e.pageX - this.offsetLeft
	mouse.y = e.pageY - this.offsetTop
})

canvas.onmousedown = ()=>{
	ctx.beginPath()
	ctx.moveTo(mouse.x, mouse.y)
	canvas.addEventListener('mousemove', onPaint)
}

canvas.onmouseup = ()=>{
	canvas.removeEventListener('mousemove', onPaint)
}

var onPaint = ()=>{
	ctx.lineTo(mouse.x, mouse.y)
	ctx.stroke()
}

var data = new Promise(resolve=>{
	button.onclick = ()=>{
		resolve(canvas.toDataURL('image/png'))
		document.getElementById('canvasimg').value = canvas.toDataURL();
	}
})


