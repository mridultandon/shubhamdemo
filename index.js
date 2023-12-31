//testagain
const express = require('express')
var compression = require('compression')
const app = express()
const port = process.env.PORT||3000


const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses if this request header is present
      return false;
    }
  
    // fallback to standard compression
    return compression.filter(req, res);
  };

app.use(compression({
  // filter decides if the response should be compressed or not,
  // based on the `shouldCompress` function above
  filter: shouldCompress,
  // threshold is the byte threshold for the response body size
  // before compression is considered, the default is 1kb
  threshold: 0
}));

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello Vele!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
