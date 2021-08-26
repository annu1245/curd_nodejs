const express = require('express');
const User = require('../models/user');

var router = express.Router();

//display home page
router.get('/add_user', function(req, res) {
    res.render('home');
  });

//add user to database
  router.post('/user/add', async (req,res) => {
    var user = new User({
        name : req.body.uname,
        question : req.body.uquestion
    }) 
    
    try{
        const dt = await user.save();
        res.redirect('/');
    }
    catch{
    console.log(req.body);
    }
});

//display all users

router.get('/', (req,res) => {
    User.find({}, (err,users)=>{
        
        res.render('allUsers', {users})
    })
})

//update one user

router.get('/update_user', async(req,res) => {
    try{ var oneUser = await User.findById(req.query.id);
     res.render('update',{oneUser});
    }
    catch(err){
        res.send("error" + err)
    }
 })

 router.post('/newUpdate/:id', (req,res) => {
     const id = req.params.id;
     User.findByIdAndUpdate(id,
        {name: req.body.uname,
        question: req.body.uquestion
        },
        {new:true}, 
        function(err, users){
        if(err){
            console.log(err);
        }
        res.redirect('/')
    });  
 })

 router.get('/delete_user',(req,res)=>{
    User.findByIdAndRemove({ _id: req.query.id }, function(err) {
        if (!err) {
            res.redirect('/') 
        }
        else {
    res.send(err)   
     }
    });
 })

module.exports = router;