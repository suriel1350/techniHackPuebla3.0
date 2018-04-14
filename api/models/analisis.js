'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnalisisSchema = Schema({
	alegria: Number,
	tristeza: Number,
	miedo: Number, 	
	asco: Number,
	ira: Number,
	disgusto: Number,
	tiempo: Number,
	genero: String,
	image: String
	//artist: { type: Schema.ObjectId, ref: 'Artist' }
});

module.exports = mongoose.model('Analisis', AnalisisSchema);