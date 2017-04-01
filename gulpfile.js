"use strict";

const path = require("path");
const gulp = require("gulp");
const webpack = require("webpack");
const webpack_node_externals = require("webpack-node-externals");

const srcRoot = path.resolve();
const dstRoot = path.resolve("dist");

const BABEL_LOADER_QUERY = {
	SERVER: {
		presets: [
			[
				"env",
				{
					"targets": {
						"node": 4,
					},
					// Node.jsはジェネレータにネイティブ対応しているのでこれは不要
					"exclude": ["transform-regenerator"],
				},
			],
		],
	},
	CLIENT: {
		presets: [
			[
				"env",
				{
					"targets": {
						"ie": 8,
						"firefox": 30,
						"chrome": 55,
					},
				},
			],
		],
		// async/awaitを使うなら必要
		plugins: ["transform-runtime"],
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
gulp.task("build-server", (callback) =>
{
	const config = {
		target: "node",
		entry: {
			"server": "original.es6",
		},
		resolve: {
			modules: [srcRoot, "node_modules"],
		},
		output: {
			path: dstRoot,
			filename: "[name].js",
			libraryTarget: "commonjs2",
		},
		devtool: "source-map",
		externals: [
			webpack_node_externals({modulesFromFile: true}),
		],
		module: {
			loaders: [
				{
					test: /\.es6$/,
					loader: "babel-loader",
					query: BABEL_LOADER_QUERY.SERVER,
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

// build task (Browser)
gulp.task("build-client", (callback) =>
{
	const config = {
		entry: {
			"client": "original.es6",
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
					query: BABEL_LOADER_QUERY.CLIENT,
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
