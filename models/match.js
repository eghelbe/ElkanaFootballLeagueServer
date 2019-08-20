const mongoose = require('mongoose')

const Schema = mongoose.Schema
const matchSchema = new Schema({
    TeamA: String,
    TeamB: String,
    Day: String,
    Time: {hours: Number, minutes: Number},
    Date: Date,
    GoalsTeamA: Number,
    GoalsTeamB: Number,
    Comment: String,
    matchName: Number,
    winner: String,
    CreationDate: Date
})
module.exports = mongoose.model('match', matchSchema, 'matches')