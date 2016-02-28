var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var User = require('./models/user');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

mongoose.connect('mongodb://localhost/imooc');

app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
	secret:'imooc'
}))
app.locals.moment = require('moment');
app.listen(port);
console.log('start on port'+port);

// index page
app.get('/',function(req,res){
	console.log('user in session');
	console.log(req.session.user);
    Movie.fetch(function(err,movies){
    	if(err){
    		console.log(err);
    	}
    	res.render('index',{
			title:'首页',
			movies: movies	
		});
    })
});
// list
app.get('/admin/list',function(req,res){
	Movie.fetch(function(err,movies) {
		if(err){
			console.log(err);
		}
		res.render('list',{
			title:'列表页',
			movies:movies
		});
	});
});

// detail
app.get('/movie/:id',function(req,res){
	var id = req.params.id;

	Movie.findById(id,function(err,movie){
		res.render('detail',{
				title:'imooc' + movie.title,
				movie:movie
		});
	})
});

// admin update movie
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id;

	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title: 'imooc 后台更新页',
				movie: movie
			})
		})
	}
})

// admin
app.get('/admin/movie',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('admin',{
			title:'后台管理页面',
			movie:movies
		});
	});
});

// admin post movie
app.post('/admin/movie/new',function(req,res){
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
});

//list delete movie
app.delete('/admin/list',function(req,res){
	var id = req.query.id;

	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err);
			}
			else{
				res.json({success: 1})
			}
		})
	}
});

// signup
app.post('/user/signup', function(req,res){
	var _user = req.body.user;

	User.find({name: _user.name}, function(err,user){
		if(err){
			console.log(err);
		}
		if(user.length>0){
			console.log(user);
			res.redirect('/');
		}
		else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err){
					console.log(err);
				}
				res.redirect("/admin/userlist");
			});
		}
	});	
});

// singin
app.post('/user/signin', function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name: name}, function(err,user){
		if(err){
			console.log(err);
		}

		if(!user){
			return res.redirect('/');
		}
		else if (name === user.name) {
			req.session.user = user;
			return res.redirect('/');
		}else{
			console.log('Password is not mathed');
		}
	});
});

// userlist page
app.get('/admin/userlist',function(req,res){
	User.fetch(function(err,users) {
		if(err){
			console.log(err);
		}
		res.render('userlist',{
			title:'用户列表页',
			users:users
		});
	});
});