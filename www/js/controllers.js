"use strict";

angular.module('app.controllers', [ 'ui.router'])

  .controller('expensesCtrl', function ($scope, StorageService) {
    // var query = "SELECT * FROM persons";
    // $cordovaSQLite.execute($scope.db, query).then(function (res) {
    //   console.log("aaa: insertId: " + res.insertId);
    // }, function (err) {
    //   console.error("aa: " + err.message);
    // });
    $scope.expenses = StorageService.getAll();

    // $scope.expenses = [{ id: "1", person: "Aga", sum: "30", description: "opłata za autostradę", currency: "zł" },
    //   { id: "2", person: "Renia", sum: "50", description: "bramki", currency: "euro" }];

  })

  .controller('balanceCtrl', function ($scope) {

  })

  .controller('newExpenseCtrl', function ($scope, $state, StorageService) {
    
    $scope.addExpense = function (person, sum, description, currency) {
      var newExpense = { person: person, sum: sum, description: description, currency: currency };
      StorageService.add(newExpense);
      $state.go('tabsController.expenses')
    };  
  })

