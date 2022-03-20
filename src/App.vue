<template>
  <div>
    <div class="bg">
      <div class="bluer">
        <transition mode="out-in" name="component-fade">
          <component :dataset="dataset" :results="results" v-on:next-step="nextStep" :is="Ccomp"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import ExcelRead from './components/ExcelRead.vue'
import PrimaryProcessing from './components/PrimaryProcessing.vue'
import ProbDistrib from './components/ProbDistrib.vue'
import StatisticRating from './components/StatisticRating.vue'

export default {
  name: 'App',
  data () {
    return {
      Ccomp: Home,
      dataset: {},
      results: {}
    }
  },
  methods: {
    nextStep(data) {
      if(data.step == "excelRead") {
        this.Ccomp = ExcelRead
      } else if(data.step == 'PrimaryProcessing') {
        this.dataset = data.dataset
        this.Ccomp = PrimaryProcessing
      } else if(data.step == 'ProbDistrib') {
        this.results = data.results
        this.Ccomp = ProbDistrib;
      } else if(data.step == 'StatisticRating') {
        this.results = data.results
        this.Ccomp = StatisticRating;
      }
    }
  },
  components: {
    Home,
    ExcelRead,
    PrimaryProcessing,
    ProbDistrib,
    StatisticRating
  }
}
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.wrap {
    overflow-y: scroll;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    padding: 40px 0;
  }

  .flexMain {
    background-color: white;
    box-shadow: 0px 0px 4px black;
    height: max-content !important;
    margin: 0 auto;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 90%;
    overflow-x: auto;
  }

.flexMain>div{
  max-width: 100%;
}

.bg {
    height: 100vh;
    background-image: url('assets/charts.jpg');
    background-size: cover;
    /* overflow-y: scroll; */
    overflow: hidden;
  }

.bluer {
  height: 100vh;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(3px);
  display: flex;
  /* align-items: center; */
  justify-content: center;
  overflow-y: hidden;
}

.mainheader {
    font-size: 28pt !important;
    text-align: center;
    color: #323232;
    margin: 0;
  }
</style>