export default class {
  constructor(dataset, results) {
    this.dataset = dataset
    this.results = results
    this.getRelativeFreq()
    this.getAccumFreq()
    this.getEmpiricFunctionDistrib()
    this.getEmpiricDensityDistrib()
  }

  getRelativeFreq() {
    this.results.relativeFreq = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.relativeFreq[v] = []
      this.results.absoluteFreq[v].forEach(aF => {
        this.results.relativeFreq[v].push(aF/this.results.n)
      })
    })
  }

  getAccumFreq() {
    this.results.accumFreq = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.accumFreq[v] = []
      let accum = 0
      this.results.absoluteFreq[v].forEach(aF => {
        accum += aF
        this.results.accumFreq[v].push(accum)
      })
    })
  }

  getEmpiricFunctionDistrib() {
    this.results.empiricFunctionDistrib = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.empiricFunctionDistrib[v] = []
      this.results.accumFreq[v].forEach(aF => {
        this.results.empiricFunctionDistrib[v].push(aF/this.results.n)
      })
    })
  }

  getEmpiricDensityDistrib() {
    this.results.empiricDensityDistrib = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.empiricDensityDistrib[v] = []
      this.results.relativeFreq[v].forEach(aF => {
        this.results.empiricDensityDistrib[v].push(aF/this.results.hv[v])
      })
    })
  }
}