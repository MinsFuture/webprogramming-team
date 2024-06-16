<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <button @click="selectStatistics(1)">지역별 카테고리 참여율</button>
          </li>
          <li>
            <button @click="selectStatistics(2)">지역별 연령 참여율</button>
          </li>
          <li>
            <button @click="selectStatistics(3)">카테고리별 연령 참여율</button>
          </li>
          <li>
            <button @click="selectStatistics(4)">연령별 카테고리 참여율</button>
          </li>
        </ul>
      </nav>
    </header>

    <div class="statistics-selector">
      <h1 v-if="selectedStatistics === 3">카테고리별 연령 참여율</h1>
      <div v-if="selectedStatistics === 3">
        <div v-for="(categoryData, index) in statisticsData" :key="index">
          <canvas :id="'myPieChart' + index"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      selectedStatistics: null,
      statisticsData: null,
      pieCharts: [], // Array to hold multiple pie charts
    };
  },
  methods: {
    selectStatistics(statisticsType) {
      this.selectedStatistics = statisticsType;
      this.fetchStatisticsData();
      this.$emit("select", statisticsType);
    },
    async fetchStatisticsData() {
      try {
        const response = await axios.get(
          "http://localhost:8080/program/data/category-age"
        );
        this.statisticsData = response.data.response.ageGroups;
        console.log(this.statisticsData);
        this.renderPieCharts(); // Render charts after data is fetched
      } catch (error) {
        console.error("Error fetching statistics data:", error);
      }
    },
    renderPieCharts() {
      // Ensure old charts are destroyed before rendering new ones
      this.pieCharts.forEach((chart) => {
        chart.destroy();
      });
      this.pieCharts = []; // Clear the array

      // Render new charts for each category
      this.statisticsData.forEach((categoryData, index) => {
        const labels = Object.keys(categoryData).filter(
          (key) => key !== "category" && key !== "city"
        );
        const data = labels.map((label) => categoryData[label]);

        // Map age groups to Korean labels
        const translatedLabels = labels.map((label) => {
          switch (label) {
            case "teen":
              return "10대";
            case "twenties":
              return "20대";
            case "thirties":
              return "30대";
            case "forties":
              return "40대";
            case "fifties":
              return "50대";
            case "sixties":
              return "60대";
            case "seventies":
              return "70대";
            case "eighties":
              return "80대";
            default:
              return label; // Handle other cases if needed
          }
        });

        const canvasId = "myPieChart" + index;
        const canvas = document.getElementById(canvasId);
        if (!canvas) return; // Ensure canvas element exists

        const ctx = canvas.getContext("2d");
        if (!ctx) return; // Ensure canvas context exists

        const pieChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: translatedLabels,
            datasets: [
              {
                label: `${categoryData.category} 참여율`,
                data: data,
                backgroundColor: this.getRandomColors(data.length),
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `${categoryData.category} 연령대별 참여율`,
            },
            plugins: {
              tooltip: {
                callbacks: {
                  footer: (tooltipItems) => {
                    const categoryIndex = tooltipItems[0].datasetIndex;
                    return categoryData.category;
                  },
                },
              },
            },
          },
        });
        this.pieCharts.push(pieChart);
      });
    },
    getRandomColors(numColors) {
      // Generate random colors for each dataset
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
        colors.push(color);
      }
      return colors;
    },
  },
  mounted() {
    // Initial rendering when component is mounted
    this.selectStatistics(3);
  },
};
</script>

<style scoped>
.statistics-selector {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

nav ul li {
  margin-right: 10px;
}

button {
  padding: 10px;
  cursor: pointer;
  background-color: #ddd;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #bbb;
}
</style>
