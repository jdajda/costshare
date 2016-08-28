angular.module('app.services', ['ngStorage'])

    .factory('StorageService', function ($localStorage) {
        $localStorage = $localStorage.$default({
            expenses: [],
            balance: [],
            persons: [],
            balanceTotal: 0,
        });

        // expense related functions        
        var _getAllExpenses = function () {
            return $localStorage.expenses;
        };
        var _addExpense = function (expense) {
            $localStorage.expenses.push(expense);
            _updateBalance();
        };
        var _removeExpense = function (expense) {
            $localStorage.expenses.splice($localStorage.expenses.indexOf(expense), 1);
            _updateBalance();
        };
        var _removeAllExpenses = function () {
            $localStorage.expenses.length = 0;
            _updateBalance();
        };

        // persons related functions        
        var _getAllPersons = function () {
            return $localStorage.persons;
        };
        var _addPerson = function (personName) {
            // var color ='#'+Math.random().toString(16).substr(2,6);
            // var person = { 'name': personName, 'color': color };
            // $localStorage.persons.push(personName);
            $localStorage.persons.push(personName);
            _updateBalance();
        };
        var _removePerson = function (person) {
            $localStorage.persons.splice($localStorage.persons.indexOf(person), 1);
            _updateBalance();
        };
        var _removeAllPersons = function () {
            $localStorage.persons.length = 0;
            _updateBalance();
        };

        var _containsPerson = function (person) {
            return $localStorage.persons.indexOf(person) != -1;
        }

        // balance related functions  
        var _getTotalBalance = function () {
            return $localStorage.balanceTotal;
        }

        var _getBalance = function () {
            return $localStorage.balance;
        };

        var _updateBalance = function () {
            // reset balance
            $localStorage.balanceTotal = 0;
            $localStorage.balance.length = 0;

            var expenses = _getAllExpenses();

            // init the balance table     
            var balanceList = [];
            var allPersons = _getAllPersons();
            for (var currentPerson in allPersons) {
                var newPerson = { "person": allPersons[currentPerson], "balance": 0 };
                balanceList[allPersons[currentPerson]] = newPerson;
            }

            var totalSum = 0;
            // aggregiate the expenses
            for (var i = 0; i < expenses.length; i++) {
                var expense = expenses[i];
                totalSum += parseInt(expense.sum);
                balanceList[expense.person].balance += parseInt(expense.sum);
            }

            $localStorage.balanceTotal = totalSum;
            var averageSum = totalSum / _getAllPersons().length;
            for (var balanceItem in balanceList) {
                if (balanceList.hasOwnProperty(balanceItem)) {
                    balanceList[balanceItem].balance -= averageSum
                    $localStorage.balance.push(balanceList[balanceItem]);
                }
            }

        };

        // building service facade        
        return {
            getAllExpenses: _getAllExpenses,
            addExpense: _addExpense,
            removeExpense: _removeExpense,
            removeAllExpenses: _removeAllExpenses,
            getBalance: _getBalance,
            getTotalBalance: _getTotalBalance,
            addPerson: _addPerson,
            removePerson: _removePerson,
            removeAllPersons: _removeAllPersons,
            getAllPersons: _getAllPersons,
            containsPerson: _containsPerson
        };
    });
