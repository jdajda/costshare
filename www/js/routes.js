"use strict";

angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('tabsController.expenses', {
        url: '/expenses',
        views: {
          'tab2': {
            templateUrl: 'templates/expenses.html',
            controller: 'expensesCtrl'
          }
        }
      })

      .state('tabsController.balance', {
        url: '/balance',
        views: {
          'tab3': {
            templateUrl: 'templates/balance.html',
            controller: 'balanceCtrl'
          }
        }
      })

      .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract: true
      })

      .state('tabsController.newExpense', {
        url: '/newexpense',
        views: {
          'tab2': {
            templateUrl: 'templates/newExpense.html',
            controller: 'newExpenseCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/page1/expenses')
  });