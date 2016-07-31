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
          'tab-expense': {
            templateUrl: 'templates/expenses.html',
            controller: 'expensesCtrl'
          }
        }
      })

      .state('app.balance', {
        url: '/balance',
        views: {
          'tab-balance': {
            templateUrl: 'templates/balance.html',
            controller: 'balanceCtrl'
          }
        }
      })

      .state('app.newExpense', {
        url: '/newexpense',
        views: {
          'tab-expense': {
            templateUrl: 'templates/newExpense.html',
            controller: 'newExpenseCtrl'
          }
        }
      })

      .state('app.persons', {
        url: '/persons',
        views: {
          'tab-expense': {
            templateUrl: 'templates/persons.html',
            controller: 'personsCtrl'
          }
        }
      })

      .state('app.newPerson', {
        url: '/newperson',
        views: {
          'tab-expense': {
            templateUrl: 'templates/newPerson.html',
            controller: 'newPersonCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/app/expenses')
  });