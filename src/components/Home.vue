<template>
  <div>
    <div class="intro">
      <div id="mHblock">
        <h1 class="mainheader">Обработка статистических данных</h1> 
      </div>
      <div>
        <h6 class="text-center">Этап 1: Загрузите данные</h6>
        <p class="q-mb-sm">Выберете формат файла источника данных</p>
      </div>
      <div class="infbtn">
        <div>
        <q-btn @click="excelRead" color="green-5" label="Excel" />
        </div>
        <div>
        <q-btn color="white" text-color="black" label="txt" />
        </div>
        <div>
        <q-btn color="purple" label="csv" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    excelRead () {
      this.$emit('next-step', {
        step: 'excelRead'
      })
    }
  }
}
</script>

<style lang="css">
  h6 {
    margin: 0;
  }

  .mainheader {
    font-size: 28pt !important;
    text-align: center;
    color: #323232;
    margin: 0;
  }

  .infbtn {
    display: flex;
  }

  .infbtn > div {
    margin: 0 20px;
  }

  .intro {
    height: 100vh;
    width: 100%; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .q-btn {
    margin: 0 auto;
  }
</style>