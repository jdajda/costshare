"use strict";

angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
      })

      .state('app.expenses', {
        url: '/expenses',
        views: {
          'mainContent': {
            templateUrl: 'templates/expenses.html',
            controller: 'expensesCtrl'
          }
        }
      })

      .state('app.balance', {
        url: '/balance',
        views: {
          'mainContent': {
            templateUrl: 'templates/balance.html',
            controller: 'balanceCtrl'
          }
        }
      })

      .state('app.newExpense', {
        url: '/newexpense',
        views: {
          'mainContent': {
            templateUrl: 'templates/newExpense.html',
            controller: 'newExpenseCtrl'
          }
        }
      })

      .state('app.persons', {
        url: '/persons',
        views: {
          'mainContent': {
            templateUrl: 'templates/persons.html',
            controller: 'personsCtrl'
          }
        }
      })

      .state('app.newPerson', {
        url: '/newperson',
        views: {
          'mainContent': {
            templateUrl: 'templates/newPerson.html',
            controller: 'newPersonCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/app/expenses')
  });