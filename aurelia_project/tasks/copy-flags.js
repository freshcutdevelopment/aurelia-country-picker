import gulp from 'gulp';
import project from '../aurelia.json';

export default function copyFlags() {
  console.log("copying flags");
  return gulp.src(project.paths.flagsInput)
    .pipe(gulp.dest(project.paths.flagsOutput));
}

