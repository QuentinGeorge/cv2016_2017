"use strict";

var gulp = require( "gulp" ),
    gHTMLMin = require( "gulp-htmlmin" ),
    gSass = require( "gulp-sass" ),
    gAutoPrefixer = require( "gulp-autoprefixer" ),
    gCleanCSS = require( "gulp-clean-css" ),
    gESLint = require( "gulp-eslint" ),
    gBabel = require( "gulp-babel" ),
    gUglify = require( "gulp-uglify" ),
    browserSync = require( "browser-sync" ).create();

// Minify HTML
gulp.task( "html", function() {
    return gulp
        .src( "src/**/*.html" )
        .pipe( gHTMLMin( { collapseWhitespace: true } ) )
        .pipe( gulp.dest( "." ) )
        // Update browser
        .pipe( browserSync.stream() );
} );

// Compile sass files into css
gulp.task( "styles", function() {
    return gulp
        // Compile sass files into css directory
        .src( "sass/**/*.scss" )
        .pipe( gSass() )
        .pipe( gulp.dest( "css" ) )
        // Add prefix on styles and replace css file
        .pipe( gAutoPrefixer( "last 2 version" ) )
        .pipe( gulp.dest( "css" ) )
        // Minify CSS and replace CSS file
        .pipe( gCleanCSS() )
        .pipe( gulp.dest( "css" ) )
        // Update browser
        .pipe( browserSync.stream() );
} );

//  Check es-lint
gulp.task( "lint", function() {
    return gulp
        .src( "src/**/*.js" )
        .pipe( gESLint() )
        .pipe( gESLint.format() );
} );

// Compile babel-js files into js
gulp.task( "babel", function() {
    return gulp
        // Compile babel-js files into scripts directory
        .src( "src/**/*.js" )
        .pipe( gBabel() )
        .pipe( gulp.dest( "scripts" ) )
        // Minify JS and replace JS file
        .pipe( gUglify() )
        .pipe( gulp.dest( "scripts" ) )
        // Update browser
        .pipe( browserSync.stream() );
} );

// Browser-sync initialisation
gulp.task( "browser-sync", function() {
    browserSync.init( {
        proxy: "http://localhost/DW-Projects/cv2016_2017/"
    } );
} );

// Watching files modifications
gulp.task( "watch", function() {
    // gulp.watch( "*.html" ).on( "change", browserSync.reload ); // other way to sync browser without stream
    gulp.watch( "src/**/*.html", [ "html" ] );
    gulp.watch( "sass/**/*.scss", [ "styles" ] );
    gulp.watch( "src/**/*.js", [ "lint", "babel" ] );
} );

// Create command tasks
gulp.task( "default", [ "build" ] );

gulp.task( "build", [ "html", "styles", "lint", "babel" ] );

gulp.task( "work", [ "build", "watch", "browser-sync" ] );
