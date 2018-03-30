# shopify-products-cp

> Copy Shopify products from a source site to duplicate (sink) site.

## Usage

```js
var cp = require('shopify-products-cp')

// Replace these strings with the API keys, passwords, and URIs for your stores. 
var source = 'https://APIKey:Password@source.myshopify.com'
var sink = 'https://APIKey:Password@sink.myshopify.com'

cp(source, sink).pipe(process.stdout)
```

outputs

```
{"product":{"id":1234,"title":"a cool title","body_html":"<div>example</div>"...
// streaming responses from all POST requests
```

Makes a GET request to the source site's shopify products api endpoint, and then makes POST requests to the duplicate shopify site to upload those products.

This module uses streams for parsing and making requests, so theoretically the amount of products this could handle is infinite. Each POST, however, will happen one at a time to help prevent rate limiting or other possible network throttles that can occur when opening a large number of connections at a time. The return value is a stream of responses from each POST request.

## Errors Handled For You

If your source site has products with fulfilment services, `shopify-products-cp` will try to copy that fulfilment service data over for each indivudal product.  However, if your duplicate site doesn't have a fulfilment service, shopify responds with an error. This module checks for that error for you. If that error occurs, this module will re-POST the product without its fulfilment service data to the duplicate site.

## Auth

You'll need an API Key and Password associated with a Shopify private app.  To make a private app go to: https://[yoursitehere].myshopify.com/admin/apps/private

## API

### cp

```js
var cp = require('shopify-products-cp')
```

### cp(SOURCE, SINK)
- SOURCE [string]: 'https://APIKey:Password@source.myshopify.com'
- SINK [string]: 'https://APIKey:Password@sink.myshopify.com'

```js
cp(source, sink)
```

### stream = cp(SOURCE, SINK)
```js
var stream = cp(source, sink)
stream.pipe(process.stdout)
```

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install shopify-products-cp
```

## See Also
- [shopify-pages-cp](https://github.com/jekrb/shopify-pages-cp)

## License


The MIT License (MIT)

Copyright (c) 2018 Jake Burden

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


