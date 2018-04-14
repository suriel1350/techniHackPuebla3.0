'use strict'

var path  = require('path');
var fs = require('fs');
var crypto = require('crypto');
var mongoosePaginate = require('mongoose-pagination');

var Analisis = require('../models/analisis');

function decodeBase64Image(dataString) 
{
  	var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  	var response = {};

	if (matches.length != 3) 
	{
		return new Error('Invalid input string');
	}

	response.type = matches[1];
	response.data = new Buffer(matches[2], 'base64');

	return response;
}

function getAnalisis(req, res){
	var analisisId = req.params.id;

	Analisis.findById(analisisId, (err, analisis) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});			
		}else{
			if(!analisis){
				res.status(404).send({message: 'El analisis no existe'});
			}else{
				res.status(200).send({analisis});
			}
		}
	});
}

function getAllAnalisis(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerPage = 4;

	Analisis.find({},function(err, all){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!all){
				res.status(404).send({message: 'No hay analisis!!'});
			}else{
				return res.status(200).send({analisis: all});	
			}
		}
	});
}

function saveAnalisis(req, res){
	var imageTypeRegularExpression = /\/(.*?)$/;	
	var seed = crypto.randomBytes(20);
	var uniqueSHA1String = crypto.createHash('sha1').update(seed).digest('hex');


	var analisis = new Analisis();

	var params = req.body;
	analisis.alegria = params.alegria;
	analisis.tristeza = params.tristeza;
	analisis.miedo = params.miedo;
	analisis.asco = params.asco;
	analisis.ira = params.ira;
	analisis.disgusto = params.disgusto;
	analisis.tiempo = params.tiempo;
	analisis.genero = 'null';
	//analisis.image = params.image;

	var imageBuffer = decodeBase64Image(params.image);
	var userUploadedFeedMessagesLocation = './uploads/dibujos/';
	var uniqueRandomImageName = 'image-' + uniqueSHA1String;
	var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);
	var userUploadedImagePath = userUploadedFeedMessagesLocation + uniqueRandomImageName + '.' + imageTypeDetected[1];
	var imageName = uniqueRandomImageName + '.' + imageTypeDetected[1];
	//console.log(userUploadedImagePath);

	try{
    	fs.writeFile(userUploadedImagePath, imageBuffer.data, function() 
    	{
    		console.log('Saved to disk image attached by user:', userUploadedImagePath);
		});
    }
    catch(error)
    {
        console.log('ERROR:', error);
    }

    analisis.image = imageName;

	analisis.save((err, analisisStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!analisisStored){
				res.status(404).send({message: 'El analisis no ha sido guardado'});
			}else{
				res.status(200).send({analisis: analisisStored});
			}
		}
	});
}

function deleteAnalisis(req, res){
	var analisisId = req.params.id;

	Analisis.findByIdAndRemove(analisisId, (err, analisisRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!analisisRemoved){
				res.status(404).send({message: 'El analisis no ha sido eliminado'});				
			}else{
				res.status(200).send({analisis: analisisRemoved});				
			}
		}
	});		
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/dibujos/' + imageFile;
	
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen'});
		}
	});
}

module.exports = {
	saveAnalisis,
	getAllAnalisis,
	getAnalisis,
	deleteAnalisis,
	getImageFile
};