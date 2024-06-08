<script>
export default {
  name: "CreatingBoardComp",
  data() {
    return {
      createdBoardRequestDto: {
        title: '',
        content: '',
        category: '',
        maxParticipants: 0,
        recruitmentPeriodStart : '',
        recruitmentPeriodEnd : '',
        startDate: ''
      },
      isFormValid: false,
      recruitmentPeriodValid: true
    }
  },
  methods: {
    submitForm(event) {
      event.preventDefault(); // 기본 제출 동작을 막습니다.
      // 양식 제출 전에 유효성 검사 실행
      this.checkFormValidity();
      console.log(this.createdBoardRequestDto)

      // 유효성 검사를 통과한 경우에만 제출
      if (this.isFormValid) {
        alert("글 등록에 성공하였습니다");
        // axios 요청 필요
        this.$router.push("/");
      } else {
        // 유효성 검사를 통과하지 못한 경우 사용자에게 메시지 표시
        alert("양식을 다시 확인해주세요.");
      }
    },

    checkFormValidity() {
      // 모집 기간의 유효성 확인
      this.recruitmentPeriodValid = this.createdBoardRequestDto.recruitmentPeriodStart !== '' &&
          this.createdBoardRequestDto.recruitmentPeriodEnd !== '' &&
          this.createdBoardRequestDto.recruitmentPeriodStart <= this.createdBoardRequestDto.recruitmentPeriodEnd;

      // 모든 필드가 유효한지 확인하여 isFormValid 업데이트
      this.isFormValid = this.createdBoardRequestDto.title.trim().length > 0 &&
          this.createdBoardRequestDto.content.trim().length > 0 &&
          this.createdBoardRequestDto.category !== '' &&
          this.createdBoardRequestDto.maxParticipants > 0 &&
          this.recruitmentPeriodValid &&
          this.createdBoardRequestDto.startDate !== '' &&
          this.$refs.fileInput.files.length > 0;
    }
  }
}
</script>

<template>
  <div class="container">
    <h1 class="center-content">프로그램 개설</h1>
    <form class="was-validated" @submit="submitForm">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <textarea v-model="createdBoardRequestDto.title" class="form-control" id="title"
                  placeholder="제목을 입력하세요" required style="height: 15px"></textarea>
        <div class="invalid-feedback">
          제목을 입력하세요
        </div>
      </div>

      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea v-model="createdBoardRequestDto.content" class="form-control" id="content"
                  placeholder="내용을 입력하세요" required style="height: 200px"></textarea>
        <div class="invalid-feedback">
          내용을 입력하세요
        </div>
      </div>

      <div class="mb-3">
        <select v-model="createdBoardRequestDto.category" class="form-select" required aria-label="select example">
          <option value="">카테고리를 선택하세요</option>
          <option value="1">교육</option>
          <option value="2">봉사</option>
          <option value="3">운동</option>
        </select>
        <div class="invalid-feedback">카테고리를 선택해주세요</div>
      </div>

      <div class="mb-3">
        <label for="maxParticipants" class="form-label">최대 참가자 수</label>
        <input type="number" v-model="createdBoardRequestDto.maxParticipants" class="form-control" id="maxParticipants"
               placeholder="최대 참가자 수를 입력하세요" min="1" max="99" required>
        <div class="invalid-feedback">
          최대 참가자 수를 입력하세요 (1부터 99까지 가능합니다)
        </div>
      </div>

      <div class="mb-3">
        <label for="recruitmentPeriod" class="form-label">모집 기간</label>
        <div class="d-flex align-items-center">
          <input type="date" v-model="createdBoardRequestDto.recruitmentPeriodStart" class="form-control" id="recruitmentStartDate"
                 required>
          <span class="mx-2">~</span>
          <input type="date" v-model="createdBoardRequestDto.recruitmentPeriodEnd" class="form-control" id="recruitmentEndDate"
                 required>
        </div>
        <div class="invalid-feedback" v-if="!recruitmentPeriodValid">모집 종료일은 모집 시작일보다 앞에 있을 수 없습니다.</div>
        <div class="invalid-feedback" v-else>모집 기간을 선택하세요</div>
      </div>

      <div class="mb-3">
        <label for="startDate" class="form-label">프로그램 시작 날짜</label>
        <input type="date" v-model="createdBoardRequestDto.startDate" class="form-control" id="startDate" required>
        <div class="invalid-feedback">
          프로그램 시작 날짜를 선택하세요
        </div>
      </div>

      <div class="mb-3">
        <input type="file" class="form-control" aria-label="file example" multiple required ref="fileInput">
        <div class="invalid-feedback">사진을 최소 하나이상 첨부해주세요</div>
      </div>

      <div class="mb-3">
        <button class="btn btn-primary" type="submit">신청하기</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* 여기에 필요한 스타일을 추가하세요 */
.d-flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}
.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>
