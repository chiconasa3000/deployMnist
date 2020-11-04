var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')
ctx.lineWidth = 15
var button = document.querySelector('button')
var mouse = {x: 0, y: 0}

canvas.addEventListener('mousemove', function(e) {
	let rect = canvas.getBoundingClientRect();
	mouse.x = e.clientX - rect.left;
	mouse.y = e.clientY - rect.top;
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


var textPred = document.getElementById('prediccion').value;
var res = textPred.replace(/\r/g, "").split("\n"); res.pop();

//construyendo mapa de etiqueta con valor
newLabels = []
newDatas = []
res.map(function(d,i){
	
	labelProb = d.split("    ");
	newLabels.push(labelProb[0]);
	newDatas.push(labelProb[1]*100);
});

console.log(newLabels)
console.log(newDatas)


//Dibujando Probabilidad maxima
document.getElementById('resPred').innerText = 'Digito: ' + newLabels[0] + ' con Probabilidad ' + newDatas[0] + ' \%' ;


//Dibujando Plot

var ctxx = 'myChart';

var myChart = new Chart(ctxx, {
	//definiendo datos
	type: 'horizontalBar',
	data: {
		labels: newLabels,
		datasets: [{
			label: 'clases de los digitos',
			data: newDatas,
			//activado con scriptable o funciones
			backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
			borderColor:  ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
			hoverBackgroundColor:['yellow'],
			hoverBorderColor:['red'],
			hoverBorderWidth:[10]

		}]
	},
	// definiendo opciones
	options: {
		legend: {display: true},
		title:{
			display: true,
			text: 'Probabilidades de clase para el Digito'
		},
		scales:{
			yAxes:[{
				gridLines:{
					offsetGridLines: true
				}
			}],
			xAxes:[{
				ticks:{
					beginAtZero: true,
					callback: function(value){
						return value.toFixed(0)+'%';
					},
				},
				scaleLabel:{
					display: true,
					labelString: 'Percentage'
				}
			}]
		}
	}
});


