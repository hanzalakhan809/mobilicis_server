const express = require('express');
const router = express.Router();
const UserProfile= require('../models/userProfile');
const authMiddleware = require('../middleware/authMiddleware');


//CODE TO STORE USER PROFILE DATA IN DATABASE FOR THE FIRST TIME
// const UserProfile = require('../models/userProfile')

const useProfileData = {
    name: "Hanzala Khan",
    email: "hanzala@gmail.com",
    phone: "+91 8090788567",
    about: "I am FullStack Developer currently working as a MERN Stack Developer intern at Mindtrot Technologies Pvt. Ltd. experienced in Devloping Mobile as well as Web app ",
    skills: ["Next Js", "Typescript"],
    professionalDetails: "This are the professional details shown to users in the app.",
    certification: { certificationName: "Python", certificationInstitute: "Coding Ninjas" },
    experiences: [{
      fromYearToYear: "7 Years (2014-2021) Full-time",
      organizationWithRole: "Oruphones -- Full Stack Developer"
    },
    {
      fromYearToYear: "2 Years (2021-2023) Full-time",
      organizationWithRole: "Mindtrot -- Full Stack Developer"
    }],
    higherEducation: {
      higherEducationInstitute: "IIT HYDERABAD",
      fromYearToYear: "(2010-2914)",
      course: "BCA",
      aboutEducation: "Bachelor in Computer Application (BCA) is a three-year undergraduate degree course for students who wish to delve into the world of Computer languages."
    },
    myConnections: [{
      connectionName: "Rahul",
      connectionPosition: "App Developer @ Mobilicis"
    },
    {
      connectionName: "Cristian",
      connectionPosition: "Software Engineer @ Mindtrot"
    },
    {
      connectionName: "Andrew",
      connectionPosition: "App Developer @ BlackCoffer"
    },
    {
      connectionName: "Sophia",
      connectionPosition: "UI/UX Designer @ Creatify"
    },
    {
      connectionName: "Alex",
      connectionPosition: "Backend Developer @ Datawise"
    },
    {
      connectionName: "Emma",
      connectionPosition: "Data Scientist @ Analytica"
    },
    {
      connectionName: "Michael",
      connectionPosition: "Cloud Engineer @ CloudSafe"
    },
    {
      connectionName: "Isabella",
      connectionPosition: "DevOps Engineer @ Pipeline"
    },
    {
      connectionName: "Daniel",
      connectionPosition: "QA Tester @ BugHunter"
    },
    {
      connectionName: "Olivia",
      connectionPosition: "Product Manager @ Productify"
    }],
    suggestionConnectins: [
      {
        connectionName: "David",
        connectionPosition: "Cybersecurity Expert @ SecureNet"
      },
      {
        connectionName: "Mia",
        connectionPosition: "Frontend Developer @ Webify"
      },
      {
        connectionName: "Samuel",
        connectionPosition: "Database Administrator @ DBMasters"
      }]
  }


// const saveUserProfile = async () => {
//     const userProfile = new UserProfile(useProfileData);
//     const result = await userProfile.save();
//     console.log(result);
// }

// saveUserProfile();


//for get userProfileData Image
router.get('/userProfile', authMiddleware, async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ user: req.user.id });
        if (!profile) return res.status(404).send('Profile not found');
        res.send(profile);
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
});



router.put('/updateUserProfile', authMiddleware, async (req, res) => {
    try {
        // Update myProfile in database 
        const updatedProfile = await UserProfile.findOneAndUpdate({ user: req.user.id }, req.body, { new: true });
        
        if (updatedProfile) {
            res.json(updatedProfile);   
        } else {
            res.status(404).json({ message: 'User profile not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;