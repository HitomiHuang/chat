<template>
  <div class="main-view">
    <div class="main-input">
      <input
        type="text"
        class="mr-3"
        placeholder="input room name..."
        v-model="roomName"
         @keyup.enter="joinRoom"
      />
      <button class="btn btn-primary" @click="joinRoom">JOIN</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomName: "",
    };
  },
  methods: {
    joinRoom() {
       this.$router.push({ name: "chat-room", params:{ name : this.roomName} });
    },
  },
};
</script>
<style>
.main-view {
  height: 100%;
  padding-top: 150px;
}
.main-input {
  display: flex;
  justify-content: center;
}
</style>