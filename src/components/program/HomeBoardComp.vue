<template>
  <div class="main-container">
    <div class="sidebar">
      <ul>
        <li
          v-for="category in categories"
          :key="category"
          :class="{ active: category === selectedCategory }"
          @click="selectCategory(category)"
        >
          {{ getCategoryDisplayName(category) }}
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="container">
        <div
          @click="routingDetailsComp(program.id)"
          class="card"
          v-for="program in filteredPrograms"
          :key="program.id"
        >
          <img
            :src="`${program.imageUrl}`"
            class="card-img-top fixed-size-img"
            alt="gd"
          />
          <div class="card-body">
            <h5 class="card-title">{{ program.title }}</h5>
            <h5 class="card-subtitle text-muted small">
              ⭐ {{ isNaN(program.avgRating) ? "-" : program.avgRating }} ({{
                program.ratingCnt
              }})
            </h5>
            <br />
            <p class="card-text">
              <small class="text-body-secondary">
                <span
                  :class="{
                    'badge text-white bg-primary': program.open === 'OPEN',
                    'badge text-white bg-danger': program.open === 'CLOSED',
                  }"
                >
                  {{ program.open === "OPEN" ? "모집중" : "모집마감" }}
                </span>
              </small>
              <small class="text-body-secondary">
                <span class="badge badge-light-custom">
                  {{ program.category }}
                </span>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBoardComp",
  props: {
    programAllReadResponse: Array,
  },
  data() {
    return {
      selectedCategory: "전체",
      categories: [
        "전체",
        "SPORTS",
        "COMPUTER",
        "ART",
        "MUSIC",
        "COOKING",
        "ETC",
      ],
      categoryNames: {
        전체: "ALL",
        SPORTS: "SPORTS",
        COMPUTER: "COMPUTER",
        ART: "ART",
      },
    };
  },
  computed: {
    filteredPrograms() {
      if (this.selectedCategory === "전체") {
        return this.programAllReadResponse;
      }
      return this.programAllReadResponse.filter(
        (program) =>
          program.category === this.categoryNames[this.selectedCategory]
      );
    },
  },
  methods: {
    routingDetailsComp(id) {
      this.$router.push(`/board/${id}`);
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    getCategoryDisplayName(category) {
      return {
        전체: "전체",
        SPORTS: "스포츠",
        COMPUTER: "컴퓨터",
        ART: "미술",
        MUSIC: "음악",
        COOKING: "요리",
        ETC: "기타",
      }[category];
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  margin-top: 2rem;
}

.sidebar {
  width: 200px;
  margin-right: 2rem;
  background-color: #f8f9fa;
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
  background-color: #e9ecef;
}

.sidebar li.active {
  background-color: black;
  color: white;
}

.content {
  flex: 1;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  width: 12rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.badge-light-custom {
  background-color: #f0f0f1;
  color: #555; /* 글자색 */
}

.fixed-size-img {
  width: 100%;
  height: 130px;
  object-fit: cover;
}
</style>
