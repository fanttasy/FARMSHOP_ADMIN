<!-- 404 -->
<template>
  <div class="notfound-container">
    <video src="backgroundVide" autoplay muted loop></video>
    <div class="notfound-content">
      <div class="notfound-title">
        404
      </div>
      <div class="notfound-text">
        Oops! the page you were looking for doesn't seem to exist anymore.you can do this...
      </div>
      <div class="notfound-button-box">
        <div class="notfound-button" @click="toLinkHome">
          home
        </div>
          or
        <div class="notfound-button" @click="toLinkBack">
          back
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      backgroundVide: require('../assets/video/flow_in_the_sky.mp4')
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    toLinkHome() {
      window.sessionStorage.setItem('activePath', '/home/mainpage')
      this.$store.commit('saveMenuStatusVuex', window.sessionStorage.getItem('activePath'))
      this.$router.replace('/home/mainpage')
    },
    toLinkBack() {
      this.$router.back()
    }
  }
}

</script>
<style lang='css' scoped>
  .notfound-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Kristen ITC';
  }
  .notfound-container video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .notfound-content {
    color: #fff;
    width: 404px;
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  .notfound-title {
    font-size: 72px;
    letter-spacing: .1em;
    text-align: center;
  }
  .notfound-text {
    font-size: 16px;
    line-height: 24px;
    text-align: center;
  }
  .notfound-button-box {
    display: flex;
    width: 304px;
    justify-content: space-around;
    margin-top: 17px;
    font-size: 16px;
    line-height: 32px;
  }
  .notfound-button {
    border: 1px solid #fff;
    width: 100px;
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
    transition: opacity 1s;
  }
  .notfound-button:hover {
    opacity: 0.2;
  }
</style>