const NS_PER_SEC = 1e9;

class FrequencyCounter {
  constructor() {
    this._counts = 0;
    this._hrtime = FrequencyCounter.hrtime;
  }
  inc(n = 1) {
    this._counts += n;
  }
  freq() {
    const now = FrequencyCounter.hrtime;
    const diff = (now - this._hrtime) / NS_PER_SEC;
    const freq = this._counts / diff;
    this._counts = 0;
    this._hrtime = now;
    return freq;
  }
  static get hrtime() {
    const [seconds, nanoseconds] = process.hrtime();
    return (seconds * NS_PER_SEC) + nanoseconds;
  }
}

module.exports = FrequencyCounter;
