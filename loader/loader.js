var config = require('config');

if(config.get("loader.uri").indexOf("tingodb://") != -1){
	var tungus = require('tungus');
	console.log("Tungus Activated.");
}
var mongoose = require('mongoose');

if(!config.has("loader.uri")){
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
var fromtree = require("./fromtree");

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

function setSeriesUrls(series){
	for(var k in series){
		if(series[k].config && series[k].config.url){
			series[k].url = series[k].config.url;
		}else{
			var url = series[k].name.toLowerCase().replace(" ", "-");
			series[k].url = url;
		}
	}
}

/**
 * A Metalsmith plugin to load pages.
 *
 * @return {Function}
 */

function plugin(){
	return function(files, metalsmith, done){
		load(function(pages, series){
			setSeriesUrls(series);
			series = dictBy(series, function(v){return v.id;});
			
			//metalsmith.pages = pages;
			//metalsmith.series = series;
			
			//make data available to templates
			metalsmith._metadata.pages = pages;
			metalsmith._metadata.series = series;
			
			var tree = structure.createTree(pages, series);
			
			var realpages = fromtree.pages(tree, series);
			for(var page_k in realpages){files[page_k] = realpages[page_k];}
			
			mongoose.disconnect();
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
