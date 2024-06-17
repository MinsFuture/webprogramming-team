<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <button @click="selectNumber(0)" >지역별 카테고리 참여율</button>
          </li>
          <li>
            <button @click="selectNumber(1)">카테고리별 연령 참여율</button>
          </li>
          <li>
            <button @click="selectNumber(2)">연령별 카테고리 참여율</button>
          </li>
        </ul>
      </nav>
    </header>
    <AgeCategoryComp v-if="selectedNumber === 0"></AgeCategoryComp>
    <CityCategoryComp v-if="selectedNumber === 1"></CityCategoryComp>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import CityCategoryComp from "@/components/CityCategoryComp.vue";
import AgeCategoryComp from "@/components/AgeCategoryComp.vue";

export default defineComponent({
  components: {AgeCategoryComp, CityCategoryComp},
  data() {
    return {
      selectedNumber : 0,
    }
  },
  methods : {
    selectNumber(id){
      this.selectedNumber = id;
      console.log(this.selectedNumber);
    },
  }
})
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
