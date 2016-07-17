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
          StorageService.removeAll();
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
    $scope.expenses = StorageService.getAll();

    // $scope.expenses = [{ id: "1", person: "Aga", sum: "30", description: "opłata za autostradę", currency: "zł" },
    //   { id: "2", person: "Renia", sum: "50", description: "bramki", currency: "euro" }];

  })

  .controller('balanceCtrl', function ($scope, StorageService) {
    var balanceList = [];
    var totalSum = 0;

    var expenses = StorageService.getAll();
    for (var i = 0; i < expenses.length; i++) {
      var expense = expenses[i];
      totalSum += parseInt(expense.sum);
      if (balanceList[expense.person] === undefined) {
        var person = { "person": expense.person, "balance": parseInt(expense.sum) };
        balanceList[expense.person] = person;
      } else {
        balanceList[expense.person].balance += parseInt(expense.sum);
      }
    }

    var balanceItemsCount = 0;
    for (var balanceItem in balanceList) {
      if (balanceList.hasOwnProperty(balanceItem)) {
        ++balanceItemsCount;
      }
    }


    var averageSum = totalSum / balanceItemsCount;
    $scope.balanceList = [];
    for (var balanceItem in balanceList) {
      if (balanceList.hasOwnProperty(balanceItem)) {
        balanceList[balanceItem].balance -= averageSum
        $scope.balanceList.push(balanceList[balanceItem]);
      }
    }

  })

  .controller('newExpenseCtrl', function ($scope, $state, StorageService, $ionicPopup) {


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
      StorageService.add(newExpense);
      $state.go('app.expenses');
    };
  })

