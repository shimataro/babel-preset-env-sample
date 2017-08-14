import path from "path";
import gulp from "gulp";
import babel from "gulp-babel";
import rename from "gulp-rename";
import webserver from "gulp-webserver";
import webpack from "webpack";

const srcRoot = path.resolve();
const dstRoot = path.resolve("dist");
const src = "original.es6";

const BABEL_OPTIONS = {
	SERVER: {
		presets: [
			[
				"env",
				{
					targets: {
						node: "current",
					},
					// Node.jsはジェネレータにネイティブ対応しているので "transform-regenerator" プラグインは不要
					exclude: ["transform-regenerator"],

					// 必要なPolyfillのみ導入
					useBuiltIns: "usage",
				},
			],
		],
		babelrc: false,
	},
	CLIENT: {
		presets: [
			[
				"env",
				{
					targets: {
						ie: 8,
						firefox: 30,
						chrome: 55,
					},
					// 必要なPolyfillのみ導入
					useBuiltIns: "usage",
				},
			],
		],
		// async/awaitを使うなら必要
		plugins: ["transform-runtime"],

		babelrc: false,
	},
};

// default task
gulp.task("default", () =>
{
	gulp.start("help");
});

// build task (all)
gulp.task("build", ["build-server", "build-client"], () =>
{
});


// build task (Node.js)
gulp.task("build-server", () =>
{
	gulp.src(path.join(srcRoot, src))
		.pipe(babel(BABEL_OPTIONS.SERVER))
		.pipe(rename({basename: "server"}))
		.pipe(gulp.dest(dstRoot));
});

// build task (Browser)
gulp.task("build-client", (callback) =>
{
	const config = {
		entry: {
			"client": src,
		},
		resolve: {
			modules: [srcRoot, "node_modules"],
		},
		output: {
			path: dstRoot,
			filename: "[name].js",
		},
		devtool: "source-map",
		module: {
			loaders: [
				{
					test: /\.es6$/,
					loader: "babel-loader",
					query: BABEL_OPTIONS.CLIENT,
				},
			],
		},
	};
	webpack(config, (err, stats) =>
	{
		console.log(stats.toString({colors: true}));
		callback();
	});
});

gulp.task("start", () => {
	gulp.src(path.resolve("."))
		.pipe(webserver({
			livereload: true,
			directoryListing: false,
			open: "test.html",
		}));
});
