const express = require('express');
const asynHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const authMiddleware = require('../middlewares/authMiddleware');


const usersRoute = express.Router();


//Register
usersRoute.post(
    '/register',
    asynHandler( async(req, res) => {
       const { name, email, password } = req.body;
       const userExists = await User.findOne({email: email});
       if(userExists){
        throw new Error('User Exist');
       }
       const userCreated = await User.create({email, name, password});
       res.json({
        _id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        password: userCreated.password,
        token: generateToken(userCreated._id),
    });
    })
);
 //        const user = await User.create({ name, email, password});
  //       console.log(user);
  //       res.send(user);
  //       //console.log(req.body)
  //   } catch (error) {
   //      res.send(error);
   //  }
    //res.send('Register route');

// });



//Login
usersRoute.post('/login', asynHandler(async(req, res)=> {
    const {email, password} = req.body;

    const user =await User.findOne({email: email});

    if(user && (await user.isPasswordMatch(password))){
        // set status code
        res.status(200);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: generateToken(user._id),
        });
    }else{
        res.status(401);
        throw new Error('Invalid credential');
    }
}));

//Update
usersRoute.put('/update', authMiddleware,asynHandler(async (req,res)=> {
    // find the login user by ID.
const user = await User.findById(req.user.id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password || user.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        });
    }else {
        res.status(401);
        throw new Error('User Not found');
      }
    
})
);
//Delete
usersRoute.delete('/:id',(req,res) => {
    res.send('Delete route');
});

//Fetch Users
usersRoute.get('/', authMiddleware, (req,res) => {
    console.log(req.headers);
    res.send(req.user);
});

module.exports = usersRoute;