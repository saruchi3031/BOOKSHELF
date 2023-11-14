const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const error = require('./middlewares/errorMiddlewareHandler');
//const dbConnect = require('./config/dbConnect.js');
//const User = require('./models/User.js');
const usersRoute = require('./Routes/usersRoute.js');
const Book = require('./models/Book');
const bookRoutes = require('./Routes/bookRoutes');
dotenv.config();
//const bodyParser = require('body-parser');
const app = express();
// dbConnect();


// app.get("/",(req,res)=>{
//     res.send("Hello!");
// });
const PORT = process.env.PORT || 5000;
//app.use(bodyParser.json());
//Connect to DB
mongoose.connect(process.env.MONGODB_URL)
    .then(()=> console.log('Db Connected'))
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`server is up and running ${PORT}`);
        });
    }).catch((err) => console.log(err));  


// ben:JdHY4pi6oOzv8eok

 //console.log('Db connected');
//mongoose.connect('mongodb+srv://ben:JdHY4pi6oOzv8eok@cluster0.tfyjpiy.mongodb.net/',{
//    useFindAndModify: true,
//    useUnifiedTopology: true,
 //   useCreateIndex: true,
 //   useNewUrlParser: true,
//})
//.then(()=> console.log('DB connected'))
//.catch(err=>console.log(err));
// passing body data

app.use(express.json());
//routes
// Users
app.use('/api/users', usersRoute);
// Books
app.use('/api/books', bookRoutes)

//console.log(process.env);


// error middleware
app.use(error.errorMiddlewareHandler);
//server
//const PORT = process.env.PORT || 3000
