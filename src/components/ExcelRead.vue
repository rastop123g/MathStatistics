<template>
  <div class="wrap">
  <div class="flexMain" id="excelRead">
    <div><h1 class="mainheader">Загрузка данных в Excel</h1></div>
    <div>
      <p>Данные в таблице должны находиться в строгом соответствии с правилами:</p>
      <p>1. Не допускайте пропуска столбцов, каждый столбец соответствует переменной</p>
      <p>2. Не допускайте пропуска строк, пустая строка соответствует концу данных</p>
      <p>3. Будьте внимательны при записи дробных чисел(убедитесь что вы используете правильный разделитель)</p>
    </div>
    <div><h6>Пример</h6></div>
    <div><img src="../assets/excexmp.png" alt=""></div>
    <div>
      <q-file
        v-model="fileExc"
        label="Выберите файл"
        filled
        style="max-width: 300px"
      >
        <template v-slot:prepend>
          <q-icon name="note_add" />
        </template>
      </q-file>
    </div>
    <div v-if="varsRead"><h6>Обнаружено {{vars}} признака</h6></div>
    <div v-if="varsRead">
      <q-input v-for="(label, idx) in nameVars" v-model="nameVars[idx]" :key="'namevar' + idx" :label="'Имя ' + (idx + 1) + ' Признака'" />
    </div>
    <div class="q-mt-sm">
      <q-btn @click="GoPrimaryProcessing" color="green-5" label="Продолжить" />
    </div>
  </div>
  </div>
</template>
<script>
import readXlsxFile from 'read-excel-file'

export default {
  data () {
    return {
      fileExc: null,
      dataset: null,
      vars: 0,
      nameVars: []
    }
  },
  computed: {
    varsRead () {
      return this.vars == 0 ? false : true
    }
  },
  watch: {
    fileExc() {
      this.loadfile(this.fileExc)
    }
  },
  methods: {
    loadfile (file) {
      readXlsxFile(file).then((rows) => {
        this.dataset = rows
        this.vars = rows[1].length
        for(let i = 0; i< this.vars ; i++) {
          this.nameVars.push('')
        }
      })
    },
    GoPrimaryProcessing() {
      let data = {};
      this.nameVars.forEach(el => {
        data[el] = []
      });
      this.dataset.forEach((row, idr) => {
        row.forEach((el, idv) => {
          data[this.nameVars[idv]][idr] = el
        })
      })
      this.$emit('next-step', {
        step: 'PrimaryProcessing',
        dataset: data
      })
    }
  }
}
</script>

<style lang="scss">

</style>