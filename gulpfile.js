var gulp	 		  = require('gulp'),
		path			  = require('path'),
		rename		  = require('gulp-rename'),
		template	  = require('gulp-template'),
		htmlreplace = require('gulp-html-replace'),
		yargs			  = require('yargs').argv;

var root = 'src';

// helper method to resolveToApp paths
var resolveTo = function(resolvePath) {
	return function(glob) {
		glob = glob || '';
		return path.join(root, resolvePath, glob);
	}
};

var resolveToApp = resolveTo('app'); // app/{glob}
var resolveToComponents = resolveTo('app/components'); // app/components/{glob}
var resolveToPages = resolveTo('app/pages'); // app/pages/{glob}

// map of all our paths
var paths = {
	blankTemplates: path.join(__dirname, 'generator', 'page/**/*.**'),
	dist: path.join(__dirname, 'dist/')
};

gulp.task('page', function(){
	var cap = function(val){
		var name = '';
		var arrayName = val.split('-');
		for(var key in arrayName) {
			name += arrayName[key].charAt(0).toUpperCase() + arrayName[key].slice(1);
		}
		return !!name ? name : val;
	};
	var name = yargs.name;
	var parentPath = yargs.parent || '';
	var destPath = path.join(resolveToPages(), parentPath, name);
	
	return gulp.src(paths.blankTemplates)
		.pipe(template({
			name: name,
			upCaseName: cap(name)
		}))
		.pipe(rename(function(path){
			path.basename = path.basename.replace('temp', name);
			path.extname = path.extname.replace('tmp', 'ts');
		}))
		.pipe(gulp.dest(destPath));
});

gulp.task('default', function() {
  // place code for your default task here
  console.log("tungtb test");
});
