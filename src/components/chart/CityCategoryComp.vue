<template>
  <div>
    <div class="sidebar">
      <ul>
        <li
          v-for="category in categories"
          :key="category"
          :class="{ active: category === selectedCategory }"
          @click="selectCategory(category)"
        >
          {{ category }}
        </li>
      </ul>
    </div>
    <div class="statistics-selector">
      <div class="main-container">
        <div class="content">
          <h2>{{ selectedCategory }} 카테고리는 어떤 연령대가 좋아할까?</h2>
          <div v-if="filteredData.length">
            <div v-for="(categoryData, index) in filteredData" :key="index">
              <canvas :id="'myPieChart' + index"></canvas>
            </div>
          </div>
          <div v-else>
            <p>데이터가 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  name: "CityCategoryComp",
  data() {
    return {
      selectedStatistics: null,
      statisticsData: null,
      pieCharts: [], // Array to hold multiple pie charts
      selectedCategory: "SPORTS",
      categories: ["SPORTS", "COMPUTER", "ART", "MUSIC", "COOKING", "ETC"],
    };
  },
  computed: {
    filteredData() {
      return this.statisticsData
        ? this.statisticsData.filter(
            (data) => data.category === this.selectedCategory
          )
        : [];
    },
  },
  created() {
    this.fetchStatisticsData();
  },
  methods: {
    async fetchStatisticsData() {
      try {
        const response = await axios.get(
          `${this.$store.state.host}/program/data/category-age`
        );
        this.statisticsData = response.data.response.ageGroups;
        console.log(this.statisticsData);
        this.$nextTick(() => {
          this.renderPieCharts(); // Render charts after DOM is updated
        });
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
      this.filteredData.forEach((categoryData, index) => {
        this.$nextTick(() => {
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
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: `${categoryData.category} 연령대별 참여율`,
                },
                tooltip: {
                  callbacks: {
                    footer: (tooltipItems) => {
                      const categoryIndex = tooltipItems[0].datasetIndex;
                      console.log(categoryIndex);
                      return categoryData.category;
                    },
                  },
                },
              },
            },
          });
          this.pieCharts.push(pieChart);
        });
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
    selectCategory(category) {
      this.selectedCategory = category;
      this.$nextTick(() => {
        this.renderPieCharts(); // Render charts after DOM is updated
      });
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  margin-top: 2rem;
}

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

.sidebar {
  position: fixed;
  top: 30%;
  left: 50px;
  width: 200px;
  margin-right: 2rem;
  background-color: rgba(255, 220, 159, 0.1);
  padding: 1rem;
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 10px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  border-radius: 4px; /* 둥근 모서리 */
}

.sidebar li:hover {
  background-color: rgba(139, 87, 42, 0.2);
}

.sidebar li.active {
  background-color: #8b572a;
  color: white;
}

.content {
  flex-grow: 1;
  text-align: left;
}
</style>
