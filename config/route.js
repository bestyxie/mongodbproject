var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');

module.exports = function(app){
    // prehandle user
	app.use(function(req,re,next){
		var _user = req.session.user;

		app.locals.user = _user;

		next();
	});

	// Index
	app.get('/',Index.index);

	// Movie
	app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);
	app.get('/movie/:id',Movie.details);
	app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
	app.get('/admin/movie',Movie.save);
	app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
	app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del);

	// User
	app.post('/user/signup',User.signup);
	app.post('/user/signin', User.singin);
	app.get('/signin',User.showSignin);
	app.get('/signup',User.showSignup)
	app.get('/logout',User.logout);
	app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);

	// Comment
	app.post('/user/comment',User.signinRequired, Comment.save);
}