<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-8">
        <article>
          <header class="mb-4">
            <h1 class="fw-bolder mb-1">{{ programIdReadResponse.title }}</h1>
            <div class="text-muted fst-italic mb-2">
              작성 날짜 : {{ programIdReadResponse.writingTime }}
            </div>
            <a
              class="badge bg-secondary text-decoration-none link-light"
              href="#!"
            >
              {{ programIdReadResponse.category }}
            </a>
            <div class="mt-3">
              <button
                v-if="checkIsMyProgram"
                @click="deleteProgram"
                type="button"
                class="btn btn-danger"
              >
                삭제
              </button>
              <button
                v-if="checkIsMyProgram"
                @click="routingUpdateComp"
                type="button"
                class="btn btn-primary"
              >
                수정
              </button>
            </div>
          </header>
          <div
            id="programCarousel"
            class="carousel slide mb-4"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div
                v-for="(image, index) in programIdReadResponse.images"
                :key="index"
                :class="['carousel-item', index === 0 ? 'active' : '']"
              >
                <img
                  :src="image"
                  class="d-block w-100 img-fluid rounded"
                  alt="Program Image"
                />
              </div>
            </div>
            <!-- 이전 화살표 -->
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#programCarousel"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <!-- 다음 화살표 -->
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#programCarousel"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <section class="mb-5">
            <p class="fs-5 mb-4">{{ programIdReadResponse.content }}</p>
          </section>
          <div
            class="side-widget2 bg-light border rounded p-3"
            style="
              max-width: 300px;
              margin: auto;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            "
          >
            <h5 style="text-align: center">
              <a
                class="badge text-bg-dark text-decoration-none link-light"
                href="#!"
                style="font-size: 1.2em; padding: 0.5em 1em"
              >
                프로그램 개최자 정보
              </a>
            </h5>
            <div style="text-align: center; margin: 20px 0">
              <img
                src="https://ptetutorials.com/images/user-profile.png"
                alt="user"
                width="100px"
                style="border-radius: 50%; border: 2px solid #ddd; padding: 5px"
              />
            </div>
            <h2 class="text-muted" style="text-align: center; font-size: 1.5em">
              {{ programIdReadResponse.memberName }}
            </h2>

            <h5 class="fw-bolder" style="margin-top: 20px">개최자 연락처</h5>
            <div class="text-muted" style="margin-bottom: 10px">
              {{ programIdReadResponse.memberEmail }}
            </div>
            <h5 class="fw-bolder">개최자 프로그램 평균 별점</h5>
            <div class="text-muted">
              {{ programIdReadResponse.memberRating }}
            </div>
          </div>
        </article>

        <h2>
          <a
            class="badge rounded-pill text-bg-warning text-decoration-none link-light"
            href="#!"
            style="float: right"
          >
            리뷰
          </a>
        </h2>

        <!-- 댓글 폼 및 댓글 목록 -->
        <section class="comments mb-5">
          <!-- 댓글 폼 -->
          <form @submit.prevent="submitComment">
            <!-- 별점 입력 -->
            <div class="mb-3">
              <label class="form-label">별점</label>
              <br />
              <span
                v-for="index in 5"
                :key="index"
                @click="setRating(index)"
                class="big"
              >
                <span v-if="index <= commentDto.rating">⭐</span>
                <span v-else>☆</span>
              </span>
            </div>
            <!-- 제목 입력 -->
            <div class="mb-3">
              <label for="commentTitle" class="form-label">제목</label>
              <textarea
                v-model="commentDto.title"
                class="form-control"
                id="commentTitle"
                rows="1"
                required
              ></textarea>
            </div>
            <!-- 댓글 내용 입력 -->
            <div class="mb-3">
              <label for="commentContent" class="form-label">댓글</label>
              <textarea
                v-model="commentDto.content"
                class="form-control"
                id="commentContent"
                rows="2"
                required
              ></textarea>
            </div>

            <!-- 댓글 작성 버튼 -->
            <button type="submit" class="btn btn-primary" style="float: right">
              댓글 작성
            </button>
            <br />
            <br />
          </form>

          <!-- 댓글 목록 -->
          <div
            v-for="review in reviewAllReadResponse"
            :key="review.reviewId"
            class="mt-4 border rounded p-3"
          >
            <a
              class="badge rounded-pill text-bg-warning text-decoration-none link-light"
              href="#!"
              style="float: right"
            >
              리뷰
            </a>
            <div class="d-flex justify-content-between">
              <h5 class="fw-bold">{{ review.title }}</h5>

              <div class="d-flex">
                <span
                  v-for="index in 5"
                  :key="index"
                  :class="[
                    'mx-1',
                    'text-primary',
                    index <= review.rating ? 'fas' : 'far',
                    'fa-star',
                  ]"
                >
                </span>
                <button
                  @click="deleteReview(review.reviewId)"
                  class="btn btn-danger"
                  v-if="review.senderEmail === this.$store.state.loginedEmail"
                >
                  삭제
                </button>
              </div>
            </div>
            <small class="text-muted">{{ review.senderEmail }}</small
            ><br />

            <p>{{ review.content }}</p>
            <small class="text-muted">{{ review.date }}</small>
          </div>
        </section>
      </div>
      <!-- 사이드 위젯 -->
      <div class="col-lg-4">
        <div class="side-widget bg-light border rounded p-3">
          <h4 class="fw-bolder">모집 기간</h4>
          <p class="fs-5">
            {{ programIdReadResponse.recruitmentStartDate }} ~
            {{ programIdReadResponse.recruitmentEndDate }}
          </p>
          <h4 class="fw-bolder">프로그램 시작 날짜</h4>
          <p class="fs-5">{{ programIdReadResponse.programDate }}</p>
          <h4 class="fw-bolder">프로그램 장소</h4>
          <p class="fs-5">{{ programIdReadResponse.programAddress }}</p>
          <h4 class="fw-bolder">현재 모집인원</h4>
          <p class="fs-5">
            {{ programIdReadResponse.recruitment }}/{{
              programIdReadResponse.maximum
            }}
          </p>
          <button
            @click="recruitmentProgram"
            v-if="!checkIsMyProgram"
            type="button"
            class="btn btn-primary"
          >
            신청하기
          </button>
          <button
            type="button"
            class="btn btn-dark"
            @click="routingAllChatComp"
          >
            채팅하기
          </button>
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
        title: "",
        content: "",
        rating: 5,
      },
      programIdReadResponse: {
        memberEmail: "",
        title: "",
        writingTime: "",
        content: "",
        category: "",
        maximum: "",
        recruitmentStartDate: "",
        recruitmentEndDate: "",
        programAddress: "",
        programDate: "",
        open: "",
        recruitment: 0,
        images: [],
      },
    };
  },
  computed: {
    checkIsMyProgram() {
      return (
        this.programIdReadResponse.memberEmail ===
        this.$store.state.loginedEmail
      );
    },
  },
  methods: {
    submitComment() {
      axios
        .post(
          `${this.$store.state.host}/program/${this.$route.params.id}/review`,
          this.commentDto,
          {
            headers: {
              Accesstoken: this.$store.state.accessToken,
            },
          }
        )
        .then(() => {
          alert("리뷰를 작성하였습니다!");
          this.getAllReview(); // 댓글 작성 후 목록 갱신
        })
        .catch((error) => {
          alert("리뷰 쓸 권한이 없거나, 이미 쓴 리뷰입니다");
          console.log("리뷰 달기 오류 : " + error);
        });

      this.commentDto.content = "";
      this.commentDto.rating = 5;
    },
    getAllReview() {
      axios
        .get(
          `${this.$store.state.host}/program/${this.$route.params.id}/review/view`
        )
        .then((response) => {
          this.reviewAllReadResponse = response.data.response;
        })
        .catch((error) => {
          console.log("리뷰 불러오기 오류 : " + error);
        });
    },
    deleteReview(id) {
      axios
        .delete(
          `${this.$store.state.host}/program/${this.$route.params.id}/review/${id}`,
          {
            headers: {
              Accesstoken: this.$store.state.accessToken,
            },
          }
        )
        .then(() => {
          alert("삭제 성공!");
          console.log("삭제 성공!");
          this.getAllReview(); // 삭제 후 목록 갱신
        })
        .catch((error) => {
          console.log("리뷰 삭제 오류 : " + error);
        });
    },
    setRating(rating) {
      this.commentDto.rating = rating;
      console.log(this.commentDto.rating);
    },
    routingUpdateComp() {
      this.$router.push(`/board/update/${this.$route.params.id}`);
    },
    deleteProgram() {
      let id = this.$route.params.id;

      axios
        .delete(`${this.$store.state.host}/program/${id}`, {
          headers: {
            Accesstoken: this.$store.state.accessToken,
          },
        })
        .then(() => {
          alert("글을 삭제하였습니다");
          window.location.href = "/";
        })
        .catch((error) => {
          alert("글 삭제 중 에러가 발생하였습니다");
          console.log("Delete : " + error);
        });
    },
    recruitmentProgram() {
      let id = this.$route.params.id;

      axios
        .post(`${this.$store.state.host}/program/recruitment/${id}`, null, {
          headers: {
            Accesstoken: this.$store.state.accessToken,
          },
        })
        .then((response) => {
          this.nowProgramRecruit = response.data.response;
          alert("프로그램을 신청하셨습니다");
          this.$router.go(0);
        })
        .catch((error) => {
          console.log("프로그램 신청 에러 : " + error);
          alert("이미 신청 한 프로그램입니다");
        });
    },
    routingAllChatComp() {
      this.$router.push({
        path: `/client/chat/${this.programIdReadResponse.publicChannelId}`,
        props: { programData: this.programIdReadResponse },
      });
    },
  },
  created() {
    this.getAllReview();

    let id = this.$route.params.id;
    axios
      .get(`${this.$store.state.host}/program/view/${id}`)
      .then((response) => {
        this.programIdReadResponse = response.data.response;
        console.log(this.programIdReadResponse);
      })
      .catch((error) => {
        console.log("Get 에러 " + error);
      });
  },
};
</script>

<style scoped>
.mt-3 {
  float: right;
}
.mt-3 .btn {
  font-size: 12px;
  margin-bottom: 10px;
}
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
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}

.side-widget {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 0.5rem;
}
.side-widget2 {
  width: 500px;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 0.5rem;
}
.border-rounded {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
}
.carousel-control-prev,
.carousel-control-next {
  color: black;
}

.carousel-inner img {
  max-width: 80%;
  height: auto;
}
.big {
  font-size: 3em;
}
</style>
