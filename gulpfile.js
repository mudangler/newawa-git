var gulp = require("gulp");

var sass = require("gulp-sass");

var fs = require('fs');

var readline = require("readline");

var autoprefixer = require("gulp-autoprefixer");

var plumber = require("gulp-plumber");

var webserver = require('gulp-webserver');

var changed  = require('gulp-changed');

var ejs = require("gulp-ejs");

var prettify = require('gulp-prettify');

var cssbeautify = require('gulp-cssbeautify');

var tinyping = require('gulp-tinypng-compress');

var htmlhint = require("gulp-htmlhint");

var cache = require('gulp-cached');

var rename = require("gulp-rename");

var crLfReplace = require("gulp-cr-lf-replace");

var base64 = require("gulp-base64");

var browserSync = require('browser-sync').create();

var notify = require('gulp-notify');

var replace = require('gulp-replace');

var mkdirp = require('mkdirp');

var dir = "src";

//背景画像をbase64でエンコード
gulp.task('base64', function () {
	return gulp
	.src('src/**/*.css')
	.pipe(cache( 'css' ))
	.pipe(base64({
		baseDir: 'src',
		extensions: ['svg', 'png', /\.jpg#datauri$/i],
		exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
		maxImageSize: 8*1024, // bytes
		debug: true
	}))
	// .pipe(concat('main.css'))
	.pipe(gulp.dest(dir))
});

//デザ課テストサーバー用にパス変更
gulp.task('path-iori', function () {
	return gulp
	.src(['src/**/*.html','src/**/*.css'])
	.pipe(replace('/public', '/iori/ekichika-gourmet/public'))
	.pipe(replace('/fuel', '/iori/ekichika-gourmet/fuel'))
	.pipe(gulp.dest(dir));
});

gulp.task('path-morishige', function () {
	return gulp
	.src(['src/**/*.html','src/**/*.css'])
	.pipe(replace('/public', '/morishige/ekichika-gourmet/public'))
	.pipe(replace('/fuel', '/morishige/ekichika-gourmet/fuel'))
	.pipe(gulp.dest(dir));
});


gulp.task("default", ['browser-sync'], function() {
//gulp.task("default", ['webserver'], function() {
	//sassの自動コンパイル（変更したファイルのみ）
	gulp.watch("sass/**/*.scss",["sass"]);
	//インポート用のsass変更時の自動コンパイル（全scssコンパイル）
	gulp.watch("sass/**/_*.scss",["sass-parts"]);
	//ejsの自動コンパイル（変更したファイルのみ）
	gulp.watch("ejs/**/*.ejs",["ejs"]);
	//インポート用のejs変更時の自動コンパイル（全ejsコンパイル）
	gulp.watch("ejs/**/_*.ejs",["ejs-parts"]);
	// ejsをコンパイルしたhtmlの文法チェック(ファイル数が増えると重くなる)
	// gulp.watch("**/*.html",["html"]);
	// gulp.watch("src/**/*.css",["base64"]);
	//画像最適化
	gulp.watch("original_images/**/*.{png,jpg,jpeg}",["tinypng"]);
	gulp.watch("src/**/*.css",["bs-reload"]);
	gulp.watch("src/**/*.html",["bs-reload"]);
	gulp.watch("src/**/*.js",["bs-reload"]);
});

// html文法チェック
gulp.task('html', function() {
	gulp.src(['**/*.html','!node_modules/**/*.html'])
	.pipe(cache( 'html' ))
	.pipe(htmlhint())
	.pipe(htmlhint.reporter())
});

//sassのコンパイル
gulp.task("sass",function(){
	gulp.src(["!sass/**/_*.scss","sass/**/*.scss","!node_modules/**/*.scss"])
	//最初にキャッシュ
	.pipe(cache( 'sass' ))
	.pipe(plumber({
		errorHandler: notify.onError("Error: <%= error.message %>")
	}))
	//sassのコンパイル
	.pipe(sass({
		outputStyle: 'expanded',
		errLogToConsole: true,
	}))
	//ベンダープレフィックス付ける
	.pipe(autoprefixer({
		browsers:  ['last 2 versions', "> 1%", "IE >= 10"],
		cascade: false
	}))
	//cssのインデント整形
	.pipe(cssbeautify({
		indent: '	',
	}))
	//何故かLFで改行されているので変更
	.pipe(crLfReplace({changeCode: 'CR+LF'}))
	//base64変換
	.pipe(base64({
		baseDir: 'src',
		extensions: ['svg', 'png', /\.jpg#datauri$/i],
		exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
		maxImageSize: 8*1024, // bytes
		debug: true
	}))
	.pipe(gulp.dest(dir))
});

//インポート用sassのコンパイル
//上のだとインポートするファイルを変更しても反映されないのでインポート用scss変更時は全scssファイルコンパイル
gulp.task("sass-parts",function(){
	gulp.src(["sass/**/*.scss","!node_modules/**/*.scss"])
	// .pipe(cache( 'sass' ))
	.pipe(plumber({
		errorHandler: notify.onError("Error: <%= error.message %>")
	}))
	.pipe(sass({
		outputStyle: 'expanded'
	}))
	.pipe(autoprefixer({
		browsers:  ['last 2 versions', "> 1%", "IE >= 10"],
		cascade: false
	}))
	.pipe(cssbeautify({
		indent: '	',
	}))
	.pipe(crLfReplace({changeCode: 'CR+LF'}))
	.pipe(base64({
		baseDir: 'src',
		extensions: ['svg', 'png', /\.jpg#datauri$/i],
		exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
		maxImageSize: 8*1024, // bytes
		debug: true
	}))
	.pipe(gulp.dest(dir))
});

//ejsコンパイル
gulp.task("ejs", function() {
	gulp.src(
	["ejs/**/*.ejs",'!' + "**/_*.ejs",'!node_modules/**/*.ejs']
	)
	//最初にキャッシュ
	.pipe(cache( 'ejs' ))
	.pipe(plumber())
	//ejsコンパイル（出力形式でhtmlを指定しているが効かない？）
	.pipe(ejs({}, {"ext": ".html"}))
	//インデント整形
	.pipe(prettify({indent_with_tabs: true,
	 unformatted: ['span','input','img','button','em','a']}))
	//.ejsのまま吐き出されるので置換
	.pipe(rename({
		extname: '.html'
	}))
	.pipe(gulp.dest(dir))
});

//インポート用ejsコンパイル（sassと同様）
gulp.task("ejs-parts", function() {
	gulp.src(
	["ejs/**/*.ejs",'!' + "**/_*.ejs",'!node_modules/**/*.ejs']
	)
	// .pipe(cache( 'ejs' ))
	.pipe(plumber())
	.pipe(ejs({}, {"ext": ".html"}))
	.pipe(prettify({indent_with_tabs: true,
	 unformatted: ['span','input','img','button','em','a']}))
	.pipe(rename({
		extname: '.html'
	}))
	.pipe(gulp.dest(dir))
});

//画像を小さくする
gulp.task('tinypng', function () {
	gulp.src('original_images/**/*.{png,jpg,jpeg}')
	.pipe(changed(dir))
	.pipe(tinyping({
		key: '_2fWgdG3-Ohpu3tDXrFlG-pAgCaRy9ZM' // TinyPNGのAPI Key1
		// key: 'HwAvpLqVAL2ULB7ytzJtOIus7u3qDAsE' // TinyPNGのAPI Key2
	}))
	.pipe(gulp.dest(dir))
});


//js結合minify(Win)
gulp.task('js-concat-win', function(){
	var dirutil = require('./dirutil');
	//htmlファイルを全部検索
	dirutil.walkDir('src/fuel', function (err, list) {
		list.forEach (function(file) {
			//htmlファイルの中身を取得（1枚ずつ）
			fs.readFile(file, "utf8", function(err,data){
				if(err){throw err;}
				//元のhtmlファイルのパスを変数に入れる
				var htmlPath = file;
				//パスをjs用に置換してから￥で切って配列に入れる
				var jsPathArr = htmlPath.replace( "fuel\\app\\views" , "public\\assets\\js" ).split("\\");
				var fileName = jsPathArr.pop();
				fileName = fileName.replace( ".html" , "" );
				//console.log(jsPathArr);
				var jsPath = "";
				for(var i = 0; i < jsPathArr.length; i++) {
					 jsPath = jsPath + ["\\"] +  jsPathArr[i];
				}

				//htmlファイルからscriptタグだけ抜き出す
				var match_result = data.match(/<script src="(.*?)<\/script>/g);
				var pathArray = [];
				//さらにjsのパスだけ抜き出して配列に入れる
				for(var idx in match_result){
					var head, hRegExp, foot, fRegExp, rs1, rs2;
					head = '<script src="/';
					hRegExp = new RegExp( head, "g" );
					foot = '"></script>';
					fRegExp = new RegExp( foot, "g" );
					rs1 = match_result[idx].replace( hRegExp , "" );
					rs2 = rs1.replace( fRegExp , "" );
					pathArray.push(rs2);
				}
				var jsContent = "";
				//配列からjsファイルを読み込んで1htmlで読み込んでいるjsをまとめる
				pathArray.forEach (function(path) {
					path = "src/" + path;
					jsContent =  jsContent + fs.readFileSync(path, "utf8", function(err,jsdata){
						if(err){throw err;}
					});
				});

				jsPath = 'C:\\works\\ekichika-gourmet_design\\' + jsPath;
				if(jsContent !== "") {
					mkdirp(jsPath, function (err) {
						if (err){throw err;}
						else {
							console.log(jsPath);
							fs.writeFile(jsPath + '\\' + fileName + '-concat.js', jsContent);
							console.log('success')
						}
					});
				}
			})
		})
	});
})

//js結合minify(Mac)
gulp.task('js-concat-mac', function(){
	var dirutil = require('./dirutil');
	//htmlファイルを全部検索
	dirutil.walkDir('src/fuel', function (err, list) {
		list.forEach (function(file) {
			//htmlファイルの中身を取得（1枚ずつ）
			fs.readFile(file, "utf8", function(err,data){
				//console.log(data);
				if(err){throw err;}
				//元のhtmlファイルのパスを変数に入れる
				var htmlPath = file;
				//パスをjs用に置換してから/で切って配列に入れる
				var jsPathArr = htmlPath.replace( "fuel\/app\/views" , "public\/assets\/js" ).split("\/");
				var fileName = jsPathArr.pop();
				fileName = fileName.replace( ".html" , "" );
				//console.log(jsPathArr);
				var jsPath = "";
				for(var i = 0; i < jsPathArr.length; i++) {
					 jsPath = jsPath + ["\/"] +  jsPathArr[i];
				}
				//console.log(jsPath);

				//htmlファイルからscriptタグだけ抜き出す
				var match_result = data.match(/<script src="(.*?)<\/script>/g);
				var pathArray = [];
				//さらにjsのパスだけ抜き出して配列に入れる
				for(var idx in match_result){
					var head, hRegExp, foot, fRegExp, rs1, rs2;
					head = '<script src="/';
					hRegExp = new RegExp( head, "g" );
					foot = '"></script>';
					fRegExp = new RegExp( foot, "g" );
					rs1 = match_result[idx].replace( hRegExp , "" );
					rs2 = rs1.replace( fRegExp , "" );
					pathArray.push(rs2);
				}
				var jsContent = "";
				//配列からjsファイルを読み込んで1htmlで読み込んでいるjsをまとめる
				var path = "";
				pathArray.forEach (function(path) {
					path = "src/" + path;
					jsContent =  jsContent + fs.readFileSync(path, "utf8", function(err,jsdata){
						if(err){throw err;}
					});
				});
				//console.log(jsContent);
				//console.log(match_result);



				jsWritePath = '\/Users\/staff\/gitDir\/ekichika-gourmet_design' + jsPath;
				if(jsContent !== "") {
					mkdirp(jsWritePath, function (err) {
						if (err){throw err;}
						else {
							fs.writeFile(jsWritePath + '\/' + fileName + '-concat.js', jsContent);
						}
					});
				}
				var concatPath = '<script src="' + jsPath + '\/' + fileName + '-concat.js' + '"></script>';
				concatPath = concatPath.replace("src/", "");
				//console.log(concatPath);
				var htmlWritePath = '\/Users\/staff\/gitDir\/ekichika-gourmet_design\/' + htmlPath;
				var htmlData = data;

				if(match_result) {
					for(var i = 0; i < match_result.length; i++) {
						console.log(match_result[i]);
						if(i == match_result.length - 1) {
							htmlData = htmlData.replace(match_result[i], concatPath);
							console.log(concatPath);
							console.log("do replace")
						} else {
							htmlData = htmlData.replace(match_result[i], "");
							console.log("do delete")
						}
					}
				}
				fs.writeFile(htmlWritePath, htmlData);
				console.log(htmlWritePath);
				// console.log(htmlData);
				// console.log('success');
			})
		})
	});
})


gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "src",
			index: "index.html"
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

//ローカルサーバー
gulp.task('webserver', function() {
	gulp.src("src/") //Webサーバーで表示するサイトのルートディレクトリを指定
	.pipe(webserver({
		livereload: true, //ライブリロードを有効に
	}));
});