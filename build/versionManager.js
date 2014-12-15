(function() {
  "use strict";
  var VersionManager, clone, fileUtil, mergeFileList;

  clone = function(obj) {
    var k, ret, v;
    if (Array.isArray(obj)) {
      ret = [];
    } else {
      ret = {};
    }
    for (k in obj) {
      v = obj[k];
      ret[k] = v;
    }
    return ret;
  };

  mergeFileList = function(baseFileList, targetFileList) {
    var k, ret, v;
    ret = clone(baseFileList);
    for (k in targetFileList) {
      v = targetFileList[k];
      ret[k] = v;
    }
    return ret;
  };

  fileUtil = {};

  exports.setFileUtil = function(aFileUtil) {
    return fileUtil = aFileUtil;
  };

  VersionManager = (function() {
    function VersionManager() {
      this.fileListDB = {};
      this.versionDB = {};
      this.rootPath = "";
      this.searchPath = "";
      this.fileUtil = {};
    }

    VersionManager.prototype.init = function(version, cb) {
      return this.initVersion(this.rootPath, null, (function(_this) {
        return function() {
          return _this.initVersion(_this.searchPath, version, cb);
        };
      })(this));
    };

    VersionManager.prototype.loadVersionConfig = function(basePath, version, cb) {
      var ccb, path;
      path = basePath;
      if (version != null) {
        path += version + '/';
      }
      ccb = (function(_this) {
        return function(err, config) {
          if (config == null) {
            return cb(err);
          }
          config.path = path;
          _this.versionDB[config.version] = config;
          if (config.prevVersion != null) {
            return _this.initVersion(basePath, config.prevVersion, cb);
          } else {
            return cb(err);
          }
        };
      })(this);
      return fileUtil.loadJSON(path + 'project.manifest', ccb);
    };

    VersionManager.prototype.getChangeList = function(fromVersion, toVersion) {
      var res, version, versionConfig;
      version = toVersion;
      res = [];
      while (version !== fromVersion) {
        versionConfig = this.versionDB[version];
        if (!(versionConfig != null ? versionConfig.prevVersion : void 0)) {
          return [];
        }
        res = res.concat(versionConfig.files);
        version = versionConfig.prevVersion;
      }
      return res;
    };

    VersionManager.prototype.initVersion = function(basePath, version, cb) {
      if (this.getVersion(version, false) != null) {
        return cb();
      }
      return this.loadVersionConfig(basePath, version, cb);
    };

    VersionManager.prototype.isParentVersion = function(thisVersion, parentVersion) {
      var version;
      version = thisVersion;
      while (version !== parentVersion) {
        if (!this.versionDB[version].prevVersion) {
          return false;
        }
        version = this.versionDB[version].prevVersion;
      }
      return true;
    };

    VersionManager.prototype.getVersion = function(version, flag) {
      var path, result, versionConfig;
      if (this.fileListDB[version] != null) {
        return this.fileListDB[version];
      }
      versionConfig = this.versionDB[version];
      if (versionConfig == null) {
        return null;
      }
      path = versionConfig.path;
      result = versionConfig.files.reduce((function(r, e) {
        r[e] = path + e;
        return r;
      }), {});
      if (versionConfig.prevVersion) {
        result = mergeFileList(this.getVersion(versionConfig.prevVersion), result);
      }
      this.fileListDB[version] = clone(result);
      if ((typeof addSearchPath !== "undefined" && addSearchPath !== null) && !flag) {
        addSearchPath(path, true);
      }
      return result;
    };

    VersionManager.prototype.setRootPath = function(rootPath) {
      this.rootPath = rootPath;
    };

    VersionManager.prototype.setSearchPath = function(searchPath) {
      this.searchPath = searchPath;
    };

    return VersionManager;

  })();

  exports.VersionManager = VersionManager;

}).call(this);
