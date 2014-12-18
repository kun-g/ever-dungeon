/**
 * DEVELOPED BY
 * GIL LOPES BUENO
 * gilbueno.mail@gmail.com
 *
 * WORKS WITH:
 * IE 9+, FF 4+, SF 5+, WebKit, CH 7+, OP 12+, BESEN, Rhino 1.7+
 *
 * FORK:
 * https://github.com/melanke/Watch.JS
 */

"use strict";
(function (factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        window.WatchJS = factory();
        window.watch = window.WatchJS.watch;
        window.unwatch = window.WatchJS.unwatch;
        window.callWatchers = window.WatchJS.callWatchers;
    }
}(function () {

	//Proxy = require('../addon/proxy/nodeproxy');
	var Proxy = require('../../addon/proxy/nodeproxy');
    var WatchJS = {
        noMore: false,
        unique: true
    },
    defineWatcher,
    unwatchOne,
    callWatchers;

    var isFunction = function (functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
    };

    var isInt = function (x) {
        return x % 1 === 0;
    };

    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var isModernBrowser = function () {
        return Object.defineProperty || Object.prototype.__defineGetter__;
    };

    var defineNewPropertyProxy = function(obj,prop) {
        if(!obj.newProperty) {
            obj.newProperty = function (name, value) {

                obj[name]= value;
                console.log(' newProperty ', name);
                obj.watchers[prop].forEach(function(func) {
                    defineWatcher(obj, name, func, false);
                });
                defineWatcher(obj, name, obj.__runOnceWhenSet[prop], true);
                callWatchers(obj, name, "new", value);

            }
        }
    }
	var defineNewPropertyProxy1 = function(obj, prop){
        obj = obj ||{};
        return Proxy.create({
            get: function(rec, name) {
            	if (name === "valueOf" || name === "toString") { 
            		return function(){
            			return obj[name]();
            		};
            	}
            	return obj[name];
            },
            set: function(rec,name,value){
                if(!obj[name] && value != null){
                    console.log(' newProperty ', name);
                    obj.watchers[prop].forEach(function(func) {
                        defineWatcher(obj, name, func, false);
                    });
                    defineWatcher(obj, name, obj.__runOnceWhenSet[prop], true);
                    callWatchers(obj, name, "new", value);
                }
                obj[name]= value;
            },
        },
        obj.constructor.prototype);


    }
    var defineGetAndSet = function (obj, propName,getter, setter) {
	
        try {
                Object.defineProperty(obj, propName, {
                        get: getter,
                        set: setter,
                        enumerable: true,
                        configurable: true
                });
        } catch(error) {
            try{
                Object.prototype.__defineGetter__.call(obj, propName, getter);
                Object.prototype.__defineSetter__.call(obj, propName, setter);
            }catch(error2){
                throw "watchJS error: browser not supported :/"
            }
        }
    };

    var defineProp = function (obj, propName, value) {
        try {
            Object.defineProperty(obj, propName, {
                enumerable: false,
                configurable: true,
                writable: false,
                value: value
            });
        } catch(error) {
            obj[propName] = value;
        }
    };

    var watch = function () {

        if (isFunction(arguments[1])) {
            watchAll.apply(this, arguments);
        } else if (isArray(arguments[1])) {
            watchMany.apply(this, arguments);
        } else {
            watchOne.apply(this, arguments);
        }

    };


    var watchAll = function (obj, watcher, level,singleton) {

        if (obj instanceof String || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        var props = [];


        if(isArray(obj)) {
            for (var prop = 0; prop < obj.length; prop++) { //for each item if obj is an array
                props.push(prop); //put in the props
            }
        } else {
            for (var prop2 in obj) { //for each attribute if obj is an object
                props.push(prop2); //put in the props
            }
        }

        return watchMany(obj, props, watcher, level, singleton); //watch all itens of the props
    };


    var watchMany = function (obj, props, watcher, level,singleton) {

        for (var prop in props) { //watch each attribute of "props" if is an object
            //obj = watchOne(obj, props[prop], watcher, level,singleton);
            watchOne(obj, props[prop], watcher, level,singleton);
        }

        return obj;
    };

    var watchOne = function (obj, prop, watcher, level,singleton) {

        if(isFunction(obj[prop])) { //dont watch if it is a function
            return;
        }

        if(obj[prop] != null && (level === undefined || level > 0)){
            if(level !== undefined){
                level--;
            }
            //obj[prop] = watchAll(obj[prop], watcher, level,singleton); //recursively watch all attributes of this
            watchAll(obj[prop], watcher, level,singleton); //recursively watch all attributes of this
        }

		if(!obj.__watched){
            defineProp(obj, '__watched' , true);
            //obj = defineNewPropertyProxy(obj, prop);
            defineNewPropertyProxy(obj, prop);
		}

        defineWatcher(obj, prop, watcher, singleton);
		return obj;

    };

    var unwatch = function () {

        if (isFunction(arguments[1])) {
            this = unwatchAll.apply(this, arguments);
        } else if (isArray(arguments[1])) {
            this = unwatchMany.apply(this, arguments);
        } else {
            this = unwatchOne.apply(this, arguments);
        }

    };

    var unwatchAll = function (obj, watcher) {

        if (obj instanceof String || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        var props = [];


        if (isArray(obj)) {
            for (var prop = 0; prop < obj.length; prop++) { //for each item if obj is an array
                props.push(prop); //put in the props
            }
        } else {
            for (var prop2 in obj) { //for each attribute if obj is an object
                props.push(prop2); //put in the props
            }
        }

        unwatchMany(obj, props, watcher); //watch all itens of the props
    };


    var unwatchMany = function (obj, props, watcher) {

        for (var prop2 in props) { //watch each attribute of "props" if is an object
            unwatchOne(obj, props[prop2], watcher);
        }
    };

    if(isModernBrowser()){

        defineWatcher = function (obj, prop, watcher,singleton) {

            var val = obj[prop];

            watchFunctions(obj, prop);

            if (!obj.watchers) {
                defineProp(obj, "watchers", {});
            }

            if (!obj.watchers[prop]) {
                obj.watchers[prop] = [];
            }

			if (singleton) {
				console.log('add to sing', prop, watcher);
				if(!obj.__runOnceWhenSet){
					defineProp(obj, "__runOnceWhenSet", {});
				}
				obj.__runOnceWhenSet[prop] = watcher;
			}
			else {
				console.log('add to array', prop, watcher);
				obj.watchers[prop].push(watcher); //add the new watcher in the watchers array
			}



            var getter = function () {
                //console.log('getter', val,prop,'---');
                return val;
            };
			getter.toString = function() {
				return string(val);
			}
            var setter = function (newval) {
                //console.log('setter', newval,'---',prop);
                var oldval = val;
                val = newval;

                if (obj[prop]){
                    //obj[prop] = watchAll(obj[prop], watcher);
                    watchAll(obj[prop], watcher);
                }

                watchFunctions(obj, prop);

                if (!WatchJS.noMore){
                    if (oldval !== newval) {
                        callWatchers(obj, prop, "set", newval, oldval);
                        WatchJS.noMore = false;
                    }
                }
            };

            defineGetAndSet(obj, prop, getter, setter);

        };

        callWatchers = function (obj, prop, action, newval, oldval) {

            for (var wr in obj.watchers[prop]) {
                if (isInt(wr)){
                    obj.watchers[prop][wr].call(obj, prop, action, newval, oldval);
                }
            }
			var runOnce = obj.__runOnceWhenSet[prop];
            console.log('++++++++', prop, obj.watchers[prop].length, runOnce != null);
			if (runOnce != null) {
				runOnce.call(obj, prop, action, newval, oldval);
			}
        };

        // @todo code related to "watchFunctions" is certainly buggy
        var methodNames = ['pop', 'push', 'reverse', 'shift', 'sort', 'slice', 'unshift'];
        var defineArrayMethodWatcher = function (obj, prop, original, methodName) {
            defineProp(obj[prop], methodName, function () {
                var response = original.apply(obj[prop], arguments);
                //obj = watchOne(obj, obj[prop]);
                watchOne(obj, obj[prop]);
                if (methodName !== 'slice') {
                    callWatchers(obj, prop, methodName,arguments);
                }
                return response;
            });
        };

        var watchFunctions = function(obj, prop) {

            if ((!obj[prop]) || (obj[prop] instanceof String) || (!isArray(obj[prop]))) {
                return;
            }

            for (var i = methodNames.length, methodName; i--;) {
                methodName = methodNames[i];
                defineArrayMethodWatcher(obj, prop, obj[prop][methodName], methodName);
            }

        };

        unwatchOne = function (obj, prop, watcher) {
            for(var i in obj.watchers[prop]){
                var w = obj.watchers[prop][i];

                if(w == watcher) {
                    obj.watchers[prop].splice(i, 1);
                }
            }
			if(obj["__runOnceWhenSet"] == watcher){
				delete obj["__runOnceWhenSet"]
			}
        };

    } else {
        //this implementation dont work because it cant handle the gap between "settings".
        //I mean, if you use a setter for an attribute after another setter of the same attribute it will only fire the second
        //but I think we could think something to fix it

        var subjects = [];

        defineWatcher = function(obj, prop, watcher){

            subjects.push({
                obj: obj,
                prop: prop,
                serialized: JSON.stringify(obj[prop]),
                watcher: watcher
            });

        };

        unwatchOne = function (obj, prop, watcher) {

            for (var i in subjects) {
                var subj = subjects[i];

                if (subj.obj == obj && subj.prop == prop && subj.watcher == watcher) {
                    subjects.splice(i, 1);
                }

            }

        };

        callWatchers = function (obj, prop, action, value) {

            for (var i in subjects) {
                var subj = subjects[i];

                if (subj.obj == obj && subj.prop == prop) {
                    subj.watcher.call(obj, prop, action, value);
                }

            }

        };

        var loop = function(){

            for(var i in subjects){

                var subj = subjects[i];
                var newSer = JSON.stringify(subj.obj[subj.prop]);
                if(newSer != subj.serialized){
                    subj.watcher.call(subj.obj, subj.prop, subj.obj[subj.prop], JSON.parse(subj.serialized));
                    subj.serialized = newSer;
                }

            }

        };

        setInterval(loop, 50);

    }

    WatchJS.watch = watch;
    WatchJS.unwatch = unwatch;
    WatchJS.callWatchers = callWatchers;

    return WatchJS;

}));
