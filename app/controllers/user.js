var User = require('../models/user');

// signup
exports.signup = function(req,res){
	var _user = req.body.user;

	User.find({name: _user.name}, function(err,user){
		if(err){
			console.log(err);
		}
		if(user.length>0){
			res.redirect('/signin');
		}
		else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err){
					console.log(err);
				}
				res.redirect("/");
			});
		}
	});	
};

// singin
exports.singin = function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name: name}, function(err,user){
		if(err){
			console.log(err);
		}

		if(!user){
			return res.redirect('/signup');
		}
		else if (name === user.name && password === user.name) {
			req.session.user = user;
			return res.redirect('/');
		}else{
			console.log('Password is not mathed');
			return res.redirect('/signin')
		}
	});
};

// logout
exports.logout = function(req,res){
	delete req.session.user;
	// delete app.locals.user;

	res.redirect('/');
};

// userlist page
exports.list = function(req,res){

	User.fetch(function(err,users) {
		if(err){
			console.log(err);
		}
		res.render('userlist',{
			title:'用户列表页',
			users:users
		});
	});
};

// showSignup
exports.showSignup = function(req,res){
	res.render('signup',{
		title: '注册页面'
	});
};

// showSignin
exports.showSignin = function(req,res){
	res.render('signin',{
		title: '登录页面'
	});
};

// midware for user
exports.signinRequired = function(req, res, next){
	var user = req.session.user;

	if(!user){
		return res.redirect('/signin');
	}

	next();
}

exports.adminRequired = function(req, res, next){
	var user = req.session.user;

	if(user.role <=10){
		return res.redirect('/signin');
	}
	next();
}