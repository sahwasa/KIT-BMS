var vars_chart={}
vars_chart.categories = []
vars_chart.series = []
function drawChart(){
  const Chart = toastui.Chart;
  const el = document.getElementById('chart');
  const data = {
    categories: vars_chart.categories,
    series: vars_chart.series,
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
}