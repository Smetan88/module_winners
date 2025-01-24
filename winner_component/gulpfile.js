import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass); 

const paths = {
  styles: {
    src: './scss/**/*.scss',
    dest: './css'
  }
};

export const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init()) 
    .pipe(sass().on('error', sass.logError)) 
    .pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],cascade: false })) 
    .pipe(cleanCSS()) 
    .pipe(rename({}))
    .pipe(sourcemaps.write('./')) 
    .pipe(gulp.dest(paths.styles.dest)) 
    .pipe(browserSync.stream()); 
};

export const watch = () => {
  browserSync.init({
    server: {
      baseDir: './' 
    }
  });

  gulp.watch(paths.styles.src, styles); 
  gulp.watch('./*.html').on('change', browserSync.reload); 
};

export default gulp.series(styles, watch);