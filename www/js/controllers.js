"use strict";

angular.module('app.controllers', ['ui.router'])

  .controller('AppCtrl', function ($scope, StorageService, $ionicPopup) {

    $scope.deleteAllData = function () {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Deletion warning!',
        template: 'Are you sure you want to delete all data?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          StorageService.removeAllExpenses();
        } else {
        }

      });

    };
  })

  .controller('expensesCtrl', function ($scope, StorageService) {
    // var query = "SELECT * FROM persons";
    // $cordovaSQLite.execute($scope.db, query).then(function (res) {
    //   console.log("aaa: insertId: " + res.insertId);
    // }, function (err) {
    //   console.error("aa: " + err.message);
    // });
    $scope.expenses = StorageService.getAllExpenses();

    // $scope.expenses = [{ id: "1", person: "Aga", sum: "30", description: "opłata za autostradę", currency: "zł" },
    //   { id: "2", person: "Renia", sum: "50", description: "bramki", currency: "euro" }];

  })

  .controller('personsCtrl', function ($scope, StorageService, $ionicPopup) {
    $scope.persons = StorageService.getAllPersons();
    $scope.deleteAllPersons = function () {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Deletion warning!',
        template: 'Are you sure you want to delete all persons? This will also clear all your expense data!'
      });

      confirmPopup.then(function (res) {
        if (res) {
          StorageService.removeAllPersons();
          StorageService.removeAllExpenses();
         } 
      });
    };
  })

  .controller('newPersonCtrl', function ($scope, $state, StorageService, $ionicPopup) {

    $scope.addPerson = function (person) {

      var showAlert = function (message) {
        var alertPopup = $ionicPopup.alert({
          title: 'Missing data!',
          template: 'Please fill the person name!'
        });
      };

      if (person === undefined) {
        showAlert();
        return;
      }
      StorageService.addPerson(person);
      $state.go('app.persons');
    };
  })

  .controller('balanceCtrl', function ($scope, StorageService) {
    $scope.balanceList = StorageService.getBalance();
  })

  .controller('newExpenseCtrl', function ($scope, $state, StorageService, $ionicPopup) {

    $scope.availablePersons = StorageService.getAllPersons();
    $scope.addExpense = function (person, sum, description, currency) {

      var showAlert = function (message) {
        var alertPopup = $ionicPopup.alert({
          title: 'Missing data!',
          template: 'Please fill in all the fields!'
        });
      };

      if (person === undefined || sum === undefined || description === undefined || currency === undefined) {
        showAlert();
        return;
      }
      var newExpense = { person: person, sum: sum, description: description, currency: currency };
      StorageService.addExpense(newExpense);
      $state.go('app.expenses');
    };
  })

