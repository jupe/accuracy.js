## accuracy.js



High resolution time tools

### `AdjustingInterval`

Provide setInterval() replacement but with much better accuracy.


Example:
```javascript
const Accuracy = require('accuracy.js');
const {setInterval} = Accuracy.AdjustingInterval;
setInterval(() => console.log(new Date()), 1000);
```


### `FrequencyCounter`

Frequency counter between two points.

```javascript
const {FrequencyCounter} = require('accuracy.js');
const counter = new FrequencyCounter();

counter.inc();
counter.freq();
```
