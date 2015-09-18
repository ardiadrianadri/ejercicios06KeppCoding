"use strict";

var express = require('express');
var router = express.Router();
var fs = require('fs');

function getDependencies (file,callBack){
	fs.readFile(file,'utf8',function(err,data){
		if (err){
			callBack(err);
		}

		var pckObj = JSON.parse(data);
		callBack(null,pckObj);
	});
}

router.get('/',function(req, res){
	getDependencies('package.json',function(err,data){
		var listDep=[];

		if (err){
			throw err;
		}

		for (var dep in data.dependencies){
			listDep.push(dep);
		}		
		res.render('depen',{dependencies:listDep});
	});
});

module.exports = router;
