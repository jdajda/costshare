"use strict";

angular.module('app.controllers', ['ui.router'])

  .controller('AppCtrl', function ($scope, StorageService, $ionicPopup, $ionicModal) {

    $scope.personsCount = StorageService.getAllPersons();
    $scope.expensesCount = StorageService.getAllExpenses();
    $scope.balanceTotal = StorageService.getTotalBalance();

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

    $ionicModal.fromTemplateUrl('templates/personsListModal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.personsListModal = modal;
    });

  })

  .controller('expensesCtrl', function ($scope, StorageService) {
    $scope.expenses = StorageService.getAllExpenses();

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

