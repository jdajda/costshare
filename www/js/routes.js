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

      // .state('app.tabsController', {
      //   url: '/page1',
      //   views: {
      //     'menuContent': {
      //       templateUrl: 'templates/tabsController.html',
      //       abstract: true
      //     }
      //   }
      // })

      .state('app.newExpense', {
        url: '/newexpense',
        views: {
          'tab-expense': {
            templateUrl: 'templates/newExpense.html',
            controller: 'newExpenseCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/app/expenses')
  });