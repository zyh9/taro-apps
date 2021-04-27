const path = require("path");
const gulp = require("gulp");
const zip = require("gulp-zip");
const dayjs = require("dayjs");
const del = require("del");
const distFile = "dist"; //打包目录
const { version } = require("./package.json");

let platform = process.argv[process.argv.length - 1] || "weapp";

const gulpZip = async () => {
  const deletedPaths = await del(["*.zip"]);
  console.log(deletedPaths);
  let file = `${distFile}/${platform.replace("test", "")}`;
  return gulp
    .src(path.resolve(file + "/**"))
    .pipe(
      zip(
        `小程序${platform}-${version}-${dayjs().format(
          "YYYY-MM-DD HH-mm-ss"
        )}.zip`
      )
    )
    .pipe(gulp.dest("./"));
};

//压缩打包文件
gulp.task(platform, gulpZip);

// gulp.task--定义任务
// gulp.src--找到需要执行任务的文件
// gulp.dest--执行任务的文件的去处
// gulp.watch--观察文件是否发生变化
