<script>
import axios from "axios";
import { Client } from "@stomp/stompjs";

/* eslint-disable */

export default {
  name: "AllChatComp",
  components: {},
  props: {
    programData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      AddSubscriptionRequest: {
        channelId: this.$route.params.id,
      },
      id: 0,
      messages: [],
      content: "",
    };
  },
  created() {
    console.log(this.programData);
    this.getAllMessages().then(() => {
      this.connectWebSocket();
    });
  },
  methods: {
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
          console.log(this.messages);
          console.log(this.$store.state.loginedEmail);
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        })
        .catch((error) => {
          console.log("메시지 불러오기 오류 : " + error);
        });
    },

    connectWebSocket() {
      if (this.stompClient) {
        this.stompClient.deactivate();
      }
      this.stompClient = new Client({
        // 35.216.104.192
        brokerURL: `${this.$store.state.ws}/ws`,
        connectHeaders: {
          Accesstoken: `Bearer ${this.$store.state.accessToken}`,
        },
        onConnect: () => {
          console.log("WebSocket 연결 성공!");
          this.stompClient.subscribe(
            `/topic/chat/public/${this.$route.params.id}`,
            (message) => {
              try {
                const parsedMessage = JSON.parse(message.body);
                this.messages.push(parsedMessage);
                this.$nextTick(() => {
                  this.scrollToBottom();
                });
              } catch (e) {
                console.error("메시지 파싱 오류:", e);
              }
            },
            { Accesstoken: `Bearer ${this.$store.state.accessToken}` }
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
        Accesstoken: `${this.$store.state.accessToken}`,
      };

      const headers = {
        Accesstoken: `Bearer ${this.$store.state.accessToken}`,
      };
      console.log(headers);

      console.log(this.$route.params.id);
      this.stompClient.publish({
        destination: `/app/chat/public/${this.$route.params.id}`,
        body: JSON.stringify(message),
        headers: headers,
      });
      this.content = "";
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      const container = this.$el.querySelector(".msg_history");
      container.scrollTop = container.scrollHeight;
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="messaging">
      <div class="inbox_msg">
        <div class="mesgs">
          <div class="msg_history">
            <div
                v-for="(message, index) in messages"
                :key="index"
                :class="
                message.senderEmail === this.$store.state.loginedEmail
                  ? 'outgoing_msg'
                  : 'incoming_msg'
              "
            >
              <div
                  v-if="message.senderEmail !== this.$store.state.loginedEmail"
                  class="incoming_msg_info"
              >
                <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="user"
                    class="incoming_msg_img"
                />
                <span class="sender_name"  v-if="message.senderEmail !== this.$store.state.loginedEmail">{{ message.senderName }}</span>
              </div>
              <div
                  :class="
                  message.senderEmail === this.$store.state.loginedEmail
                    ? 'sent_msg'
                    : 'received_withd_msg'
                "
              >
                <p>{{ message.content }}</p>
                <span class="time_date">
                  {{ message.createTime }}
                </span>
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

.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}

.mesgs {
  float: none; /* 플로팅 해제 */
  padding: 30px 15px 0 25px;
  width: 500px;
  margin: auto; /* 수평 중앙 정렬 */
}

img {
  max-width: 40%;
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

.incoming_msg_info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.incoming_msg_img {
  width: 40px; /* 이미지 크기 조정 */
  height: 40px; /* 이미지 크기 조정 */
  margin-right: 10px;
}

.sender_name {
  font-weight: bold; /* 이름을 굵게 */
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
