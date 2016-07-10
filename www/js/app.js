"use strict";

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngStorage', 'ngCordova'])

  // create a new factory
  .factory('StorageService', function ($localStorage) {
    $localStorage = $localStorage.$default({
      expenses: []
    });

    var _getAll = function () {
      return $localStorage.expenses;
    };
    var _add = function (expense) {
      $localStorage.expenses.push(expense);
    }
    var _remove = function (expense) {
      $localStorage.expenses.splice($localStorage.expenses.indexOf(expense), 1);
    }
    return {
      getAll: _getAll,
      add: _add,
      remove: _remove
    };
  })

  .run(function ($ionicPlatform, $cordovaSQLite, $rootScope) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      // if (window.cordova) {
      //   $rootScope.db = $cordovaSQLite.openDB({ name: "expenses.db", location: 'default' }); //device
      //   console.log("Android");
      // } else{
      // window.openDatabase = function(dbname, ignored1, ignored2, ignored3) {
      //   return window.sqlitePlugin.openDatabase({name: dbname, location: 'default'});
      // };
      //   $rootScope.db = window.openDatabase("expenses.db", '1', 'expenses.db', 1024 * 1024 * 100); // browser
      //   console.log("browser");
      // }

      // var query = "SELECT * FROM persons";
      // $cordovaSQLite.execute($rootScope.db, query).then(function(res) {
      //   console.log("insertId: " + res.insertId);
      // }, function (err) {
      //   console.error(err);
      // });

      //$rootScope.db = window.sqlitePlugin.openDatabase( {name: "expenses.db", createFromLocation: 1} );

      // StorageService.add({ id: "1", person: "Aga", sum: "30", description: "opłata za autostradę", currency: "zł" });
      // StorageService.add({ id: "2", person: "Renia", sum: "50", description: "bramki", currency: "euro" });

    });

  })
