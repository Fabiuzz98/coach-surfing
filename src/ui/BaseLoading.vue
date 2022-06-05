<template>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
    <h2>
      <slot> </slot>
    </h2>
  </div>
</template>

<style scoped>
.loader {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader span {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border: 2px solid #404255;
  pointer-events: none;
  animation: animate 5s linear infinite;
}
.loader span:nth-child(1) {
  border-radius: 38% 62% 64% 36% / 43% 35% 65% 57%;
}
.loader span:nth-child(2) {
  animation-direction: reverse;
  border-radius: 41% 59% 40% 60% / 65% 66% 34% 35%;
}
.loader span:nth-child(3) {
  animation-duration: 3s;
  border-radius: 73% 27% 56% 44% / 57% 74% 26% 43%;
}
@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
h2 {
  color: #404255;
  font-weight: 500;
  font-family: consolas;
}
</style>
