

//Creando un chart
//
//


var ctx = 'myChart';

var myChart = new Chart(ctx, {
	//definiendo datos
	type: 'bar',
	data: {
		labels: ['Red', 'Blue', 'Yellow', 'Green','Purple','Orange'],
		datasets: [{
			label: '# de votos',
			data: [12,19,3,5,2,3],
			backgroundColor: [
				'rgba(255,99,132,0.2)',
				'rgba(54,162,235,0.2)',
				'rgba(255,206,86,0.2)',
				'rgba(75,192,192,0.2)',
				'rgba(153,102,255,0.2)',
				'rgba(255,159,64,0.2)'
			],
			borderColor: [
				'rgba(0,0,0,0.5)',
				'rgba(54,162,235,0.2)',
				'rgba(255,206,86,0.2)',
				'rgba(75,192,192,0.2)',
				'rgba(153,102,255,0.2)',
				'rgba(255,159,64,0.2)'
			],
			borderWidth: 1
		}]
	},
	// definiendo opciones
	options: {
		scales:{
			yAxes:[{
				ticks:{
					beginAtZero: true
				}
			}]
		}
	}
});


