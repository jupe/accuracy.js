const {expect} = require('chai');

const {AdjustingInterval, FrequencyCounter} = require('..');
const {setInterval, clearInterval} = AdjustingInterval;

describe('FrequencyCounter', function () {
    describe('frequences', function () {
        let counter;
        beforeEach(function () {
            counter = new FrequencyCounter();
        });
        const tests = [
            {frequency: 100, n: 1, interval: 10, duration: 1000},
            {frequency: 1000, n: 10, interval: 10, duration: 2000},
            {frequency: 10000, n: 100, interval: 10, duration: 2000}
        ];
        tests.forEach(({frequency, n, interval, duration}) => {
            it(`${frequency}Hz`, function (done) {
                this.timeout(duration*2);
                const limits = frequency * 0.1;
                let timer = setInterval(() => counter.inc(n), interval);
                setTimeout(() => {
                    const freq = counter.freq();
                    clearInterval(timer);
                    // console.log(`Freq: ${freq}, limits: ${limits}`);
                    expect(freq).to.be.within(frequency-limits, frequency+limits);
                    done();
                }, duration);
            });
        });
    });
});
