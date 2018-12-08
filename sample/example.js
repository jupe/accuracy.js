const {AdjustingInterval, FrequencyCounter} = require('..');
const {setInterval} = AdjustingInterval;


const counter = new FrequencyCounter();
setInterval(() => counter.inc(), 100);
setInterval((drift) => console.log(`Freq: ${counter.freq().toFixed(5)} Hz, drift: ${drift}`), 2000);


setInterval(() => console.log(new Date()), 1000);
