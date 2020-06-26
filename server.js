import mongoose from 'mongoose'
import config from './server/config/config'
import app from './server/express'

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})


app.listen(config.port, (err) => {
    if (err) {
        console.log(err)  
    }  
    console.info('Server started on port %s.', config.port) 
})