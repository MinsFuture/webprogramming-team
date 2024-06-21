<template>
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
    <h2>{{ selectedCategory }}는 어떤 프로그램을 좋아할까?</h2>
    <div class="main-container">
      <div class="content">
        <div v-if="filteredData">
          <canvas id="myPieChart"></canvas>
        </div>
        <div v-else>
          <p>데이터가 없습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  name: "AgeCategoryComp",
  data() {
    return {
      statisticsData: null,
      pieChart: null,
      selectedCategory: "10대",
      categories: ["10대", "20대", "30대", "40대", "50대", "60대", "70대"],
    };
  },
  computed: {
    filteredData() {
      if (!this.statisticsData) return null;
      const categoryMapping = {
        "10대": "teenager",
        "20대": "twenties",
        "30대": "thirties",
        "40대": "forties",
        "50대": "fifties",
        "60대": "sixties",
        "70대": "seventies",
      };
      const selectedAgeGroup = categoryMapping[this.selectedCategory];
      return this.statisticsData.find((data) => data.age === selectedAgeGroup);
    },
  },
  mounted() {
    this.fetchStatisticsData();
  },
  methods: {
    async fetchStatisticsData() {
      try {
        const response = await axios.get(
          `${this.$store.state.host}/program/data/age-category`
        );
        this.statisticsData = response.data.response;
        console.log(this.statisticsData);
        this.$nextTick(() => {
          this.renderPieChart();
        });
      } catch (error) {
        console.error("Error fetching statistics data:", error);
      }
    },
    renderPieChart() {
      if (this.pieChart) {
        this.pieChart.destroy();
      }

      if (this.filteredData) {
        const canvas = document.getElementById("myPieChart");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const labels = Object.keys(this.filteredData).filter(
          (key) => key !== "age"
        );
        const values = labels.map((label) => this.filteredData[label]);

        // Map labels to Korean
        const translatedLabels = labels.map((label) => {
          switch (label) {
            case "sports":
              return "스포츠";
            case "computer":
              return "컴퓨터";
            case "art":
              return "예술";
            default:
              return label;
          }
        });

        this.pieChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: translatedLabels,
            datasets: [
              {
                label: `${this.selectedCategory} 참여율`,
                data: values,
                backgroundColor: this.getRandomColors(values.length),
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
                text: `${this.selectedCategory} 연령대별 참여율`,
              },
              tooltip: {
                callbacks: {
                  footer: (tooltipItems) => {
                    console.log(tooltipItems);
                    return this.selectedCategory;
                  },
                },
              },
            },
          },
        });
      }
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
    selectCategory(category) {
      this.selectedCategory = category;
      this.$nextTick(() => {
        this.renderPieChart();
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
