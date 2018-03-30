require('env2')('.env')
var cp = require('./')

cp(process.env.SOURCE, process.env.SINK).pipe(process.stdout)
