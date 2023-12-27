<template>
  <div class="nav">
    <div class="navbar-title">
      <h2 class="title-text">ChatRoom</h2>
      <!-- <button>LEAVE</button> -->
    </div>
  </div>
</template>
<style>
.nav {
  height: 50px;
  width: 100%;
  background: #191718;
}
.navbar-title{
  background: #497ebf;
  width: 520px;
  height: 100%;
  
}
.title-text{
  color:rgb(236, 235, 235);
  text-align: center;
  line-height: 50px;
  font-size: 26px;
  margin: 5px auto;
}

@media screen and (min-width: 761px){
  .navbar-title{
    margin: 0 auto;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}
</style>