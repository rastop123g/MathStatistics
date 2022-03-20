<template>
<div class="wrap">
  <div class="flexMain" id="PrimaryProcessing">
    <div>
      <h1 class="mainheader">Первичная обработка эксперементальных данных</h1>
    </div>
    <div>
      <h6>1. Минимум и максимум каждой выборочной совокупности</h6>
    </div>
    <div>
      <p v-for="label in Object.keys(newResults.minmax)" :key="label">
        {{label}} <sub>min</sub> = {{newResults.minmax[label].min}} , 
        {{label}} <sub>max</sub> = {{newResults.minmax[label].max}}
      </p>
    </div>
    <div>
      <h6>2. Размах варьирования</h6>
    </div>
    <div>
      <p v-for="label in Object.keys(newResults.Rv)" :key="label">
        R <sub>{{label}}</sub> = {{newResults.Rv[label].toFixed(2)}}
      </p>
    </div>
    <div><h6>3. Количество интервалов r</h6></div>
    <div><p>r = {{newResults.r}}</p></div>
    <div><h6>4. Длины интервалов</h6></div>
    <div><p v-for="label in Object.keys(newResults.hv)" :key="label">
      h <sub>{{label}}</sub> = {{newResults.hv[label].toFixed(2)}}
      </p></div>
    <div><h6>5. Границы интервалов</h6></div>
    <div>
      <p v-for="label in Object.keys(newResults.intervals)" :key="label">
        {{label}}: {{PrintIntervals(label)}}
      </p>
    </div>
    <div><h6>6. Кореляционное поле</h6></div>
    <div id="pickVars">
      <p>Выберите переменные:</p>
      <q-select class="sVar" v-model="picks.x" :options="vars" label="Ось X" />
      <q-select class="sVar" v-model="picks.y" :options="vars" label="Ось Y" />
    </div>
    <div>
      <canvas ref="chart" id="correlarea" width="400" height="400"></canvas>
    </div>
    <div><h6>7. Середины интервалов</h6></div>
    <div>
      <p v-for="label in Object.keys(newResults.midIntervals)" :key="label">
        {{label}}: {{PrintMidIntervals(label)}}
      </p>
    </div>
    <div><h6>8. Одномерное статистическое распределение</h6></div>
    <div class="q-pa-md">
      <q-table
        class="q-mt-md"
        v-for="label in Object.keys(newResults.midIntervals)" :key="label"
        :title="'Вариационный ряд признака ' + label"
        hide-bottom
        :rows="freqTables[label].rows"
        :columns="freqTables[label].columns"
        row-key="name"
      >
      </q-table>
    </div>
    <div>
      <q-btn @click="GoProbDistrib" color="green-5" label="Продолжить" />
    </div>
  </div>
</div>
</template>
<script>
import PrimaryProcessing from '../scripts/PrimaryProcessing.js'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  props: ['dataset', 'results'],
  data() {
    return {
      newResults: {
        minmax: {},
        Rv: {},
        hv: {},
        intervals: {},
        midIntervals: {},
        absoluteFreq: {}
      },
      freqTables: {},
      vars: [],
      picks: {
        x: Object.keys(this.dataset)[0],
        y: Object.keys(this.dataset)[1]
      },
      chart: undefined
    }
  },
  methods: {
    GoProbDistrib() {
      this.$emit('next-step', {
        step: 'ProbDistrib',
        results: this.newResults
      })
    },
    PrintIntervals(label) {
      let str = ''
      this.newResults.intervals[label].forEach((el, idx) => {
        str += '[' + idx+ ']' + ' = ' + el.toFixed(3)
        str += idx == this.newResults.intervals[label].length -1 ? '' : ', '
      });
      return str
    },
    PrintMidIntervals(label) {
      let str = ''
      this.newResults.midIntervals[label].forEach((el, idx) => {
        str += '[' + idx + '-' + (idx+1)+ ']' + ' = ' + el.toFixed(3)
        str += idx == this.newResults.midIntervals[label].length -1 ? '' : ', '
      });
      return str
    },
    draw() {
      if(this.chart != undefined) {
        this.chart.destroy()
      }
      let cordata = []
      this.dataset[this.picks.x].forEach((el, idx) => {
        cordata.push({
          x:el,
          y:this.dataset[this.picks.y][idx]
        })
      })
      const ctx = this.$refs.chart;
      this.chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Корреляционное поле',
                data: cordata,
                backgroundColor: 'rgb(19, 231, 83)'
            }]
        },
        options: {
            scales: {
                x: {
                  min: this.newResults.intervals[this.picks.x][0],
                  ticks: {
                    stepSize: this.newResults.hv[this.picks.x]
                  }
                },
                y: {
                  min: this.newResults.intervals[this.picks.y][0],
                  ticks: {
                    stepSize: this.newResults.hv[this.picks.y]
                  }
                },
            }
        }
      });
    }
  },
  created() {
    let pp = new PrimaryProcessing(this.dataset)
    this.newResults = pp.results
    this.vars = Object.keys(this.dataset)
    Object.keys(this.newResults.absoluteFreq).forEach(v => {
      this.freqTables[v] = {
        columns: [],
        rows: []
      }
      this.freqTables[v].columns.push({
          name: v+'i',
          label: v+'i',
          field: v+'i'
      })
      this.freqTables[v].rows.push({})
      this.freqTables[v].rows[0][v+'i'] = 'ni'
      this.newResults.absoluteFreq[v].forEach((el,idx) => {
        if(idx == this.newResults.absoluteFreq[v].length - 1) return;
        this.freqTables[v].columns.push({
          name: v+(idx+1),
          label: v+(idx+1),
          field: v+(idx+1)
        })
        this.freqTables[v].rows[0][v+(idx+1)] = el
      })
    })
  },
  mounted() {
    this.draw()
  },
  watch: {
    picks: {
      handler () {
        this.draw()
      },
      deep:true
    }
  }
}
</script>
<style lang="scss">
  #pickVars {
    display: flex;
    justify-content: space-around;
    align-items: baseline;
  }

  .sVar {
    margin-left: 20px;
    min-width: 90px;
  }
</style>