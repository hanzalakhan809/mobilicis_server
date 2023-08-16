const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/users');
const UserProfile = require('../models/userProfile')



// JWT secret key 
const jwtSecret = process.env.JWTSECRET;



//ROUTE1: Signup
router.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
            });

            // Hashing the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    
                    newUser.save()
                           .then(user => {
                               // Create a new UserProfile
                               const newUserProfile = new UserProfile({
                                   user: user._id,
                                   name: req.body.name,
                                   email: req.body.email
                               });

                               newUserProfile.save()
                                   .then(profile => {
                                       user.profile = profile._id;
                                       user.save().then(() => {
                                           res.json({user, message : "Signed up successfully"});
                                       });
                                   })
                                   .catch(err => res.status(400).json('Error creating user profile: ' + err));
                           })
                           .catch(err => res.status(400).json('Error: ' + err));
                });
            });
        })
        .catch(err => res.status(500).json('Server Error: ' + err));
});






//ROUTE2: Login
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'User does not exist' });
            }

            // Comparing password
            bcrypt.compare(req.body.password, user.password)
                  .then(isMatch => {
                      if (!isMatch) {
                          return res.status(400).json({ message: 'Invalid credentials' });
                      }
                      const payload = { id: user.id, name: user.name, email: user.email }; 
                      jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
                          if (err) throw err;
                          res.json({ message: 'Logged in successfully', token: token });
                      });
                  })
                  .catch(err => res.status(500).json('Error comparing passwords: ' + err));
        })
        .catch(err => res.status(500).json('Server Error: ' + err));
});

module.exports = router;
