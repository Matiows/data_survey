const dotenv = require('dotenv')
const mongodb = require('mongodb')

dotenv.config()

mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    module.exports = client
    const apple = require('./apple')
    apple.listen(process.env.PORT)
})