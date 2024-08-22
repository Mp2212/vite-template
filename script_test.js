<script>
import { onMounted, onBeforeUnmount } from 'vue';
import { Chart } from 'chart.js';

export default {
  setup() {
    let myChart = null;

   onMounted(() => {
  var ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Last 6 months',
          data: [35, 27, 40, 15, 30, 25, 45, 65, 72, 75, 88, 97],
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
          backgroundColor: 'rgba(95, 46, 234, 0.2)', // Add transparency for a softer background
          borderColor: 'rgba(95, 46, 234, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(95, 46, 234, 1)', // Point color matches line color
          pointBorderColor: '#fff', // White border for contrast
          pointBorderWidth: 0.5,
        },
        {
          label: 'Previous',
          data: [20, 36, 16, 45, 29, 32, 10, 34, 44, 48, 57, 79],
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
          backgroundColor: 'rgba(75, 222, 151, 0.2)',
          borderColor: 'rgba(75, 222, 151, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(75, 222, 151, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 0.5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            font: {
              size: 14, // Increase the font size for better readability
              family: 'Inter',
              weight: '500',
            },
            color: '#444', // Darker color for better contrast
          },
          grid: {
            display: true,
            color: '#f0f0f0',
          },
        },
        x: {
          ticks: {
            font: {
              size: 14, // Increase the font size for better readability
              family: 'Inter',
              weight: '500',
            },
            color: '#444',
          },
          grid: {
            color: '#f0f0f0',
          },
        },
      },
      elements: {
        point: {
          radius: 4, // Slightly larger points for better visibility
        },
      },
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            boxWidth: 12, // Increase box size for better visibility
            boxHeight: 12,
            usePointStyle: true,
            font: {
              size: 14, // Larger font for the legend labels
              weight: '600',
            },
          },
        },
        title: {
          display: true,
          text: ['Deployment by Months', 'Jan - Dec'],
          align: 'start',
          color: '#171717',
          font: {
            size: 14, // Slightly larger title font
            family: 'Inter',
            weight: '700',
            lineHeight: 1.4,
          },
          padding: {
            top: 10, // Add padding to separate title from chart
            bottom: 20,
          },
        },
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker tooltip background for better contrast
        titleFont: {
          size: 14,
          family: 'Inter',
          weight: '600',
        },
        bodyFont: {
          size: 12,
          family: 'Inter',
        },
        borderColor: '#ccc', // Add border to tooltip for definition
        borderWidth: 1,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
    },
  });
});

onBeforeUnmount(() => {
  if (myChart) {
    myChart.destroy();
  }
});
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>