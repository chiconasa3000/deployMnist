

//Creando un chart
//
//


var ctx = 'myChart';

var myChart = new Chart(ctx, {
	//definiendo datos
	type: 'horizontalBar',
	data: {
		labels: ['Red', 'Blue', 'Yellow', 'Green','Purple','Orange'],
		datasets: [{
			label: 'clases de los digitos',
			data: [12,19,3,5,2,3],
			//activado con scriptable o funciones
			backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
			borderColor:  ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
			borderWidth: [9,9,9,9,9,9],
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
					beginAtZero: true
				},
				scaleLabel:{
					display: true,
					labelString: 'Percentage'
				}
			}]
		}
	}
});


