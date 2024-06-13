<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-8">
          <article>
            <header class="mb-4">
              <h1 class="fw-bolder mb-1">{{ programIdReadResponse.title }}</h1>
              <div class="text-muted fst-italic mb-2">작성 날짜 : {{ programIdReadResponse.writingTime }}</div>
              <a class="badge bg-secondary text-decoration-none link-light" href="#!">{{
                  programIdReadResponse.category
                }}</a>
            </header>
            <figure class="mb-4">
              <img class="img-fluid rounded" src="" alt="..."/>
            </figure>
            <section class="mb-5">
              <p class="fs-5 mb-4">{{ programIdReadResponse.content }}}</p>
            </section>
          </article>

          <div class="d-flex justify-content-end mb-3">
            <button v-if="checkIsMyProgram" @click="deleteProgram" type="button" class="btn btn-primary">삭제</button>
            <button v-if="checkIsMyProgram" @click="routingUpdateComp" type="button" class="btn btn-primary">수정</button>
          </div>

          <section class="comments mb-5">
            <h3 class="fw-bolder mb-4">댓글</h3>
            <form @submit.prevent="submitComment">
              <div class="mb-3">
                <label for="comment" class="form-label">댓글</label>
                <textarea v-model="commentDto.text" class="form-control" id="comment" rows="3" required></textarea>
              </div>
              <div class="mb-3">
                <label for="rating" class="form-label">Rating</label>
                <br>
                <span v-for="index in 5" :key="index" @click="setRating(index)">
                   <span v-if="index <= commentDto.rating" style="cursor: pointer;">⭐</span>
                   <span v-else style="cursor: pointer;">☆</span>
                </span>
              </div>
              <button type="submit" class="btn btn-primary">댓글작성</button>
            </form>

            <div v-for="comment in comments" :key="comment.date" class="mt-4">
              <div class="d-flex justify-content-between">
                <p class="fw-bold">{{ comment.text }}</p>
                <div class="mb-3">
                <span v-for="index in 5" :key="index">
                   <span v-if="index <= comment.rating">⭐</span>
                   <span v-else>☆</span>
                </span>
                </div>
              </div>
              <small class="text-muted">{{ comment.date }}</small>
            </div>
          </section>
        </div>
        <div class="col-lg-4">
          <!-- Side widget-->
          <div class="side-widget">
            <h3 class="fw-bolder">모집 기간</h3>
            <p class="fs-5">{{ programIdReadResponse.recruitmentStartDate }} ~
              {{ programIdReadResponse.recruitmentEndDate }}</p>
            <h3 class="fw-bolder">프로그램 시작 날짜</h3>
            <p class="fs-5">{{ programIdReadResponse.programDate }}</p>
            <h3 class="fw-bolder">현재 모집인원</h3>
            <p class="fs-5">0/{{ programIdReadResponse.maximum }}</p>
            <button type="button" class="btn btn-primary">신청하기</button>
            <button type="button" class="btn btn-primary">채팅하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BlogPost",
  data() {
    return {
      comments: [],
      commentDto: {
        text: '',
        rating: 5
      },
      programIdReadResponse: {
        memberEmail: '',
        title: '',
        writingTime: '',
        content: '',
        category: '',
        maximum: '',
        recruitmentStartDate: '',
        recruitmentEndDate: '',
        programDate: '',
        open: '',
      }
    };
  },
  computed: {
    checkIsMyProgram() {
      return this.programIdReadResponse.memberEmail === this.$store.state.loginedEmail;
    }
  },
  methods: {
    submitComment() {
      if (this.commentDto.text.trim() === '') {
        return;
      }
      // axios

      this.commentDto.text = '';
      this.commentDto.rating = 0;
    },
    setRating(rating) {
      this.commentDto.rating = rating;
      console.log(this.commentDto.rating)
    },
    routingUpdateComp() {
      this.$router.push(`/board/update/${this.$route.params.id}`)
    },
    deleteProgram() {
      let id = this.$route.params.id;

      axios.delete(`http://localhost:8080/program/${id}`,
          {
            headers: {
              "Accesstoken": this.$store.state.accessToken,
            }
          })
          .then(() => {
            alert('글을 삭제하였습니다')
            this.$router.push('/');
          })
          .catch((error) => {
            alert('글 삭제 중 에러가 발생하였습니다')
            console.log('Delete : ' + error);
          })
    }
  },
  created() {
    let id = this.$route.params.id;

    axios.get(`http://localhost:8080/program/view/${id}`)
        .then((response) => {
          this.programIdReadResponse = response.data.response;
          console.log(this.programIdReadResponse);
          console.log(this.programIdReadResponse.title)
        })
        .catch((error) => {
          console.log('Get 에러 ' + error);
        })
  },
};
</script>

<style scoped>
.star-rating {
  unicode-bidi: bidi-override;
  direction: rtl;
  text-align: left;
}
</style>
