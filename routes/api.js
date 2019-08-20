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

function verifyToken(res, req, next){
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    res.userId = payload.subject
    next()
}

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({username: userData.username}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid Username')
            } else
            if (user.password !== userData.password){
                    res.status(401).send('Invalid Password')
            } else {
                let payload = { subject: user._id}
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }   
        }
    })
})

router.post('/teamAdd', (req, res) => {
    let teamData = req.body
    Team.where({Name: teamData.Name}).exec((err, query) => {
        if(err){
            res.status(401).send('teamAdd: Team add operation failed: ' + err.message)
        } else {
            if(typeof query !== 'undefined' && query.length > 0){
                res.status(401).send('TeamAdd: Team is already exists')
            } else {
                let team = new Team(teamData)
                team.save((error, addedTeam) => {
                    if (error) {
                        res.status(401).send('TeamAdd: Team add operation failed: ' + error.message)
                    } else {
                        res.status(200).send('TeamAdd: Team successfully added!')
                    }
                })
            }
        }
    })
})

router.post('/teamUpdate', (req, res) => {
    let teamData = req.body
    Team.where({_id: teamData._id}).exec((err, query) => {
        if(err){
            res.status(401).send('TeamUpdate: Team update operation failed: ' + err.message)
        } else {
            if(typeof query !== 'undefined' && query.length > 0){
                Team.findOneAndUpdate({_id: teamData._id}, teamData, (error, data) => {
                    if (error){
                        res.status(401).send('TeamUpdate: Team update operation failed: ' + error.message)
                    } else {
                        res.status(200).send('TeamUpdate: Team successfully updated!')
                    }
                })
            } else {
                res.status(401).send('TeamUpdate: No such team exists')
            }
        }
    })
})

router.post('/teamDelete', (req, res) => {
    let teamData = req.body
    Team.findOneAndDelete({Name: teamData.Name}, (err) => {
        if(err){
            res.status(401).send('Team delete operation failed: ' + err.message)
        } else {
            res.status(200).send('Team successfully Deleted!')
        }
    })
})

router.post('/playerAdd', (req, res) => {
    var playerData = req.body
    Player.where({_id: playerData._id}).exec((err, query) => {
        if(err){
            res.status(401).send('PlayerAdd: Player add operation failed: ' + err.message)
        } else {
            if(typeof query !== 'undefined' && query.length > 0){
                res.status(401).send('PlayerAdd: Player is already exists in the database')
            } else {
                let player = new Player(playerData);
                player.save((error, addedplayer) => {
                    if (error) {
                        res.status(401).send('PlayerAdd: Player add operation failed: ' + error.message)
                    } else {
                        res.status(200).send('PlayerAdd: Player successfully added!')
                    }
                })
            }
        }
    })
})

router.post('/playerUpdate', (req, res) => {
    let playerData = req.body
    Player.where({_id: playerData._id}).exec((err, query) => {
        if(err){
            res.status(401).send('PlayerUpdate: Player update operation failed: ' + err.message)
        } else {
            if(typeof query !== 'undefined' && query.length > 0){
                Player.findOneAndUpdate({_id: playerData._id}, playerData, (error, data) => {
                    if (error){
                        res.status(401).send('PlayerUpdate: player update operation failed: ' + error.message)
                    } else {
                        res.status(200).send('PlayerUpdate: player successfully updated!')
                    }
                })
            } else {
                res.status(401).send('PlayerUpdate: No such player exists')
            }
        }
    })
})

router.post('/playerDelete', (req, res) => {
    let playerData = req.body
    Player.findOneAndDelete({_id: playerData._id}, (err) => {
        if(err){
            res.status(401).send('PlayerDelete: Player Delete operation failed: ' + error.message)
        } else {
            res.status(200).send('PlayerDelete: Player successfully Deleted!')
        }
    })
})

router.post('/matchAdd', (req, res) => {
    var matchData = req.body
    Match.where({_id: matchData._id}).exec((err, query) => {
        if(err){
            res.status(401).send('MatchAdd: Match add operation failed: ' + err.message)
        } else {
            if(typeof query !== 'undefined' && query.length > 0){
                res.status(401).send('MatchAdd: Match is already exists in the database')
            } else {
                let match = new Match(matchData);
                match.save((error, addedmatch) => {
                    if (error) {
                        res.status(401).send('MatchAdd: Match add operation failed: ' + error.message)
                    } else {
                        res.status(200).send('MatchAdd: Match successfully added!')
                    }
                })
            }
        }
    })
})

router.post('/matchUpdate', (req, res) => {
    let matchData = req.body
    Match.where({_id: matchData._id}).exec((err, query) => {
        if(err){
            res.status(401).send('MatchUpdate: Match update operation failed: ' + err.message)
        } else {
            if(typeof query !== 'undefined' && query.length > 0){
                Match.findOneAndUpdate({_id: matchData._id}, matchData, (error, data) => {
                    if (error){
                        res.status(401).send('MatchUpdate: Match update operation failed: ' + error.message)
                    } else {
                        res.status(200).send('MatchUpdate: Match successfully updated!')
                    }
                })
            } else {
                res.status(401).send('MatchUpdate: No such match exists')
            }
        }
    })
})

router.post('/matchDelete', (req, res) => {
    let matchData = req.body
    Match.findOneAndDelete({_id: matchData._id}, (err) => {
        if(err){
            res.status(401).send('MatchDelete: Match Delete operation failed: ' + error.message)
        } else {
            res.status(200).send('MatchDelete: Match successfully Deleted!')
        }
    })
})


module.exports = router