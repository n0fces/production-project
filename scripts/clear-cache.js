const { rm } = require('fs');

rm('./node_modules/.cache', { recursive: true }, () => console.log('cleared'));