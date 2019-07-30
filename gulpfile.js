const path = require('path');
const gulp = require('gulp');
const zip = require('gulp-zip');
const dayjs = require('dayjs');
const distFile = 'dist'; //打包目录
const packageInfo = require("./package.json");

let platform = process.argv[process.argv.length - 1] || 'weapp';

const gulpZip = () => gulp.src(path.resolve(distFile + '/**'))
  .pipe(zip('小程序' + platform + '-' + packageInfo.version + '-' + dayjs().format('YYYY-MM-DD HH-mm-ss') + '.zip'))
  .pipe(gulp.dest('./'))

//压缩打包文件
gulp.task('weapp', gulpZip)
