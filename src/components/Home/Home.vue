<template>
  <div class="bg">
    <div class="content">
      <h1>Home</h1>
      <canvas id="victim-by-gender" height=80% width=70%></canvas>
      <canvas id="victim-by-age" height=80% width=70%></canvas>
      <canvas id="victim-by-condition" height=80% width=70%></canvas>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: blue
}
.bg {
  background-color: #d9d9d9;
}
.content {
  max-width: 960px;
  margin: auto;
  background-color: white;
}
</style>

<script>
  var victimTemplateChart = {
    type: 'horizontalBar',
    data: {
      labels: [],
      datasets: [
        { 
          label: '',
          data: [],
          backgroundColor: [],
          borderWidth: 3
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "",
        fontSize: 16
      },
      responsive: true,
      lineTension: 1,
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            padding: 25,
          }
        }]
      }
    }
  }

  const victimData = {
    Gender: {
      title: "Gender",
      label: ["Laki-laki", "Perempuan"],
      count: [20, 40]
    },
    Age: {
      title: "Age",
      label: ["<10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", ">70"],
      count: [10, 20, 40, 15, 20, 30, 10, 5]
    },
    Condition: {
      title: "Condition",
      label: ["Hidup", "Meninggal"],
      count: [55, 30]
    }
  }

export default {
  data () {
    return {
      victimTemplateChart,
      victimData
    }
  },

  methods: {
    createChart(chartId) {
      const ctx = document.getElementById(chartId);
      
      if (chartId == 'victim-by-gender') { 
        var chartData = this.fillData("Gender")
      }
      else if (chartId == 'victim-by-age') {
        var chartData = this.fillData("Age")
      }
      else if (chartId == 'victim-by-condition') {
        var chartData = this.fillData("Condition")
      }

      console.log(chartId, chartData)

      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },

    fillData(idx){
      let label = this.victimData[idx].label
      let count = this.victimData[idx].count
      let title = this.victimData[idx].title
      console.log(label, count, title)
      var result = this.victimTemplateChart
      result.data.labels = label
      result.data.datasets[0].data = count
      result.data.datasets[0].label = title
      result.options.title.text = `Victim by ${title}`
      var dataColor = 'rgba(54,73,93,.5)'
      // for(let i = 0; i < label.length; i++) { 
      //   dataColor.push('#8b0000') 
      //   }
      result.data.datasets.backgroundColor = dataColor
      console.log(result)
      return result
    }
  },

  mounted () {
    this.createChart('victim-by-gender');
    this.createChart('victim-by-age');
    this.createChart('victim-by-condition');
  }
}

</script>