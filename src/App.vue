<template>
  <div class="relative h-screen overflow-hidden">
    <Header />
    <div class="max-w-[1500px] h-[calc(100vh-90px)] flex m-auto">
      <Sidebar />
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";
import Footer from "./components/Footer.vue";

// var toTopButton = document.getElementById("topButton");

var date = new Date();

var month = date.getMonth() + 1;
if ('12|1|2|'.indexOf(month) > -1) {
  console.log('겨울이네요 눈이 내립니다! 헷');
  doYouWannaBuildaSnowMan();
}

// 눈내리는 효과를 주기위해...
function doYouWannaBuildaSnowMan() {
  const body = document.querySelector('body');

  const MIN_DURATION = 10;

  var count = 0;

  function makeSnowFlake() {
    const snowflake = document.createElement("div");
    const delay = Math.random() * 10;
    const initialOpacity = Math.random();
    const duration = Math.random() * 20 + MIN_DURATION;

    snowflake.classList.add('snowflake');
    snowflake.style.left = `${Math.random() * window.screen.width}px`
    snowflake.style.animationDelay = `${delay}s`;
    snowflake.style.opacity = initialOpacity;
    snowflake.style.animation = `fall ${duration}s linear`;

    body.appendChild(snowflake);

    setTimeout(() => {
      body.removeChild(snowflake);
      if (count <= 100) {
        makeSnowFlake();
      }
      count++;
    }, (duration + delay) * 1000);
  }

  for (let index = 0; index < 50; index++) {
      setTimeout(makeSnowFlake(), 500 * index);
  }
}

</script>

<style>
.snowflake {
  width: 8px;
  height: 8px;
  background-color: hsl(var(--in));
  border-radius: 50%;
  position: absolute;
  top: -8px;
}
@keyframes fall {
    from{}
    to{
      transform: translateY(100vh);
      opacity: 0;
    }
}
</style>