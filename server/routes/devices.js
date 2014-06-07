'use strict';

module.exports = function(app) {

    var nest = require('unofficial-nest-api');
    var UpnpControlPoint = require('../lib/upnp-controlpoint').UpnpControlPoint;
	  var wemo = require('../lib/wemo');
    var wemoIp = '192.168.1.146';
    var username = 'brelloch@gmail.com';
    var password = 'connect99';
    var globalRes = null;

    var cleanUpNestData = function (device) {
        device.current_temperature = nest.ctof(device.current_temperature);
        device.target_temperature = nest.ctof(device.target_temperature);

        return device;
    };

    // get nest info
    app.route('/nest').get(function(req, res) {
        nest.login(username, password, function (err, data) {
            if (err) {
                console.log(err.message);
                process.exit(1);
                return;
            }
            nest.fetchStatus(function (data) {
                for (var deviceId in data.device) {
                    if (data.device.hasOwnProperty(deviceId)) {
                        var device = data.shared[deviceId];

                        res.jsonp(cleanUpNestData(device));
                    }
                }
            });
        });
    });

    // set nest away
    app.route('/nest_away').get(function(req, res) {
        nest.login(username, password, function (err, data) {
            if (err) {
                console.log(err.message);
                process.exit(1);
                return;
            }
            nest.fetchStatus(function (data) {
                for (var deviceId in data.device) {
                    if (data.device.hasOwnProperty(deviceId)) {
                        var device = data.shared[deviceId];

                        nest.setTemperature(deviceId, nest.ftoc(85));
                        res.jsonp(cleanUpNestData(device));
                    }
                }
            });
        });
    });

    // set nest home
    app.route('/nest_home').get(function(req, res) {
        nest.login(username, password, function (err, data) {
            if (err) {
                console.log(err.message);
                process.exit(1);
                return;
            }
            nest.fetchStatus(function (data) {
                for (var deviceId in data.device) {
                    if (data.device.hasOwnProperty(deviceId)) {
                        var device = data.shared[deviceId];

                        nest.setTemperature(deviceId, nest.ftoc(72));
                        res.jsonp(cleanUpNestData(device));
                    }
                }
            });
        });
    });

    // increase nest temp by 1 degree
    app.route('/nest_up').get(function(req, res) {
        nest.login(username, password, function (err, data) {
            if (err) {
                console.log(err.message);
                process.exit(1);
                return;
            }
            nest.fetchStatus(function (data) {
                for (var deviceId in data.device) {
                    if (data.device.hasOwnProperty(deviceId)) {
                        var device = data.shared[deviceId];

                        nest.setTemperature(deviceId, nest.ftoc(nest.ctof(device.target_temperature) + 1));
                        res.jsonp(cleanUpNestData(device));
                    }
                }
            });
        });
    });

    // decrease nest temp by 1 degree
    app.route('/nest_down').get(function(req, res) {
        nest.login(username, password, function (err, data) {
            if (err) {
                console.log(err.message);
                process.exit(1);
                return;
            }
            nest.fetchStatus(function (data) {
                for (var deviceId in data.device) {
                    if (data.device.hasOwnProperty(deviceId)) {
                        var device = data.shared[deviceId];

                        nest.setTemperature(deviceId, nest.ftoc(nest.ctof(device.target_temperature) - 1));
                        res.jsonp(cleanUpNestData(device));
                    }
                }
            });
        });
    });


    // set all away
    app.route('/all_away').get(function(req, res) {
        var cp = new UpnpControlPoint();

        cp.on('device', handleDeviceOff);

        cp.search();

        nest.login(username, password, function (err, data) {
            if (err) {
                console.log(err.message);
                process.exit(1);
                return;
            }
            nest.fetchStatus(function (data) {
                for (var deviceId in data.device) {
                    if (data.device.hasOwnProperty(deviceId)) {
                        var device = data.shared[deviceId];
                        nest.setTemperature(deviceId, nest.ftoc(85));
                        res.jsonp(cleanUpNestData(device));
                    }
                }
            });
        });

    });

    // set all home
    app.route('/all_home').get(function(req, res) {
        var cp = new UpnpControlPoint();

        cp.on('device', handleDeviceOn);

        cp.search();

        nest.login(username, password, function (err, data) {
            if (err) {
                console.log(err.message);
                process.exit(1);
                return;
            }
            nest.fetchStatus(function (data) {
                for (var deviceId in data.device) {
                    if (data.device.hasOwnProperty(deviceId)) {
                        var device = data.shared[deviceId];

                        nest.setTemperature(deviceId, nest.ftoc(72));
                        res.jsonp(cleanUpNestData(device));
                    }
                }
            });
        });
    });

    app.route('/wemo_on').get(function(req, res) {
        var cp = new UpnpControlPoint();

        cp.on('device', handleDeviceOn);

        cp.search();

        res.jsonp('on');
    });
    var handleDeviceOn = function(device) {
        console.log('device type: ' + device.deviceType + ' location: ' + device.location);
      	switch(device.deviceType) {

      	case wemo.WemoControllee.deviceType:
      		var wemoSwitch = new wemo.WemoControllee(device);
      		wemoSwitch.on('BinaryState', function(value) {
      			console.log('wemo switch state change: ' + value);
      		});

      			wemoSwitch.setBinaryState(true);

      		break;

      	case wemo.WemoSensor.deviceType:
      		var wemoSensor = new wemo.WemoSensor(device);
      		wemoSensor.on('BinaryState', function(value) {
      			console.log('wemo motion sensor state change: ' + value);
      		});
      		break;
      	}

    };

    var handleDeviceOff = function(device) {
        console.log('device type: ' + device.deviceType + ' location: ' + device.location);
        switch(device.deviceType) {

        case wemo.WemoControllee.deviceType:
          var wemoSwitch = new wemo.WemoControllee(device);
          wemoSwitch.on('BinaryState', function(value) {
            console.log('wemo switch state change: ' + value);
          });

            wemoSwitch.setBinaryState(false);

          break;

        case wemo.WemoSensor.deviceType:
          var wemoSensor = new wemo.WemoSensor(device);
          wemoSensor.on('BinaryState', function(value) {
            console.log('wemo motion sensor state change: ' + value);
          });
          break;
        }

    };

    app.route('/wemo_off').get(function(req, res) {
        var cp = new UpnpControlPoint();

        cp.on('device', handleDeviceOff);

        cp.search();

        res.jsonp('off');

    });


    // set all away
    app.route('/wemo_address').get(function(req, res) {
        wemo.discover(function(wemos) {
          console.log(wemos);
          res.jsonp(wemos);

        });
    });
};
