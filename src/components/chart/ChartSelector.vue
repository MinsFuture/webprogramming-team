<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <button
              @click="selectNumber(0)"
              :class="{ active: selectedNumber === 0 }"
            >
              카테고리별 연령 참여율
            </button>
          </li>
          <li>
            <button
              @click="selectNumber(1)"
              :class="{ active: selectedNumber === 1 }"
            >
              연령별 카테고리 참여율
            </button>
          </li>
          <li>
            <button
              @click="selectNumber(2)"
              :class="{ active: selectedNumber === 2 }"
            >
              지역별 카테고리 참여율
            </button>
          </li>
        </ul>
      </nav>
    </header>
    <CityCategoryComp v-if="selectedNumber === 0"></CityCategoryComp>
    <AgeCategoryComp v-if="selectedNumber === 1"></AgeCategoryComp>
    <CityCategoryAgeChart v-if="selectedNumber === 2"></CityCategoryAgeChart>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CityCategoryComp from "@/components/chart/CityCategoryComp.vue";
import AgeCategoryComp from "@/components/chart/AgeCategoryComp.vue";
import CityCategoryAgeChart from "@/components/chart/CityCategoryAgeChart.vue";

export default defineComponent({
  components: { AgeCategoryComp, CityCategoryComp, CityCategoryAgeChart },
  data() {
    return {
      selectedNumber: 0,
    };
  },
  methods: {
    selectNumber(id) {
      this.selectedNumber = id;
      console.log(this.selectedNumber);
    },
  },
});
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
  background-color: rgba(139, 87, 42, 0.2);
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #8b572a;
}

button.active {
  background-color: #8b572a;
  color: white;
}
</style>
