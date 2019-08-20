const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Match = require('../models/match')
const Team = require('../models/team')
const User = require('../models/user')
const Player = require('../models/player')
const mongoose = require('mongoose')

// const db = "mongodb://localhost:27017/ElkanafootballDB"
const db = "mongodb+srv://eghelbe:E%21r1e1z1@cluster0-iz5zs.mongodb.net/ElkanafootballDB?retryWrites=true&w=majority"

mongoose.set('useFindAndModify', false);
mongoose.connect(db, { useNewUrlParser: true }, err =>{
    if(err){
        console.log('Error!' + err)
    }else{
        console.log('Connected to mongodb')
    }
})

router.get('/getAllTeams', (req, res) => {
    Team.find({}, (err, teams) => {
        var allTeams = [];
        if(err){
            res.status(401).send(err);
        } else {
            teams.forEach((team)=> {
                allTeams.push(team);
            })
            res.status(200).send(allTeams)
        }
    })
})

router.get('/getTeamByName/:teamName', (req, res) => {
    Team.findOne({Name: req.params.teamName}, (err, team) => {
        if(err){
            res.status(401).send(err);
        } else {
            res.status(200).send(team)
        }
    })
})


router.get('/getAllPlayers', (req, res) => {
    Player.find({}, (err, players) => {
        var allPlayers = [];
        if(err){
            res.status(401).send(err);
        } else {
            players.forEach((player)=> {
                allPlayers.push(player);
            })
            res.status(200).send(allPlayers)
        }
    })
})

router.get('/getPlayerById/:playerId', (req, res) => {
    Player.findOne({Id: req.params.playerId}, (err, player) => {
        if(err){
            res.status(401).send(err);
        } else {
            res.status(200).send(player)
        }
    })
})

router.get('/getPlayersByTeamName/:teamName', (req, res) => {
    Player.find({TeamName: req.params.teamName}, (err, players) => {
        if(err){
            res.status(401).send(err);
        } else {
            res.status(200).send(players)
        }
    })
})

router.get('/getAllMatches', (req, res) => {
    Match.find({}, (err, matches) => {
        var allMatches = [];
        if(err){
            res.status(401).send(err);
        } else {
            matches.forEach((match)=> {
                allMatches.push(match);
            })
            res.status(200).send(allMatches)
        }
    })
})

router.get('/getMatchById/:matchName', (req, res) => {
    Match.findOne({matchName: req.params.matchName}, (err, match) => {
        if(err){
            res.status(401).send(err);
        } else {
            res.status(200).send(match)
        }
    })
})

router.get('/getAllUsers', (req, res) => {
    User.find({}, (err, users) => {
        var allUsers = [];
        if(err){
            res.status(401).send(err);
        } else {
            users.forEach((user) => {
                allUsers.push(user);
            })
            res.status(200).send(allUsers)
        }
    })
})

// router.post('/register', (req, res) => {
//     let userData = req.body
//     let user = new User(userData)
//     user.save((error, registeredUser) => {
//         if (error) {
//             console.log(error)
//         } else {
//             let payload = { subject: registeredUser._id}
//             let token = jwt.sign(payload, 'secretKey')
//             res.status(200).send({token})
//         }
//     })
// })

module.exports = router