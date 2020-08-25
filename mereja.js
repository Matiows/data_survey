const kazna = require('dotenv')
const mongodb = require('mongodb')

kazna.config()

mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    module.exports = client.db()
    const apple = require('./apple')
    apple.listen(process.env.PORT)
})