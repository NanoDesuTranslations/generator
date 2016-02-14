var tungus = require('tungus');
var mongoose = require('mongoose');

var config = require('config');

if(!config.get("loader.uri")){
	throw new Error("No database uri in config.");
}
mongoose.connect(config.get("loader.uri"), function (err) {
	if(err) {
		console.log('connection error', err);
		throw err;
	} else {
		console.log('connection successful');
	}
});

var Page = require('./models/page.js');
var Series = require('./models/series.js');

var structure = require("./structure");

module.exports = plugin;

function dictBy(array, predicate){
	var d = {};
	array.forEach(function(v,i){
		d[predicate(v)] = v;
	});
	return d;
}

function groupBy(array, predicate){
	var d = {};
	for(var k in array){
		var v = array[k];
		k = predicate(v);
		if(d[k]){
			d[k].push(v);
		}else{
			d[k] = [];
			d[k].push(v);
		}
	}
	return d;
}

function filter(array, predicate){
	var a = [];
	for(var k in array){
		var v = array[k];
		if(predicate(v)){
			a.push(v);
		}
	}
	return a;
}

/**
 * A Metalsmith plugin to load pages.
 *
 * @return {Function}
 */

function plugin(){
	return function(files, metalsmith, done){
		load(function(pages, series){
			metalsmith.pages = pages;
			metalsmith.series = series;
			
			for(var k in series){
				if(series[k].config && series[k].config.url){
					series[k].url = series[k].config.url;
				}else{
					var url = series[k].name.toLowerCase().replace(" ", "-");
					series[k].url = url;
				}
			}
			series = dictBy(series, function(v){return v.id;});
			
			metalsmith._metadata.pages = pages;
			metalsmith._metadata.series = series;
			
			pages.forEach(function(v,i){
				var page = v;
				var serie = series[page.series];
				if(!serie){return;}
				
				var path = structure.buildpath(page, serie);
				
				var mspage = {mode:'0666', series:serie};
				if(page.content && config.get("contents")){
					mspage.contents = new Buffer(page.content);
				}else{
					mspage.contents = new Buffer("");
				}
				if(typeof page.meta != 'string'){
					for(var k in page.meta){
						if(!mspage[k]){
							mspage[k] = page.meta[k];
						}
					}
				}
				if(config.get('loader.debug')){
					console.log(path);
					console.log(mspage);
				}
				files[path] = mspage;
			});
			done();
		});
	};
}

function load(callback){
	Page.find({},
		function (err, pages) {
			if (err) throw err;
			Series.find(
				function (err, series) {
					if (err) throw err;
					callback(pages, series);
				}
			);
		}
	);
}
