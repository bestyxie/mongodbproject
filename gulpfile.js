var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    browserify = require('gulp-browserify');

// gulp.task('watch', function(){
// 	gulp.src('./server.js')
// 	    .pipe(browserify({
// 	    	insertGlobals: true,
// 	    	debug: !gulp.env.production
// 	    }))
// 	    .pipe(gulp.dest('./*'))
// })

gulp.task('develop',function(){
	nodemon({script: 'server.js',
		   ext:'jade js',
		   env: {'NODE_ENV': 'development'}
		   // tasks: ['watch'],
		})
	  .on('restart', function(){
	  	console.log('restarted!')
	  })
});