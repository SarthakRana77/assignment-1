const path = require('path');
const ejs=require('ejs');
const  mongoose=require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const MongoDBStore = require('connect-mongodb-session');
const dotenv = require('dotenv').config();
const helmet=require('helmet');
const compression=require('compression');
const MONGODB_URI =
`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zhn1peh.mongodb.net/?retryWrites=true&w=majority`;
  const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
const Routes = require('./routes/firstpageRoute');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(Routes);
app.get('/maxbilling',(req,res,next)=>{
  res.status(200).render('maxbill',{
    path:"/maxbilling"
  });
});
const maxroute=require('./routes/maxcli');
app.use(maxroute);
app.use(errorController.get404);
app.use(helmet());
app.use(compression());
mongoose
  .connect(MONGODB_URI)
  .then(result => {
   app.listen(process.env.PORT || 5000);
   
    })
  .catch(err => {
    console.log(err);
  });
