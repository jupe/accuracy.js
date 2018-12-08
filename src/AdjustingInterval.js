const {EventEmitter} = require('events');


class AdjustingInterval extends EventEmitter {
  /**
   * Self-adjusting interval to account for drifting.
   * Inherits EventEmitter. Error event is sent if driftining goes over limits.
   *
   * @param {Function} handler  Callback containing the work to be done
   *                             for each interval
   * @param {Number}      interval  Interval speed (in milliseconds)
   */
  constructor(handler, interval = 1000) {

    super();
    this._expected = undefined;
    this._timeout = undefined;
    this.interval = interval;
    this._workFunc = handler;
    this._step = this._step.bind(this);
    // TODO: better estimate for next tick..
    //this._windowSize = 10;
    //this._driftHistory = new Uint32Array(this._windowSize).fill(0)
    //this._index = 0;
    this.start();
  }
  start() {
    /**
     * Start timer
     */
    this.stop();
    this._expected = Date.now() + this.interval;
    this._timeout = setTimeout(this._step, this.interval);
  }

  stop() {
    /**
     * Stop timer
     */
    clearTimeout(this._timeout);
  }

  _step() {
    const drift = Date.now() - this._expected;
    if (drift > this.interval) {
      const error = new Error(`Drift was more than interval: ${drift} > ${interval}`);
      this.emit('error', error);
    }
    this._workFunc(drift);
    this._expected += this.interval;
    const after = Math.max(0, this.interval - drift);
    this._timeout = setTimeout(this._step, after);
  }

  /**
   * native setInterval() replacement function
   * @param {Function} handler
   * @param {Number} interval
   * @return {AdjustingInterval}
   */
  static setInterval(handler, interval) {
    return new AdjustingInterval(handler, interval);
  }
  /**
   * Native clearInterval() replacement function
   * @param {AdjustingInterval} timer
   * @return undefined
   */
  static clearInterval(timer) {
    if (!(timer instanceof AdjustingInterval)) {
      throw new Error('timer should be an AdjustingInterval instance');
    }
    timer.stop();
  }
}

module.exports = AdjustingInterval;
