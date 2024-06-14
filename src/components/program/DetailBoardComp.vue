<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-8">
          <article>
            <header class="mb-4">
              <h1 class="fw-bolder mb-1">{{ programIdReadResponse.title }}</h1>
              <div class="text-muted fst-italic mb-2">작성 날짜 : {{ programIdReadResponse.writingTime }}</div>
              <a class="badge bg-secondary text-decoration-none link-light" href="#!">{{ programIdReadResponse.category }}</a>
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
            <form @submit.prevent="submitComment">
              <div class="mb-3">
                <label for="comment" class="form-label">제목</label>
                <textarea v-model="commentDto.title" class="form-control" id="comment" rows="1" required></textarea>
              </div>

              <div class="mb-3">
                <label for="comment" class="form-label">댓글</label>
                <textarea v-model="commentDto.content" class="form-control" id="comment" rows="2" required></textarea>
              </div>

              <div class="mb-3">
                <label for="rating" class="form-label">Rating</label>
                <br>
                <span v-for="index in 5" :key="index" @click="setRating(index)">
                   <span v-if="index <= commentDto.rating" style="cursor: pointer;">⭐</span>
                   <span v-else style="cursor: pointer;">☆</span>
                </span>
              <button type="submit" class="btn btn-primary">댓글작성</button>
              </div>
            </form>

            <div v-for="review in reviewAllReadResponse" :key="review.reviewId" class="mt-4 border-rounded">
              <div class="d-flex justify-content-between">
                <p class="fw-bold">{{review.title}}</p>
                <p class="fw-bold">{{ review.content }}</p>
                <div class="mb-3">
                <span v-for="index in 5" :key="index">
                   <span v-if="index <= review.rating">⭐</span>
                   <span v-else>☆</span>
                </span>
                  <div class="mt-2">
                    <button @click="deleteReview(review.reviewId)" class="btn btn-danger">삭제</button>
                  </div>
                </div>
              </div>
              <small class="text-muted">{{ review.date }}</small>
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
            <p class="fs-5">{{ programIdReadResponse.recruitment }}/{{ programIdReadResponse.maximum }}</p>
            <button @click="recruitmentProgram" v-if="!checkIsMyProgram" type="button" class="btn btn-primary">신청하기</button>
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
      reviewAllReadResponse: [],
      commentDto: {
        title: '',
        content: '',
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
        recruitment : 0,
      },
      nowProgramRecruit : 0,
    };
  },
  computed: {
    checkIsMyProgram() {
      return this.programIdReadResponse.memberEmail === this.$store.state.loginedEmail;
    }
  },
  methods: {
    submitComment() {
      // axios
      axios.post(`${this.$store.state.host}/program/${this.$route.params.id}/review`, this.commentDto, {
        headers : {
          "Accesstoken" : this.$store.state.accessToken,
        }
      })
          .then(() => {
            alert('리뷰를 작성하였습니다!')
          })
          .catch((error) => {
            alert('리뷰 쓸 권한이 없거나, 이미 쓴 리뷰입니다');
            console.log('리뷰 달기 오류 : ' + error);
          })

      this.commentDto.content = '';
      this.commentDto.rating = 5;
    },

    getAllReview(){
      axios.get(`${this.$store.state.host}/program/${this.$route.params.id}/review/view`)
          .then((response) => {
            this.reviewAllReadResponse = response.data.response;
          })
          .catch((error) => {
            console.log('리뷰 불러오기 오류 : ' + error)
          })
    },

    deleteReview(id){
      axios.delete(`${this.$store.state.host}/program/${this.$route.params.id}/review/${id}`, {
        headers : {
          "Accesstoken" : this.$store.state.accessToken,
        }
      })
          .then(() => {
            alert('삭제 성공!');
            console.log('삭제 성공!')
          })
          .catch((error) => {
            console.log('리뷰 삭제 오류 : ' + error)
          })
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
    },
    recruitmentProgram(){
      let id = this.$route.params.id;

      axios.post(`${this.$store.state.host}/program/recruitment/${id}`, null , {
        headers : {
          "Accesstoken" : this.$store.state.accessToken,
        }
      })
          .then((response) => {
            this.nowProgramRecruit = response.data.response;
            alert('프로그램을 신청하셨습니다');
          })
          .catch((error) => {
            console.log('프로그램 신청 에러 : ' + error);
            alert('이미 신청 한 프로그램입니다');
          })
    }
  },
  created() {
    this.getAllReview();

    let id = this.$route.params.id;
    axios.get(`http://localhost:8080/program/view/${id}`)
        .then((response) => {
          this.programIdReadResponse = response.data.response;
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

.container {
  margin-top: 2rem;
  border: 1px solid #ddd; /* 테두리 추가 */
  padding: 1rem;
  border-radius: 0.5rem; /* 모서리를 둥글게 만듦 */
}

.comments {
  border-top: 1px solid #ddd; /* 상단 테두리 추가 */
  padding-top: 1rem; /* 상단 패딩 추가 */
}

.side-widget {
  border: 1px solid #ddd; /* 테두리 추가 */
  padding: 1rem;
  border-radius: 0.5rem; /* 모서리를 둥글게 만듦 */
}

.border-rounded {
  border: 1px solid #ddd; /* 테두리 설정 */
  border-radius: 0.5rem; /* 테두리 둥글기 설정 */
  padding: 1rem; /* 내부 여백 설정 */
}
</style>
