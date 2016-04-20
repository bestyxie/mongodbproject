var _ = require('underscore');
var Movie = require('../models/movie');
var Comment = require('../models/comment');

// admin
exports.save = function(req,res){
	res.render('category_admin',{
		title:'后台后台分类录入页',
	});
};

// admin new movie
exports.new = function(req,res){
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;

	if(id !== "undefined"){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}

			_movie = _.extend(movie,movieObj);
			_movie.save(function(err,movie){
				if(err){
					console.log(err);
				}

				res.redirect('/movie/' + movie._id);
			});
		});
	}
	else{
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		});

		_movie.save(function(err,movie){
			if(err){
				console.log(err);
			}

			res.redirect('/movie/' + movie._id);
		})
	}
};