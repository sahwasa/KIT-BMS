
const Chart = toastui.Chart;
const el = document.getElementById('chart');
const data = {
  categories: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ],
  series: [
    {
      name: '완료',
      data: [0, 10, 30, 40, 50, 55, 58, 60, 63, 70, 80, 100],
    },
    {
      name: '계획',//전체 - 미정
      data: [100, 100, 100, 100,100, 100, 100, 100, 120, 121, 122, 122],
    }
  ],
}
const options = {
  chart: { width:'auto', height: 'auto' },
  responsive: {
    animation: { duration: 300 },
    rules: [
      {
        condition: ({ width: w }) => {
          return w <= 800;
        },
        options: {
          xAxis: {
            tick: { interval: 2 },
            label: { interval: 2 }
          },
          legend: {
            align: 'bottom'
          }
        }
      },
      {
        condition: ({ width: w }) => {
          return w <= 600;
        },
        options: {
          xAxis: {
            tick: { interval: 6 },
            label: { interval: 6 }
          }
        }
      }
    ]
  }
};

const chart = Chart.areaChart({el, data, options});
var delay = 300;
var timer = null;
window.addEventListener('resize', function(){
  clearTimeout(timer);
	timer = setTimeout(function(){
		chart.resize({});
	}, delay);
});