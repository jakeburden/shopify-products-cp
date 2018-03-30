var hyperquest = require('hyperquest')
var JSONStream = require('JSONStream')
var through = require('through2')

module.exports = function (source, sink) {
  var output = through()

  var opts = {
    headers: {
      'content-type': 'application/json'
    }
  }

  var errs = {
    fulfillment_service: '{"errors":{"fulfillment_service":["is not defined for your shop"]}}'
  }

  hyperquest(source + '/admin/products.json')
    .pipe(JSONStream.parse('products.*'))
    .pipe(through.obj(write, end))

  return output

  function write (obj, enc, next) {
    if (!obj.title) return next()

    var post = hyperquest.post(sink + '/admin/products.json', opts)
    post.pipe(through(check)).pipe(output, {end: false})
    post.end(JSON.stringify({product: obj}))
    post.on('end', next)

    // check if fulfillment service isn't setup on duplicated site
    function check (buf, enc, next) {
      if (buf.toString() === errs.fulfillment_service) {
        obj.variants.forEach(function (variant, idx) {
          delete obj.variants[idx].fulfillment_service
        })
        write(obj, enc, next)
      } else next(null, buf)
    }
  }

  function end (next) {
    output.end()
    next()
  }
}
