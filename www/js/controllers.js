"use strict";

angular.module('app.controllers', ['ui.router'])

  .controller('AppCtrl', function ($scope, StorageService, $ionicPopup) {

    $scope.persons = StorageService.getAllPersons();
    $scope.expenses = StorageService.getAllExpenses();
    $scope.currentCurrency = StorageService.getCurrentCurrency(); 

    $scope.sservice = StorageService;
    $scope.$watch('sservice.getTotalBalance()', function (newVal) {
      $scope.balanceTotal = newVal;
    });

    $scope.deleteAllData = function () {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Deletion warning!',
        template: 'Are you sure you want to delete all expenses?'
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
    $scope.expenses = StorageService.getAllExpenses();
    $scope.getPersonColor = StorageService.getPersonColor;
  })

  .controller('personsCtrl', function ($scope, StorageService, $ionicPopup) {
    $scope.persons = StorageService.getAllPersons();
    $scope.getPersonColor = StorageService.getPersonColor;
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

      var showMissingDataAlert = function (message) {
        var alertPopup = $ionicPopup.alert({
          title: 'Missing data!',
          template: 'Please fill the person name.'
        });
      };

      var showPersonsExistsAlert = function (message) {
        var alertPopup = $ionicPopup.alert({
          title: 'Person exists!',
          template: 'Please enter different name.'
        });
      };

      if (person === undefined) {
        showMissingDataAlert();
        return;
      }

      if (StorageService.containsPerson(person)) {
        showPersonsExistsAlert();
        return;
      }

      StorageService.addPerson(person);
      $state.go('app.persons');
    };
  })

  .controller('balanceCtrl', function ($scope, StorageService) {
    $scope.getPersonColor = StorageService.getPersonColor;
    $scope.balanceList = StorageService.getBalance();
    $scope.currentCurrency = StorageService.getCurrentCurrency();
    $scope.sservice = StorageService;
    $scope.$watch('sservice.getBalance()', function (newVal) {
      $scope.balanceList = newVal;
    });


    var topAbsBalance = 0;
    for (var balanceItem in $scope.balanceList) {
      var curBalanceVal = $scope.balanceList[balanceItem].balance;
      if (topAbsBalance < curBalanceVal) {
        topAbsBalance = curBalanceVal;
      }
    }
    $scope.balanceList.map(function (x) { x.balanceNorm = Math.abs(x.balance) / topAbsBalance; return x; });
  })

  .controller('newExpenseCtrl', function ($scope, $state, StorageService, $ionicPopup) {
    $scope.rates = StorageService.getRates();
    $scope.availablePersons = StorageService.getAllPersons();
    $scope.addExpense = function (person, sum, description, currency) {

      var showAlert = function (message) {
        var alertPopup = $ionicPopup.alert({
          title: 'Missing data!',
          template: 'Please fill in all the fields!'
        });
      };

      if (person === undefined || sum === undefined || sum === null || description === undefined || currency === undefined) {
        showAlert();
        return;
      }
      var newExpense = { person: person, sum: sum, description: description, currency: currency };
      StorageService.addExpense(newExpense);
      $state.go('app.expenses');
    };
  })

  .controller('ratesCtrl', function ($scope, StorageService, $ionicPopup) {
    $scope.rates = StorageService.getRates();
    $scope.currentCurrency = StorageService.getCurrentCurrency();
    // Triggered on a button click, or some other target
    $scope.showPopup = function (rateName, rateFlag) {
      $scope.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="number" ng-model="data.newRate">',
        title: 'Enter new rate for ' + rateName + " <img src='img/flags/" + rateFlag + ".gif' />",
        subTitle: '1 ' + rateName + " = ? " + StorageService.getCurrentCurrency(),
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.newRate) {
                //don't allow the user to close unless he enters new rate
                e.preventDefault();
              } else {
                return $scope.data.newRate;
              }
            }
          }
        ]
      });

      function isInt(n) {
        return n != "" && !isNaN(n) && Math.round(n) == n;
      }
      function isFloat(n) {
        return n != "" && !isNaN(n) && Math.round(n) != n;
      }

      myPopup.then(function (res) {
        if (isInt(res) || isFloat(res)) {
          StorageService.setRate(rateName, res);
        }
      });
    };
  })

