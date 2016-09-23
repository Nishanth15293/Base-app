var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var del = require('del');
var mergeStream = require('merge-stream');

gulp.task('clean', function() {
    del(['build']);
});

gulp.task('css', function() {
    return gulp.src('Client/scss/*.scss')
        .pipe(plugins.sass.sync().on('error', plugins.sass.logError))
        .pipe(plugins.sass({ outputStyle: 'compressed' }))
        .pipe(plugins.autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(gulp.dest('Client/css'));
});

gulp.task('wire-dep', function() {
    var injectJsFiles = [
        'Client/js/app.js',
        'Client/js/config.js',
        'Client/**/*.js'
    ];
    var wireDepOptions = {
        bowerJson: require('./bower.json'),
        directory: 'bower_components',
        ignorePath: '..'
    };
    return gulp
        .src('Client/index.html')
        .pipe(wiredep(wireDepOptions))
        .pipe(plugins.print())
        .pipe(plugins.inject(gulp.src(injectJsFiles)))
        .pipe(plugins.inject(gulp.src('Client/css/*.css')))
        .pipe(gulp.dest('Client'));
});

gulp.task('copy', function() {
    return mergeStream(
        //gulp.src('public/imgs/**/*').pipe(plugins.imagemin({optimizationLevel: 4})).pipe(gulp.dest('build/public/imgs/')),
        //gulp.src([
        //    'bower_components/bootstrap/fonts/*',
        //    'bower_components/font-awesome/fonts/*'
        //]).pipe(gulp.dest('build/public/fonts')),
        gulp.src('Client/templates/*.html').pipe(gulp.dest('build/Client/templates')),
        gulp.src('Client/json/*.json').pipe(gulp.dest('build/Client/json')),
        gulp.src('Client/csv/*').pipe(gulp.dest('build/Client/csv'))

    )
});

gulp.task('cache-templates', function(){
    var templateCacheOptions = {
        file: 'templatesCache.js',
        options: {
            module: 'app',
            standAlone: false,
            root: '/Client/Partials'
        }
    };

    return gulp
        .src('Client/Partials/*.html')
        .pipe(plugins.minifyHtml({empty: true}))
        .pipe(plugins.angularTemplatecache(
            templateCacheOptions.file,
            templateCacheOptions.options
        ))
        .pipe(gulp.dest('Client/js'))
});

gulp.task('client', function() {
    var assets = plugins.useref({searchPath: './'});
    var cssFilter = plugins.filter('**/*.css', {restore: true});
    var jsFilter = plugins.filter('**/*.js', {restore: true});
    gulp.src('Client/index.html')/*.pipe(plugins.plumber())*/
        .pipe(assets)
        .pipe(cssFilter)
        .pipe(plugins.csso())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe(plugins.sourcemaps.init())
        //.pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(jsFilter.restore)
        .pipe(gulp.dest('build/Client'));
});

gulp.task('server', function() {
    return gulp.src('Server/**/*.js')
        /*.pipe(plugins.uglify())*/
        .on('error', plugins.util.log.bind(plugins.util))
        .pipe(gulp.dest('build/server'));
});


gulp.task('watch', function() {
    gulp.task('watch', function() {
        //gulp.watch(['Client/scss/**/*.scss'], function() {runSequence('css', 'copy')});
        gulp.watch(['server/**/*.js'], ['server']);
        //gulp.watch(['Client/imgs/**/*'], ['copy']);
        gulp.watch('Client/index.html', ['refresh']);
        gulp.watch(['Client/js/**/*.js'], ['refresh']);
        //gulp.watch(['Client/templates/**/*', 'Client/templates/*'], ['refresh']);
    });
});

//gulp.task('server', function() {
//    plugins.developServer.listen({
//    path: './index.js',
//    cwd: './build/server',
//    args: args
//});
//gulp.watch([
//    'build/server/**/*.js'
//], plugins.developServer.restart);
//});

gulp.task('refresh',  function() {
    runSequence('css', 'wire-dep', 'copy', 'cache-templates', 'client', 'server');
});

gulp.task('heroku',  function() {
    runSequence('clean', 'css', 'wire-dep', 'copy', 'cache-templates', 'client', 'server');

});

gulp.task('serve',  function() {
    runSequence('clean', 'css', 'wire-dep', 'copy', 'cache-templates', 'client', 'server', 'watch');
});/**
 * Created by Nishanth on 9/3/2016.
 */
