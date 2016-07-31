angular.module('app.services', ['ngStorage'])

    .factory('StorageService', function ($localStorage) {
        $localStorage = $localStorage.$default({
            expenses: [],
            balance: [],
            persons: []
        });

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

        var _getAllPersons = function () {
            return $localStorage.persons;
        };
        var _addPerson = function (person) {
            $localStorage.persons.push(person);
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
        
        var _getBalance = function () {
            return $localStorage.balance;
        };

        var _updateBalance = function () {
            var balanceList = [];
            var totalSum = 0;

            $localStorage.balance.length = 0;            
            if (_getAllPersons().length < 2) {
                return;
            }

            var expenses = _getAllExpenses();
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
            for (var balanceItem in balanceList) {
                if (balanceList.hasOwnProperty(balanceItem)) {
                    balanceList[balanceItem].balance -= averageSum
                    $localStorage.balance.push(balanceList[balanceItem]);
                }
            }

        };

        return {
            getAllExpenses: _getAllExpenses,
            addExpense: _addExpense,
            removeExpense: _removeExpense,
            removeAllExpenses: _removeAllExpenses,
            getBalance: _getBalance,
            addPerson: _addPerson,
            removePerson: _removePerson,
            removeAllPersons: _removeAllPersons,
            getAllPersons: _getAllPersons
        };
    });
