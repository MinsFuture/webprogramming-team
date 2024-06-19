<template>
  <div class="notification-container">
    <ToastComponent
      v-for="(notification, index) in notifications"
      :key="index"
      :message="notification"
    />
  </div>
</template>

<script>
import { EventSourcePolyfill } from "event-source-polyfill";
import ToastComponent from "./ToastComponent.vue";

export default {
  name: "NotificationComponent",
  components: {
    ToastComponent,
  },
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    addNotification(notification) {
      this.notifications.push(notification);
    },
    subscribeToNotifications() {
      console.log(
        "Subscribed to notifications: " + this.$store.state.accessToken
      );
      const eventSource = new EventSourcePolyfill(
        `http://localhost:8080/notification/subscribe`,
        { headers: { Accesstoken: this.$store.state.accessToken } }
      );
      eventSource.onmessage = (event) => {
        this.addNotification(event.data);
        console.log("onmessage: ", event.data);
      };

      eventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
        eventSource.close();
      };
    },
  },
  mounted() {
    this.subscribeToNotifications();
  },
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px;
  z-index: 1000;
}
</style>
