
const Chart = toastui.Chart;
const el = document.getElementById('chart');
const data = {
  categories: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ],
  series: [
    {
      name: 'TASK',
      data: [0, 10, 30, 40, 50, 55, 58, 60, 63, 70, 80, 100],
    }
  ],
}
const options = {
  chart: { width: 700, height: 400 },
};

const chart = Chart.areaChart({el, data, options});