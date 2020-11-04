

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
			label: '# de votos',
			data: [12,19,3,5,2,3],
			//activado con scriptable o funciones
			backgroundColor: function(context){
				var index = context.dataIndex;
				var value = context.dataset.data[index];
				return value < 5 ? 'red':
					index % 2 ? 'blue' :
					'green';
			},
			borderColor: [
				//dado como indexable
				'rgba(0,0,0,0.5)',
				'rgba(54,162,235,0.2)',
				'rgba(255,206,86,0.2)',
				'rgba(75,192,192,0.2)',
				'rgba(153,102,255,0.2)',
				'rgba(255,159,64,0.2)'
			],
			borderWidth: [9,9,9,9,9,9],
			hoverBackgroundColor:['yellow'],
			hoverBorderColor:['red'],
			hoverBorderWidth:[10]

		}]
	},
	// definiendo opciones
	options: {
		scales:{
			yAxes:[{
				gridLines:{
					offsetGridLines: true
				}
			}],
			xAxes:[{
				ticks:{
					beginAtZero: true
				}
			}]
		}
	}
});


