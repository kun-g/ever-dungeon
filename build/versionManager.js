(function() {
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
    function VersionManager(branchConfig) {
      var config, name, _ref;
      this.branchConfig = branchConfig;
      this.baseConfig = {};
      this.fileListDB = {};
      this.versionDB = {};
      this.rootPath = "";
      this.searchPath = "";
      this.fileUtil = {};
      _ref = this.branchConfig;
      for (name in _ref) {
        config = _ref[name];
        this.fileListDB[name] = {};
        this.versionDB[name] = {};
      }
    }

    VersionManager.prototype.init = function(branch, cb) {
      return this.initMasterBranch((function(_this) {
        return function() {
          return _this.initBranch(_this.searchPath + branch + '/', branch, _this.branchConfig[branch].version, cb);
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
          _this.versionDB[config.branch][config.version] = config;
          if (config.prevVersion == null) {
            return cb(err, _this.versionDB[config.branch]);
          }
          if (_this.versionDB[config.branch][config.prevVersion] != null) {
            return cb(err, _this.versionDB[config.branch]);
          }
          return _this.loadVersionConfig(basePath, config.prevVersion, cb);
        };
      })(this);
      return fileUtil.loadJSON(path + 'project.manifest', ccb);
    };

    VersionManager.prototype.initBranch = function(path, branch, version, cb) {
      var parentBranch;
      if (this.getVersion(branch, version) != null) {
        return cb();
      }
      parentBranch = this.branchConfig[branch].parentBranch;
      if (parentBranch && (this.getVersion(parentBranch, this.branchConfig[parentBranch].version) == null)) {
        return this.initBranch(path, parentBranch, this.branchConfig[parentBranch].version, (function(_this) {
          return function() {
            return _this.loadVersionConfig(path, version, cb);
          };
        })(this));
      } else {
        return this.loadVersionConfig(path, version, cb);
      }
    };

    VersionManager.prototype.initMasterBranch = function(cb) {
      return this.initBranch(this.rootPath, 'master', null, (function(_this) {
        return function(err, _) {
          return _this.initBranch(_this.searchPath + 'master/', 'master', _this.branchConfig.master.version, cb);
        };
      })(this));
    };

    VersionManager.prototype.getVersion = function(branch, version) {
      var config, parentBranch, parentVersion, path, result, temp, versionConfig;
      if (this.fileListDB[branch][version] != null) {
        return this.fileListDB[branch][version];
      }
      config = this.versionDB[branch];
      if (config == null) {
        return null;
      }
      versionConfig = config[version];
      if (versionConfig == null) {
        return null;
      }
      path = versionConfig.path;
      result = versionConfig.files.reduce((function(r, e) {
        r[e] = path + e;
        return r;
      }), {});
      if (versionConfig.prevVersion) {
        result = mergeFileList(this.getVersion(branch, versionConfig.prevVersion), result);
      }
      if (versionConfig.parentVersion) {
        parentBranch = this.branchConfig[branch].parentBranch;
        parentVersion = versionConfig.parentVersion;
        temp = this.getVersion(parentBranch, parentVersion);
        result = mergeFileList(temp, result);
      }
      this.fileListDB[branch][version] = clone(result);
      if (addSearchPath) {
        addSearchPath(path, true);
      }
      return result;
    };

    VersionManager.prototype.setBaseConfig = function(baseConfig) {
      this.baseConfig = baseConfig;
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
