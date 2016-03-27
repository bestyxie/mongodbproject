var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');

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
	app.get('/admin/list',Movie.list);
	app.get('/movie/:id',Movie.details);
	app.get('/admin/update/:id',Movie.update);
	app.get('/admin/movie',Movie.new);
	app.post('/admin/movie/new',Movie.save);
	app.delete('/admin/list',Movie.del);

	// User
	app.post('/user/signup',User.signup);
	app.post('/user/signin', User.singin);
	app.get('/signin',User.showSignin);
	app.get('/signup',User.showSignup)
	app.get('/logout',User.logout);
	app.get('/admin/userlist',User.list);
}