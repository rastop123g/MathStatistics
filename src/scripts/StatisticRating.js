export default class {
  constructor(dataset, results) {
    this.dataset = dataset
    this.results = results
    this.getvipi();
    this.getAverV();
    this.getVlossAverV();
    this.getVlossAverV2p()
    this.getVlossAverV3p()
    this.getVlossAverV4p()
    this.getMu2()
    this.getMu3()
    this.getMu4()
    this.getBiased()
    this.getUnBiased()
    this.getVariant()
    this.getModa()
    this.getMedian()
  }

  getvipi() {
    this.results.vipi = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.vipi[v] = []
      this.results.midIntervals[v].forEach((el, idv) => {
        this.results.vipi[v].push(el*this.results.relativeFreq[v][idv])
      })
    })
  }

  getAverV() {
    this.results.averV = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.averV[v] = 0
      this.results.vipi[v].forEach(el => {
        this.results.averV[v] += el;
      })
    })
  }

  getVlossAverV() {
    this.results.VlossAverV = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.VlossAverV[v] = []
      this.results.midIntervals[v].forEach((el) => {
        this.results.VlossAverV[v].push(el - this.results.averV[v])
      })
    })
  }

  getVlossAverV2p() {
    this.results.VlossAverV2p = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.VlossAverV2p[v] = []
      this.results.VlossAverV[v].forEach((el, idv) => {
        this.results.VlossAverV2p[v].push((el**2) * this.results.relativeFreq[v][idv])
      })
    })
  }

  getVlossAverV3p() {
    this.results.VlossAverV3p = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.VlossAverV3p[v] = []
      this.results.VlossAverV[v].forEach((el, idv) => {
        this.results.VlossAverV3p[v].push((el**3) * this.results.relativeFreq[v][idv])
      })
    })
  }

  getVlossAverV4p() {
    this.results.VlossAverV4p = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.VlossAverV4p[v] = []
      this.results.VlossAverV[v].forEach((el, idv) => {
        this.results.VlossAverV4p[v].push((el**4) * this.results.relativeFreq[v][idv])
      })
    })
  }

  getMu2() {
    this.results.Mu2 = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.Mu2[v] = 0
      this.results.VlossAverV2p[v].forEach(el => {
        this.results.Mu2[v] += el;
      })
    })
  }

  getMu3() {
    this.results.Mu3 = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.Mu3[v] = 0
      this.results.VlossAverV3p[v].forEach(el => {
        this.results.Mu3[v] += el;
      })
    })
  }

  getMu4() {
    this.results.Mu4 = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.Mu4[v] = 0
      this.results.VlossAverV4p[v].forEach(el => {
        this.results.Mu4[v] += el;
      })
    })
  }

  getBiased() {
    this.results.Dselect = {}
    this.results.sselect = {}
    this.results.Aselect = {}
    this.results.Eselect = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.Dselect[v] = this.results.Mu2[v]
      this.results.sselect[v] = Math.sqrt(this.results.Dselect[v])
      this.results.Aselect[v] = this.results.Mu3[v] / (this.results.sselect[v] ** 3)
      this.results.Eselect[v] = (this.results.Mu4[v] / (this.results.sselect[v] ** 4)) -3
    })
  }

  getUnBiased() {
    this.results.S2UnBiased = {}
    this.results.SUnBiased = {}
    this.results.AUnBiased = {}
    this.results.EUnBiased = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.S2UnBiased[v] = (this.results.n/(this.results.n-1)) * this.results.Dselect[v]
      this.results.SUnBiased[v] = Math.sqrt(this.results.S2UnBiased[v])
      this.results.AUnBiased[v] = (Math.sqrt(this.results.n*(this.results.n -1))/(this.results.n-2))*this.results.Aselect[v]
      this.results.EUnBiased[v] = ((this.results.n - 1)/((this.results.n -2)*(this.results.n -3))) *
        ((this.results.n+1) * this.results.Eselect[v] + 6)
    })
  }

  getVariant() {
    this.results.Varint = {}
    Object.keys(this.dataset).forEach(v => {
      this.results.Varint[v] = (this.results.SUnBiased[v] / this.results.averV[v]) * 100;
    })
  }

  getModa() {
    this.results.Moda = {}
    Object.keys(this.dataset).forEach(v => {
      let idv = 0;
      let maxFreq = 0;
      this.results.absoluteFreq[v].forEach((aF, id) => {
        if(aF>maxFreq) {
          idv = id;
          maxFreq = aF;
        }
      })
      this.results.Moda[v] = this.results.intervals[v][idv] + this.results.hv[v] * 
        ((this.results.absoluteFreq[v][idv] - this.results.absoluteFreq[v][idv-1]) / 
        ((this.results.absoluteFreq[v][idv] + this.results.absoluteFreq[v][idv-1]) + 
        (this.results.absoluteFreq[v][idv] - this.results.absoluteFreq[v][idv+1])))
    })
  }

  getMedian() {
    this.results.Median = {}
    Object.keys(this.dataset).forEach(v => {
      let id = 0;
      let err = this.results.n / 2
      this.results.accumFreq[v].forEach((el, idx) => {
        if(Math.abs(el - this.results.n/2) < err) {
          id = idx;
          err = Math.abs(el - this.results.n/2)
        }
      })
      this.results.Median[v] = this.results.intervals[v][id] + this.results.hv[v] *
        (((this.results.n/2) - this.results.accumFreq[v][id])/(this.results.absoluteFreq[v][id]))
    })
  }
}