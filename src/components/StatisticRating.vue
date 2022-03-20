<template>
  <div class="wrap">
    <div class="flexMain">
      <div><h6 class="mainheader">Статистические точечные оценки основных харакеристик генеральной совокупности</h6></div>
      <h6>Смещенные оценки генеральных параметров</h6>
      <div class="customRows">
        <div class="liblock" v-for="label in Object.keys(dataset)" :key="label">
          <h6 class="q-ml-lg">Для {{label}}</h6>
          <ol>
            <li>Выборочое среднее: {{newResults.averV[label].toFixed(2)}}</li>
            <li>Выборочная дисперсия D<sub>в</sub>: {{newResults.Dselect[label].toFixed(2)}}</li>
            <li>Выборочное среднеквадратическое отклонение &#963;<sub>в</sub>: {{newResults.Dselect[label].toFixed(2)}}</li>
            <li>Выборочная ассиметрия A<sub>в</sub>: {{newResults.Aselect[label].toFixed(2)}}</li>
            <li>Выборочный эксцесс E<sub>в</sub>: {{newResults.Eselect[label].toFixed(2)}}</li>
          </ol>
        </div>
      </div>
      <h6>Несмещенные оценки генеральных параметров</h6>
      <div class="customRows">
        <div class="liblock" v-for="label in Object.keys(dataset)" :key="label">
          <h6 class="q-ml-lg">Для {{label}}</h6>
          <ol>
            <li>Несмещенной среднее: {{newResults.averV[label].toFixed(2)}}</li>
            <li>Несмещенная дисперсия S<sup>2</sup>: {{newResults.S2UnBiased[label].toFixed(2)}}</li>
            <li>Несмещенное среднеквадратическое отклонение S: {{newResults.SUnBiased[label].toFixed(2)}}</li>
            <li>Несмещенная ассиметрия A<sup>*</sup>: {{newResults.AUnBiased[label].toFixed(2)}}</li>
            <li>Несмещенный эксцесс E<sup>*</sup>: {{newResults.EUnBiased[label].toFixed(2)}}</li>
          </ol>
        </div>
      </div>
      <h6>Коэффициент вариации</h6>
      <div class="customRows">
        <div style="min-width: 150px" class="liblock" v-for="label in Object.keys(dataset)" :key="label">
          <h6 class="q-ml-lg">Для {{label}}</h6>
          <p>V<sub>{{label}}</sub> = {{newResults.Varint[label].toFixed(1)}}%</p>
        </div>
      </div>
      <h6>Мода и медиана</h6>
      <div class="customRows">
        <div style="min-width: 150px" class="liblock" v-for="label in Object.keys(dataset)" :key="label">
        <p>Для {{label}}</p>
        <p>Мода M<sub>0</sub><sup>*</sup> = {{newResults.Moda[label].toFixed(2)}}</p>
        <p>Медиана M<sub>e</sub><sup>*</sup> = {{newResults.Median[label].toFixed(2)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticRating from '../scripts/StatisticRating.js'

export default {
  props: ['dataset', 'results'],
  data() {
    return {
      newResults: {}
    }
  },
  created() {
    let sr = new StatisticRating(this.dataset, this.results)
    this.newResults = sr.results;
  }
}
</script>

<style lang="scss">
  .customRows {
    display: flex;
    justify-content: center;
  }

  .liblock{ 
    max-width: 40%;
    word-wrap: break-word;
  }
</style>