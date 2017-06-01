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

var resolves = {
	component: resolveTo('app/components'),
	page: resolveTo('app/pages'),
	directive: resolveTo('app/directives'),
	pipe: resolveTo('app/pipes'),
	service: resolveTo('app/services/apis')
}

// map of all our paths
var paths = {
	page: path.join(__dirname, 'generator', 'page/**/*.**'),
	component: path.join(__dirname, 'generator', 'component/**/*.**'),
	directive: path.join(__dirname, 'generator', 'directive/**/*.**'),
	pipe: path.join(__dirname, 'generator', 'pipe/**/*.**'),
	service: path.join(__dirname, 'generator', 'service/**/*.**'),
	dist: path.join(__dirname, 'dist/')
};

gulp.task('g', function(){
	var cap = function(val){
		var name = '';
		var arrayName = val.split('-');
		for(var key in arrayName) {
			name += arrayName[key].charAt(0).toUpperCase() + arrayName[key].slice(1);
		}
		return !!name ? name : val;
	};
	var task = yargs.task;
	var name = yargs.name;
	var parentPath = yargs.parent || '';
	var resolvePath = resolves[task];
	var blankTemplate = paths[task];
	var destPath = path.join(resolvePath(), parentPath, name);
	return gulp.src(blankTemplate)
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
	var destPath = path.join(resolves.page, parentPath, name);
	return gulp.src(paths.page)
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
  console.log("default task");
});
