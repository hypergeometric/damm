# damm

A JavaScript implementation of the Damm algorithm, a check digit algorithm
created by H. Michael Damm. It detects all single-digit errors and adjacent
transposition errors (swapping adjacent numbers). For more information see the
[Wikipedia article](https://en.wikipedia.org/wiki/Damm_algorithm) which includes
a description of the algorithm and links to the relevant papers.

## Example

```js
var damm = require('damm');

damm.generate('572'); // '4'

damm.append('572'); // '5724'

damm.verify('5724'); // true

// Single-digit error
damm.verify('5734'); // false

// Adjacent transposition error
damm.verify('5274'); // false
```
