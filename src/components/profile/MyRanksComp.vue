<template>
  <div class="container">
    <h1 class="center-content">내 등급</h1>
    <div class="badge-wrapper">
      <div class="badge-content">
        <span class="badge rounded-pill text-bg-primary">1단계</span>
        <span class="badge rounded-pill text-bg-secondary">2단계</span>
        <span class="badge rounded-pill text-bg-success">3단계</span>
        <span class="badge rounded-pill text-bg-danger">4단계</span>
        <span class="badge rounded-pill text-bg-warning">5단계</span>
      </div>
    </div>

    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 75%"></div>
    </div>

    <div class="current-level">
      <h2>현재 당신은 1단계입니다!</h2>
    </div>

  </div>
</template>

<style scoped>
.badge-wrapper {
  display: flex;
  justify-content: center;
  margin-top: -30px; /* 뱃지와 내 등급 간의 수직 간격 조절 */
}

.badge-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px; /* 각 배지 사이의 간격 조절 */
}

.progress {
  margin-top: 100px;
}

.current-level {
  text-align: center; /* 텍스트 가운데 정렬 */
  margin-top: 20px; /* 내 등급과의 수직 간격 조절 */
}
</style>
