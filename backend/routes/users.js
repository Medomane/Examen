const router = require('express').Router();
let User = require('../models/user.model');


//Retrouver l’utilisateur ayant l’_id « id »(work)
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Retrouve <size> utilisateur à partir de l’offset <page> x <size></size> (work)
///users/:page/:size?search=toto&gender=1&dob=-1
router.route('/:page/:size').get((req, res) => {
  User.countDocuments({},function(err,count){
    let search = (req.query.search === undefined)?'':req.query.search ;
    let gender = (req.query.gender === undefined)?0:parseInt(req.query.gender) ;
    let dob = (req.query.dob === undefined)?0:parseInt(req.query.dob) ;

    let sort = {createdAt:'asc'};
    if(gender !== 0) sort = {gender:gender};
    else if(dob !== 0) sort = {dob:dob};
    let q = {};
    if(search !== '') q = {"username": { "$regex": search, "$options": "i" }};
    User.find(q).skip(parseInt(req.params.size) * (Math.max(1, parseInt(req.params.page))-1)).limit(parseInt(req.params.size))
      .sort(sort)
      .then(
        function(user){
          let s = count ;
          if(search !== '') s = user.length;
          return res.json( {  
            users:user,
            infos:{
              page:parseInt(req.params.page), 
              per_page:parseInt(req.params.size), 
              size:s,
              sup:{
                search : req.query.search ,
                gender : req.query.gender ,
                dob : req.query.dob,
                sort:sort
              }
            }
          })
        }
      ) 
      .catch(err => res.status(400).json('Error: ' + err));
  })
});

//Créer un nouvel utilisateur (work)
router.route('/').post((req, res) => {
  const username = req.body.username;
  const gender =  req.body.gender;
  const dob =  req.body.dob;
  const news =  req.body.news;
  const email =  req.body.email;
  const photo =  req.body.photo;

  const newUser = new User(
    {
      username,gender,dob,news,email,photo
    }
  );

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Met à jour l’utilisateur ayant l’_id « id » (work)
router.route('/:id').put((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.gender =  req.body.gender;
      user.dob =  Date.parse(req.body.dob);
      user.news =  req.body.news;
      user.email =  req.body.email;
      user.photo =  req.body.photo;
      
      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//Supprime l’utilisateur ayant l’_id « id » (work)
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//(work)
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;