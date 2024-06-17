<template>
  <transition name="fade">
    <div v-if="visible" class="toast">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "ToastComponent",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 3000); // 알림이 3초 동안 표시됨
    },
  },
  mounted() {
    this.show();
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
