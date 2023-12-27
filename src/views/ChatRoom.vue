<template>
  <div class="chat-room-view" v-if="userName">
    <div class="container messages-container pt-3">
      <div v-for="(message, index) in messages" :key="message.id">
        <div class="message-style">
          <div class="message-send-user" v-if="isSameUser(index)">
            {{ message.sendUser | getAlpha }}
          </div>
          <div v-else class="message-send-user-fake"></div>
          <div class="message-send-message">
            <div class="send-message">{{ message.message }}</div>
            <div class="send-time">
              {{ message.sendTime | sendTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="input-container">
      <input
        type="text"
        class="input-area mr-3 ml-3"
        v-model="inputText"
        @keyup.enter="sendMessage"
      />
      <button class="btn btn-primary button-color mr-2" @click="sendMessage">
        <i class="fa-regular fa-paper-plane"></i>
      </button>
      <button class="btn btn-primary button-color mr-3" @click="deleteMessage">+</button>
    </div>
  </div>
  <div class="main-view" v-else>
    <div class="main-input">
      <input
        type="text"
        class="mr-3"
        placeholder="input your name..."
        v-model="userNameInput"
        @keyup.enter="enterChat"
      />
      <button class="btn btn-primary" @click="enterChat">ENTER</button>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import messageAPI from '../../apis/messages'

export default {
  data() {
    return {
      name: "",
      userNameInput: "",
      userName: "",
      inputText: "",
      messages: [],
      socketInstance: null,
    };
  },
  created() {
    const { name } = this.$route.params;
    this.initRoom(name);
    this.fetchMessages();
    this.connect();
  },
  beforeRouteUpdate(to, from, next) {
    const { name } = to.params;
    this.initRoom(name);
    this.fetchMessages();
    next();
  },
  beforeDestroy() {
    this.disconnect();
  },
  watch: {
    userName(newValue) {
      this.userName = newValue;
    },
  },
  methods: {
    fetchMessages(messages) {
      this.messages = messages || [];
    },
    isSameUser(index) {
      return (
        (index > 0 &&
          this.messages[index].sendUser !==
            this.messages[index - 1].sendUser) ||
        index === 0
      );
    },
    initRoom(name) {
      this.name = name;
      this.userName = localStorage.getItem("UserName")
        ? localStorage.getItem("UserName")
        : "";
    },
    enterChat() {
      localStorage.setItem("UserName", this.userNameInput);
      this.fetchUserName();
    },
    connect() {
      this.socketInstance = io("http://localhost:3000");

      this.socketInstance.emit("join", {
        roomName: this.name,
        sendUser: this.userName,
      });

      this.socketInstance.on("person joined", (data) => {
        this.fetchMessages(data.historyMessages)
      });

      this.socketInstance.on("message:recieved", (data) => {
        this.messages.push(data);
      });
    },
    disconnect() {
      this.socketInstance.disconnect();
    },
    sendMessage() {
      if (this.inputText) {
        const data = {
          id: uuidv4(),
          roomName: this.name,
          sendUser: this.userName,
          message: this.inputText,
          sendTime: new Date(),
        };

        this.socketInstance.emit("message", data);
        this.inputText = "";
      }
    },
    async deleteMessage(){
      const result = await messageAPI.deleteMessages()
      this.messages = []
      console.log(result)
    }
  },
  filters: {
    getAlpha(name) {
      return name?.substring(0, 1);
    },
    fromNow(datetime) {
      if (!datetime) return "-";
      return moment(datetime).fromNow();
    },
    sendTime(datetime) {
      if (!datetime) return "-";
      return moment(datetime).format("HH:mm");
    },
  },
};
</script>
<style>
.chat-room-view {
  height: 100%;
  display: flex;
  justify-content: center;
}
.messages-container {
  height: calc(100vh - 108px);
  overflow-y: auto;
}

.input-container {
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 10px;
}
.input-area {
  height: 32px;
  width: 100%;
  resize: none;
  outline: none;
  border: 0;
  background: rgb(40, 39, 39);
  border-radius: 50px;
  padding: 5px 15px;
  font-size: 16px;
  line-height: 18px;
  color: #828688;
}
.message-style {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.message-send-user {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #8c9093;
  color: rgb(195, 195, 195);
  line-height: 30px;
  text-align: center;
}
.message-send-user-fake {
  width: 30px;
  background: #191718;
}
.button-color {
  color: rgb(236, 235, 235);
  background: #497ebf;
}
.message-send-message {
  width: 100%;
  border-radius: 3px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 10px;
  padding-left: 5px;
  background: rgb(40, 39, 39);
  color: #828688;
  display: flex;
}
.send-message {
  flex: 4;
}
.send-time {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-self: end;
  padding-left: 10px;
  padding-right: 5px;
}

@media screen and (min-width: 761px) {
  .input-container {
    width: 60%;
  }
}
</style>