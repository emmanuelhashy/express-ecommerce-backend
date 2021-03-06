import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import vendorRoutes from './routes/vendor.routes'
import adminRoutes from './routes/admin.routes'
import shopRoutes from './routes/shop.routes'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', vendorRoutes);
app.use('/', adminRoutes);

app.use('/', shopRoutes);


app.get('/', (req, res) => { 
    res.status(200).send({message: "Welcome to my app"}) 
}) 


// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
      res.status(400).json({"error" : err.name + ": " + err.message})
      console.log(err)
    }
})
export default app;