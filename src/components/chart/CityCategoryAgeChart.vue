<template>
  <div class="selector-page">
    <div class="dropdown">
      <label for="city"> 지역 :</label>
      <select v-model="selectedCity" @change="fetchStatisticData">
        <option v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
      <label for="category"> 카테고리 :</label>
      <select v-model="selectedCategory" @change="fetchStatisticData">
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <div class="statistics-selector">
      <div class="main-container">
        <div class="content">
          <h2>{{ selectedCity }}의 {{ selectedCategory }} 프로그램 참여율</h2>
          <div v-if="statisticData">
            <canvas id="myPieChart"></canvas>
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
  data() {
    return {
      selectedCity: "서울",
      selectedCategory: "COMPUTER",
      cities: ["서울", "부산", "대구"],
      categories: ["SPORTS", "COMPUTER", "ART"],
      statisticData: null,
      pieChart: null,
    };
  },
  created() {
    this.fetchStatisticData();
  },
  methods: {
    async fetchStatisticData() {
      try {
        const response = await axios.post(
          `${this.$store.state.host}/program/data/city-category-age`,
          {
            city: this.selectedCity,
            category: this.selectedCategory,
          }
        );
        this.statisticData = response.data.response.ageGroups[0];
        console.log(this.statisticData);
        this.$nextTick(() => {
          this.renderPieChart(); // Render charts after DOM is updated
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    renderPieChart() {
      if (this.pieChart) {
        this.pieChart.destroy(); // Destroy previous chart if exists
      }

      if (!this.statisticData) {
        console.error("No data available to render pie chart.");
        return;
      }

      const labels = Object.keys(this.statisticData).filter(
        (key) => key !== "category" && key !== "city"
      );
      const data = labels.map((label) => this.statisticData[label]);

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

      const canvas = document.getElementById("myPieChart");
      if (!canvas) {
        console.error("Canvas element not found.");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Canvas context not found.");
        return;
      }

      this.pieChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: translatedLabels,
          datasets: [
            {
              label: `${this.statisticData.category} 참여율`,
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
              text: `${this.statisticData.category} 연령대별 참여율`,
            },
            tooltip: {
              callbacks: {
                footer: (tooltipItems) => {
                  const categoryIndex = tooltipItems[0].datasetIndex;
                  console.log(categoryIndex);
                  return this.statisticData.category;
                },
              },
            },
          },
        },
      });
    },
    getRandomColors(numColors) {
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
  watch: {
    selectedCity() {
      this.fetchStatisticData();
    },
    selectedCategory() {
      this.fetchStatisticData();
    },
  },
  mounted() {
    this.renderPieChart(); // Render initial pie chart
  },
};
</script>

<style scoped>
.selector-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.dropdown {
  margin-bottom: 1rem;
}

label {
  margin-right: 0.5rem;
}

select {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.data-display {
  margin-top: 2rem;
  text-align: center;
}
</style>
