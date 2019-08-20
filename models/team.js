const mongoose = require('mongoose')

const Schema = mongoose.Schema
const teamSchema = new Schema({
    Name: String,
    Position: Number,
    Games: Number,
    Wins: Number,
    Loses: Number,
    Ties: Number,
    GoalsAgainst: Number,
    GoalsFor: Number,
    GoalsDiff: Number,
    Points: Number,
    CreationDate: Date
})
module.exports = mongoose.model('team', teamSchema, 'teams')