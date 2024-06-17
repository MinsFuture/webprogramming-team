<script>
import axios from "axios";
import { Client } from "@stomp/stompjs";

/* eslint-disable */

export default {
  name: "ClientChatComp",
  components: {},
  data() {
    return {
      AddSubscriptionRequest: {
        channelId: 1,
      },
      id: 0,
      messages: [],
      content: "",
    };
  },
  created() {
    this.getSubscription().then(() => {
      this.getAllMessages().then(() => {
        this.connectWebSocket();
      });
    });
  },
  methods: {
    getSubscription() {
      return axios
        .post(
          `${this.$store.state.host}/member-channel-subscription`,
          JSON.stringify(this.AddSubscriptionRequest),
          {
            headers: {
              Accesstoken: this.$store.state.accessToken,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("구독 성공 : " + response.data.response);
          // 메시지 불러오기
        })
        .catch((error) => {
          console.log("구독 실패 : " + error);
        });
    },

    getAllMessages() {
      return axios
        .get(
          `${this.$store.state.host}/message/public_channel/${this.$route.params.id}`,
          {
            headers: {
              Accesstoken: this.$store.state.accessToken,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          this.messages = response.data.response;
        })
        .catch((error) => {
          console.log("메시지 불러오기 오류 : " + error);
        });
    },

    connectWebSocket() {
      this.stompClient = new Client({
        brokerURL: `ws://localhost:8080/ws`,
        onConnect: () => {
          console.log("WebSocket 연결 성공!");
          this.stompClient.subscribe(
            `/topic/chat/public/${this.$route.params.id}`,
            (message) => {
              this.messages.push(JSON.parse(message));
            },
            {
              Accesstoken: this.$store.state.accessToken,
            }
          );
        },
        onStompError: (frame) => {
          console.error("WebSocket 연결 오류:", frame);
          this.connectionStatus = "오류";
        },
        onDisconnect: () => {
          console.log("WebSocket 연결 종료");
          this.connectionStatus = "종료됨";
        },
      });
      this.stompClient.activate();
    },

    sendMessage() {
      const message = {
        content: this.content,
      };

      const headers = {
        Accesstoken: this.$store.state.accessToken,
        // 다른 필요한 헤더들 추가 가능
      };
      console.log(headers);

      console.log(this.$route.params.id);
      this.stompClient.publish({
        destination: `/app/chat/public/${this.$route.params.id}`,
        body: JSON.stringify(message),
        headers: headers, // 헤더 객체를 넣어줍니다.
      });

      this.content = "";
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="messaging">
      <!-------------------- 메시지 ------------------>
      <div class="mesgs">
        <div class="msg_history">
          <div class="incoming_msg">
            <div class="incoming_msg_img">
              <img
                src="https://ptetutorials.com/images/user-profile.png"
                alt="sunil"
              />
            </div>
            <div class="received_msg">
              <div class="received_withd_msg">
                <p>Test which is a new approach to have all solutions</p>
                <span class="time_date"> 11:01 AM | June 9</span>
              </div>
            </div>
          </div>
          <div class="outgoing_msg">
            <div class="sent_msg">
              <p>Test which is a new approach to have all solutions</p>
              <span class="time_date"> 11:01 AM | June 9</span>
            </div>
          </div>

          <div class="incoming_msg">
            <div class="incoming_msg_img">
              <img
                src="https://ptetutorials.com/images/user-profile.png"
                alt="sunil"
              />
            </div>
            <div class="received_msg">
              <div class="received_withd_msg">
                <p>
                  We work directly with our designers and suppliers, and sell
                  direct to you, which means quality, exclusive products, at a
                  price anyone can afford.
                </p>
                <span class="time_date"> 11:01 AM | Today</span>
              </div>
            </div>
          </div>
        </div>
        <div class="type_msg">
          <div class="input_msg_write">
            <input
              type="text"
              v-model="content"
              class="write_msg"
              placeholder="Type a message"
            />
            <button @click="sendMessage" class="msg_send_btn" type="button">
              <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1170px;
  margin: 0 auto; /* 수평 중앙 정렬 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 수직 중앙 정렬 */
}

img {
  max-width: 100%;
}

.mesgs {
  float: none; /* 플로팅 해제 */
  padding: 30px 15px 0 25px;
  width: 60%;
  margin: 0 auto; /* 수평 중앙 정렬 */
}

.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}

.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}

.top_spac {
  margin: 20px 0 0;
}

.recent_heading {
  float: left;
  width: 40%;
}

.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}

.headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}

.srch_bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}

.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}

.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}

.chat_ib h5 span {
  font-size: 13px;
  float: right;
}

.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}

.chat_img {
  float: left;
  width: 11%;
}

.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people {
  overflow: hidden;
  clear: both;
}

.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}

.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}

.active_chat {
  background: #ebebeb;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}

.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}

.received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}

.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}

.received_withd_msg {
  width: 57%;
}

.sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}

.outgoing_msg {
  overflow: hidden;
  margin: 26px 0 26px;
}

.sent_msg {
  float: right;
  width: 46%;
}

.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}

.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}

.messaging {
  padding: 0 0 50px 0;
}

.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>
