const {expect} = require('chai');

const {AdjustingInterval} = require('..');
const {setInterval, clearInterval} = AdjustingInterval;


describe('AdjustingInterval', function () {

  describe('setInterval', function () {
    it('ok', function (done) {
      const timer = setInterval(() => {
        clearInterval(timer);
        done();
      }, 10);
    });
    it('args', function () {
      const timer = setInterval((...args) => {
        clearInterval(timer);
        expect(args[0]).to.be.equal('a');
        expect(args[1]).to.be.equal('b');
        done();
      }, 10, 'a', 'b');
    });
    describe('adjust with interval', function () {
      let start;
      beforeEach(function () {
        start = Date.now();
      });
      const tests = [
        {interval: 50, iterCriteria: 100, totalCriteria: 1, iterations: 100},
        {interval: 100, iterCriteria: 24, totalCriteria: 1, iterations: 10},
        {interval: 200, iterCriteria: 10, totalCriteria: 1, iterations: 10},
        {interval: 500, iterCriteria: 4, totalCriteria: 0.5, iterations: 10},
        {interval: 1000, iterCriteria: 1, totalCriteria: 0.2, iterations: 5},
      ];
      tests.forEach(({interval, iterCriteria, iterations, totalCriteria}) => {
        it(`${interval}`, function (done) {
          this.timeout(interval * (iterations+1));
          let index = 0;
          const timer = setInterval(() => {
            const diff = interval - ((Date.now() - start) - interval * index);
            const err = Math.abs(diff / interval) * 100;
            expect(err).to.be.below(iterCriteria, `iter#${index}, diff: ${diff} error: ${err}%`);
            index++;
            if (index === iterations) {
              clearInterval(timer);
              // validate overall drift
              const totalDuration = interval*iterations;
              const diff = totalDuration - (Date.now() - start);
              const err = Math.abs(diff / totalDuration) * 100;
              console.log(`Interval: ${interval}, Overall diff: ${diff} error: ${err}%`);
              expect(err).to.be.below(totalCriteria, `overall, diff: ${diff} error: ${err}%`);
              done();
            }
          }, interval);
        });
      });
    });
  });
});
