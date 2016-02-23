var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.set('views','./views');
app.set('view engine','jade');
app.listen(port);
console.log('start on port'+port);

// index page
app.get('/',function(req,res){
	res.render('index',{
		title:'首页'
	});
});
// list
app.get('/list',function(req,res){
	res.render('list',{
		title:'列表页'
	});
});

// detail
app.get('/detail:id',function(req,res){
	res.render('detail',{
		title:'详情页'
	});
});

// admin
app.get('/admin',function(req,res){
	res.render('index',{
		title:'后台管理页面'
	});
});