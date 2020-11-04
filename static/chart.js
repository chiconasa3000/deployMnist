

//Creando un chart

var arrayLabel = ['Red', 'Blue', 'Yellow', 'Green','Purple','Orange'];
var dataProb = [12,19,4,5,2,3];

//construyendo mapa de etiqueta con valor
arrayOfObj = arrayLabel.map(function(d,i){
	return{
		label: d,
		data: dataProb[i] || 0
	};
});


//Ordenando valores
sortedArrayOfObj = arrayOfObj.sort(function(a,b){
	return a == b ? 0 : b > a ? -1 : 1;
});

newLabels = [];
newDatas = [];

sortedArrayOfObj.forEach(function(d){
	newLabels.push(d.label);
	newDatas.push(d.data);
});

var ctx = 'myChart';

var myChart = new Chart(ctx, {
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


