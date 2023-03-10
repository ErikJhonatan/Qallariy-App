const listColours = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',]

function showChartJs(){
    window.addEventListener('resize', () => {
        myChart.resize();
    });
    
    const ctx = document.getElementById('myChart').getContext('2d');
    
    const data = {
        labels: [
        'Red',
        'Blue',
        'Yellow'
        ],
        datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: listColours,
        hoverOffset: 4,
        }]
    };
    
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribución de la utilidad',
                    font: {
                        size: 20,
                    }
                },
            }
        }
        ,
    });
}

export {showChartJs}