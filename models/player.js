const mongoose = require('mongoose')

const Schema = mongoose.Schema
const playerSchema = new Schema({
    FirstName: String,
    LastName: String,
    TeamName: String,
    TShirtNumber: Number,
    Goals: Number,
    RedCards: Number,
    YellowCards: Number,
    Phone: String,
    Coordinator: Boolean,
    CreationDate: Date
})
module.exports = mongoose.model('player', playerSchema, 'players')