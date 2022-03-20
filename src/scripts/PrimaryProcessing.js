export default class {
  constructor(dataset) {
    this.dataset = dataset;
    this.results = {}
    this.results.n = this.dataset[Object.keys(this.dataset)[0]].length
    this.results.r = Math.trunc(1 + 3.2 * Math.log10(this.results.n))
    this.minmax()
    this.getRv()
    this.gethv()
    this.getIntervals()
    this.getMidIntervals()
    this.getabsolutFreq()
  }

  minmax() {
    this.results.minmax = {}
    Object.keys(this.dataset).forEach(el => {
      this.results.minmax[el] = {
        min: Math.min(...this.dataset[el]),
        max: Math.max(...this.dataset[el])
      }
    })
  }

  getRv() {
    this.results.Rv = {}
    Object.keys(this.dataset).forEach(el => {
      this.results.Rv[el] = this.results.minmax[el].max - this.results.minmax[el].min
    })
  }

  gethv() {
    this.results.hv = {}
    Object.keys(this.dataset).forEach(el => {
      this.results.hv[el] = this.results.Rv[el] / this.results.r
    })
  }

  getIntervals() {
    this.results.intervals = {}
    Object.keys(this.dataset).forEach(el => {
      this.results.intervals[el] = []
      let first = this.results.minmax[el].min - this.results.hv[el] / 2
      this.results.intervals[el].push(first)
      let prev = first
      let curr = prev;
      while(curr < this.results.minmax[el].max) {
        curr = prev + this.results.hv[el]
        this.results.intervals[el].push(curr)
        prev = curr
      }
    })
  }

  getMidIntervals() {
    this.results.midIntervals = {}
    Object.keys(this.dataset).forEach(el => {
      this.results.midIntervals[el] = []
      this.results.intervals[el].forEach((leftval,idx) => {
        if(idx == this.results.intervals[el].length - 1) {
          return
        }
        this.results.midIntervals[el].push((leftval + this.results.intervals[el][idx+1]) / 2)
      })
    })
  }

  getabsolutFreq() {
    this.results.absoluteFreq = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.absoluteFreq[v] = []
      this.results.intervals[v].forEach((left, idx) => {
        if(idx == this.results.intervals[v].length -1) return;
        let cnAbsolut = 0
        let right = this.results.intervals[v][idx+1]
        this.dataset[v].forEach(value => {
          if((value >= left) && (value < right)) {
            cnAbsolut += 1;
          }
        })
        this.results.absoluteFreq[v].push(cnAbsolut)
      })
    })
  }
}