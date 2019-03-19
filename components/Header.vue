<template>
  <div>
    <div id="parallax-container">
      <div v-for="(layer, index) in parallaxLayers" :key="index" :style="{ backgroundImage: `url(${layer})` }" />
    </div>
    <div id="title-container">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
import layer0 from '~/assets/img/layer0.jpg'
import layer1 from '~/assets/img/layer1.png'
import layer2 from '~/assets/img/layer2.png'
import layer3 from '~/assets/img/layer3.png'

export default {
  data() {
    return {
      parallaxLayers: [
        layer0,
        layer1,
        layer2,
        layer3
      ],
      title: 'The Ultimate Sports Quiz',
      description: 'Choose the correct answers from the questions below. Once done, press the Finish Quiz button at the bottom.'
    }
  }
}

window.addEventListener('scroll', () => {
  const parent = document.getElementById('parallax-container')
  const children = parent.getElementsByTagName('div')
  for (let i = 0; i < children.length; i++) {
    children[i].style.transform = 'translateY(-' + (window.pageYOffset * i / children.length) + 'px)'
  }
}, false)
</script>

<style lang="less" scoped>
  @wide-screen-down: ~'(max-width: 1199px)';
  @desktop-down: ~'(max-width: 991px)';
  @tablet-down: ~'(max-width: 767px)';
  @phone-down: ~'(max-width: 480px)';
  @small-phone-down: ~'(max-width: 320px)';

  #parallax-container {
    display: block;
    height: 600px;
    @media @desktop-down { height: 200px; }
    @media @tablet-down { height: 150px; }

    div {
      position: fixed;
      top: 0;
      background-position: center !important;
      transform: translateY(0px);
      height: 600px;
      width: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      @media @desktop-down { height: 200px;}
      @media @tablet-down { height: 150px;}
    }
  }

  #title-container {
    position: relative;
    background-color: #01244E;
    color: #ffffff;
    padding: 100px;
    @media @tablet-down { padding: 50px;}

    h1 {
      font-size: 40px;
      text-align: center;
      font-family: 'Noto Sans', serif;
      text-transform: uppercase;

      @media @tablet-down { font-size: 20px;}
    }

    p {
      text-align: center;
      padding-top: 20px;
      font-size: 18px;
      @media @tablet-down { font-size: 14px;}
      max-width: 600px;
      margin: 0 auto;
    }
  }
</style>
