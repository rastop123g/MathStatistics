<template>
  <div class="wrap">
    <div class="flexMain" id="ProbDistrib">
      <div><h1 class="mainheader">Нахождение по выборке закона распределения</h1></div>
      <div><h6>Расчетные параметры распределения</h6></div>
      <div>
        <q-table
        class="q-mt-md"
        v-for="label in Object.keys(dataset)" :key="label"
        :title="'Для ' + label"
        hide-bottom
        dense
        :pagination="{rowsPerPage: 0}"
        :rows="tables[label].rows"
        :columns="tables[label].columns"
        row-key="name"
      >
      </q-table>
      </div>
      <div><h6>Графики эмпирической функции распределения</h6></div>
      <div v-for="label in Object.keys(dataset)" :key="label">
        <h6>Для {{label}}</h6>
        <canvas :ref="'FChart'+label" width="400" height="400"></canvas>
      </div>
      <div><h6>Графики эмпирической плотности распределения</h6></div>
      <div v-for="label in Object.keys(dataset)" :key="label">
        <h6>Для {{label}}</h6>
        <canvas :ref="'fChart'+label" width="400" height="400"></canvas>
      </div>
      <div>
        <q-btn @click="GoStatisticRating" color="green-5" label="Продолжить" />
      </div>
    </div>
  </div>
</template>
<script>
import ProbDistrib from '../scripts/ProbDistrib.js'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  props: ['dataset', 'results'],
  data() {
    return {
      newResults: {},
      tables: {}
    }
  },
  methods: {
    GoStatisticRating() {
      this.$emit('next-step', {
        step: 'StatisticRating',
        results: this.newResults
      })
    },
    drawF() {
      Object.keys(this.dataset).forEach(v => {
        let cordata = []
        this.newResults.empiricFunctionDistrib[v].forEach((el,idx) => {
          cordata.push({
            x: this.newResults.midIntervals[v][idx],
            y: el
          })
        })
        const ctx = this.$refs['FChart'+v];
        new Chart(ctx, {
          type: 'scatter',
          data: {
              datasets: [{
                  label: 'График эмпирической функции',
                  data: cordata,
                  backgroundColor: 'rgb(19, 231, 83)'
              }]
          },
        });
      })
    },
    drawf() {
      Object.keys(this.dataset).forEach(v => {
        let cordata = {
          x: [],
          y: []
        }
        this.newResults.empiricDensityDistrib[v].forEach((el,idx) => {
          cordata.x.push(this.newResults.midIntervals[v][idx].toFixed(2))
          cordata.y.push(el)
        })
        const ctx = this.$refs['fChart'+v];
        new Chart(ctx, {
          type: 'bar',
          data: {
              labels: cordata.x,
              datasets: [{
                  label: 'График эмпирической плотности',
                  data: cordata.y,
                  backgroundColor: 'rgb(19, 231, 83)'
              }]
          },
        });
      })
    }
  },
  created() {
    this.newResults = this.results
    let pd = new ProbDistrib(this.dataset, this.results);
    this.newResults = pd.results
    Object.keys(this.dataset).forEach(v => {
      this.tables[v] = {}
      this.tables[v].columns = [
        {name: 'intervals', label: 'Интервал', field: 'intervals'},
        {name: 'midIntervals', label: v+'i', field: 'midIntervals'},
        {name: 'absoluteFreq', label: 'Абсолютная частота', field: 'absoluteFreq'},
        {name: 'relativeFreq', label: 'Относительная частота', field: 'relativeFreq'},
        {name: 'accumFreq', label: 'Накопленная частота', field: 'accumFreq'},
        {name: 'F', label: 'Эмперическая функция распределения', field: 'F'},
        {name: 'f', label: 'Эмперическая плотность распределения', field: 'f'}
      ]
      this.tables[v].rows = []
      this.results.midIntervals[v].forEach((el,idx) => {
        this.tables[v].rows.push({
          intervals: '(' + this.results.intervals[v][idx].toFixed(2) + ';' + this.results.intervals[v][idx+1].toFixed(2) + ')',
          midIntervals: el.toFixed(2),
          absoluteFreq: this.results.absoluteFreq[v][idx].toFixed(2),
          relativeFreq: this.results.relativeFreq[v][idx].toFixed(2),
          accumFreq: this.results.accumFreq[v][idx].toFixed(2),
          F: this.results.empiricFunctionDistrib[v][idx].toFixed(2),
          f: this.results.empiricDensityDistrib[v][idx].toFixed(2)
        })
      });
    })
  },
  mounted() {
    this.drawF()
    this.drawf()
  },
}
</script>
<style lang="scss">
  
</style>