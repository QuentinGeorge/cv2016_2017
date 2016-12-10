 /* Gulpfile.js
 /
 /  Last modification 10/12/2016
*/

"use strict";

// Packages variables
var gulp = require( "gulp" ),
    gHTMLMin = require( "gulp-htmlmin" ),
    gImageMin = require( "gulp-imagemin" ), // node_modules path directory is too long to be deleted on windows. Use java executable "PathTooLong.jar" to remove it ( use with caution ! ).
    gSass = require( "gulp-sass" ),
    gAutoPrefixer = require( "gulp-autoprefixer" ),
    gESLint = require( "gulp-eslint" ),
    gBabel = require( "gulp-babel" ),
    gUglify = require( "gulp-uglify" ),
    gRename = require( "gulp-rename" ),
    browserSync = require( "browser-sync" ).create();

// Utilities variables
var sSrc = "src/",
    sDest = "build/",
    oHTML = {
        in: sSrc + "**/*.html",
        watch: sSrc + "**/*.html",
        out: sDest,
        minOpts: {
            collapseWhitespace: true
        }
    },
    oAssets = {
        in: sSrc + "assets/**/*",
        watch: sSrc + "assets/**/*",
        out: sDest + "assets/"
    },
    oImg = {
        in: sSrc + "img_to_optim/**/*",
        watch: sSrc + "img_to_optim/**/*",
        out: sDest + "assets/img/"
    },
    oStyles = {
        in: sSrc + "sass/**/*.scss",
        watch: sSrc + "sass/**/*.scss",
        out: sDest + "css/",
        sassOpts: {
            outputStyle: "compressed", // Minify
            precision: 3
        },
        autoPrefixOpts: {
            browsers: [ "last 2 versions" ]
        }
    },
    oScripts = {
        in: sSrc + "**/*.js",
        watch: sSrc + "**/*.js",
        out: sDest + "scripts/"
    },
    oRename = {
        minOpts: {
            suffix: ".min"
        }
    },
    oBrowserSync = {
        initOpts: {
            proxy: "http://localhost/DW-Projects/cv2016_2017/" + sDest
        }
    };

// HTML tasks
gulp.task( "html", function() {
    return gulp
        // Minify HTML
        .src( oHTML.in )
        .pipe( gHTMLMin( oHTML.minOpts ) )
        .pipe( gulp.dest( oHTML.out ) );
} );

// Assets tasks
gulp.task( "assets", function() {
    return gulp
        // Copy assets files into destination directory
        .src( oAssets.in )
        .pipe( gulp.dest( oAssets.out ) );
} );

// Images tasks
gulp.task( "img", function() {
    return gulp
        // Optimize images
        .src( oImg.in )
        .pipe( gImageMin() )
        .pipe( gulp.dest( oImg.out ) );
} );

// Styles tasks
gulp.task( "styles", function() {
    return gulp
        // Compile sass files & minify
        .src( oStyles.in )
        .pipe( gSass( oStyles.sassOpts ).on( "error", gSass.logError ) )
        // Add css prefixes
        .pipe( gAutoPrefixer( oStyles.autoPrefixOpts ) )
        // Add suffix .min before writting file
        .pipe( gRename( oRename.minOpts ) )
        .pipe( gulp.dest( oStyles.out ) );
} );

//  Check es-lint
gulp.task( "lint", function() {
    return gulp
        .src( oScripts.in )
        .pipe( gESLint() )
        .pipe( gESLint.format() );
} );

// Scripts tasks
gulp.task( "scripts", function() {
    return gulp
        // Compile es2015-js files
        .src( oScripts.in )
        .pipe( gBabel() )
        // Minify & obfuscate JS
        .pipe( gUglify() )
        // Add suffix .min before writting file
        .pipe( gRename( oRename.minOpts ) )
        .pipe( gulp.dest( oScripts.out ) );
} );

// Browser-sync initialisation
gulp.task( "browser-sync", function() {
    browserSync.init( oBrowserSync.initOpts );
} );

// Watching files modifications & reload browser
gulp.task( "watch", function() {
    gulp.watch( oHTML.watch, [ "html" ] ).on( "change", browserSync.reload );
    gulp.watch( oImg.watch, [ "img" ] ).on( "change", browserSync.reload );
    gulp.watch( oAssets.watch, [ "assets" ] ).on( "change", browserSync.reload );
    gulp.watch( oStyles.watch, [ "styles" ] ).on( "change", browserSync.reload );
    gulp.watch( oScripts.watch, [ "lint", "scripts" ] ).on( "change", browserSync.reload );
} );

// Create command-line tasks
gulp.task( "default", [ "html", "assets", "img", "styles", "lint", "scripts" ] );

gulp.task( "work", [ "default", "watch", "browser-sync" ] );
