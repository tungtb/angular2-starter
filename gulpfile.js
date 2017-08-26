var gulp = require('gulp'),
	path = require('path'),
	rename = require('gulp-rename'),
	template = require('gulp-template'),
	htmlreplace = require('gulp-html-replace'),
	pathExists = require('path-exists'),
	yargs = require('yargs').argv;

var root = 'src';

// helper method to resolveToApp paths
var resolveTo = function (resolvePath) {
	return function (glob) {
		glob = glob || '';
		return path.join(root, resolvePath, glob);
	}
};

var resolves = {
	module: resolveTo('app/modules'),
	component: resolveTo('app/components'),
	page: resolveTo('app/pages'),
	directive: resolveTo('app/directives'),
	pipe: resolveTo('app/pipes'),
	service: resolveTo('app/services/apis')
}

// map of all our paths
var paths = {
	module: path.join(__dirname, 'generator', 'module/**/*.**'),
	page: path.join(__dirname, 'generator', 'page/**/*.**'),
	component: path.join(__dirname, 'generator', 'component/**/*.**'),
	directive: path.join(__dirname, 'generator', 'directive/**/*.**'),
	pipe: path.join(__dirname, 'generator', 'pipe/**/*.**'),
	service: path.join(__dirname, 'generator', 'service/**/*.**'),
	dist: path.join(__dirname, 'dist/')
};

var getResolveToPath = function (moduleName, task) {
	if (task == 'module') {
		return resolves[task];
	}
	return resolveTo('app/modules/' + moduleName + '/' + task + 's');
}

gulp.task('g', function () {
	var cap = function (val) {
		var name = '';
		var arrayName = val.split('-');
		for (var key in arrayName) {
			name += arrayName[key].charAt(0).toUpperCase() + arrayName[key].slice(1);
		}
		return !!name ? name : val;
	};
	var task = yargs.task;
	var name = yargs.name;
	var parentPath = yargs.parent || '';
	var moduleName = yargs.module || '';
	var fullPath = path.join(root, 'app/modules/' + moduleName);
	pathExists(fullPath).then(exists => {
		if (exists) {
			var resolvePath = getResolveToPath(moduleName, task);
			var blankTemplate = paths[task];
			var destPath = path.join(resolvePath(), parentPath, name);
			return gulp.src(blankTemplate)
				.pipe(template({
					name: name,
					upCaseName: cap(name)
				}))
				.pipe(rename(function (path) {
					path.basename = path.basename.replace('temp', name);
					path.extname = path.extname.replace('tmp', 'ts');
					path.dirname = path.dirname.replace('tempComponent', name);
				}))
				.pipe(gulp.dest(destPath));
		} else {
			var today = new Date();
			var hours = today.getHours() > 10 ? today.getHours() : '0' + today.getHours();
			var minutes = today.getMinutes() > 10 ? today.getMinutes() : '0' + today.getMinutes();
			var seconds = today.getSeconds() > 10 ? today.getSeconds() : '0' + today.getSeconds();
			console.error("[" + hours + ':' + minutes + ':' + seconds + "] Error: Module '" + moduleName + "' does not exists .");
			return false;
		}
	});
});

gulp.task('page', function () {
	var cap = function (val) {
		var name = '';
		var arrayName = val.split('-');
		for (var key in arrayName) {
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
		.pipe(rename(function (path) {
			path.basename = path.basename.replace('temp', name);
			path.extname = path.extname.replace('tmp', 'ts');
		}))
		.pipe(gulp.dest(destPath));
});

gulp.task('default', function () {
	// place code for your default task here
	console.log("default task");
});
