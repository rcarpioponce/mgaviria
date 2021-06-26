var gulp = require('gulp');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('server', function() {
    connect.server({
        root: './',
        livereload: true,
        middleware: function(connect, opt) {
            return [ historyApiFallback({}) ];
        }
    });
});


gulp.task('html', function() {
 gulp.src('./**/*.html')
 .pipe(connect.reload());
});

gulp.task('js', function() {
 gulp.src('./js/app/bundle.js')
 .pipe(connect.reload());
});

 
gulp.task('templates', function () {
	gulp.src('./home.html')
	  .pipe(inject(
	    gulp.src(['./js/app/templates/*.html'], {read: true}), {
	      transform: function (filepath, file, i, length) {
	          //return '  "' + file + '"' + (i + 1 < length ? ',' : '');
	        	var contenido = file.contents.toString('utf8');
	        	var id = filepath.substr(18);
	        	id = id.substr(0,id.length-5);
	        	var src = '<script type="text/template" id="'+id+'">'+contenido+'</script>';
	      		return  src;
	      }
	    }
	  ))
	  .pipe(gulp.dest('./'));
});


gulp.task('watch', function() {
 gulp.watch(['./**/*.html'], ['html']);
 //gulp.watch(['./app/bundle.js'], ['js']);
});

//gulp.task('default', ['templates','watch','server']);
gulp.task('default', ['watch','templates','server']);