angular.module('app.services', ['ngStorage'])

    .factory('StorageService', function ($localStorage) {
        $localStorage = $localStorage.$default({
            expenses: [],
            balance: [],
            persons: [],
            rates: {
                PLN: { value: 1, flag: "pl" },
                EUR: { value: 4.3651, flag: "europeanunion" },
                USD: { value: 3.9091, flag: "us" },
                CHF: { value: 3.9914, flag: "ch" },
                GBP: { value: 5.2021, flag: "gb" }
            },
            currentCurrency: "PLN",
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
            var color = '#' + Math.random().toString(16).substr(2, 6);
            var newPerson = { 'name': personName, 'color': color };
            // $localStorage.persons[personName] = person;
            $localStorage.persons.push(newPerson);
            _updateBalance();
        };
        // var _removePerson = function (personName) {
        //     delete $localStorage.persons[personName];
        //     // $localStorage.persons.splice($localStorage.persons.indexOf(person), 1);
        //     _updateBalance();
        // };
        var _removeAllPersons = function () {
            $localStorage.persons.length = 0;
            _updateBalance();
        };

        var _containsPerson = function (personName) {
            var elementPos = $localStorage.persons.map(function (x) { return x.name; }, this).indexOf(personName);
            return elementPos != -1;
        }

        var _getPersonColor = function (personName) {
            var foundPerson = _getAllPersons().find(function (x) { return x.name === personName });
            return foundPerson.color;
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

            if (_getAllPersons().length == 0) {
                return;
            }

            var expenses = _getAllExpenses();
            var rates = _getRates();

            // init the balance table     
            var balanceList = [];
            // var personNames = Object.keys(allPersons);
            var personNames = _getAllPersons().map(function (x) { return x.name; })
            for (var personIt in personNames) {
                var currentPersonName = personNames[personIt];
                var newPerson = { "person": currentPersonName, "balance": 0 };
                balanceList[currentPersonName] = newPerson;
            }

            var totalSum = 0;
            // aggregiate the expenses
            for (var i = 0; i < expenses.length; i++) {
                var expense = expenses[i];
                var calculatedSum = rates[expense.currency].value * parseInt(expense.sum);
                totalSum += calculatedSum;
                balanceList[expense.person].balance += calculatedSum;
            }

            $localStorage.balanceTotal = totalSum;
            var averageSum = totalSum / personNames.length;
            for (var balanceItem in balanceList) {
                if (balanceList.hasOwnProperty(balanceItem)) {
                    balanceList[balanceItem].balance -= averageSum;
                    $localStorage.balance.push(balanceList[balanceItem]);
                }
            }
        };

        // currency rates related function
        var _getRates = function () {
            return $localStorage.rates;
        }

        var _getRateNames = function () {
            return Object.keys($localStorage.rates);
        }

        var _setRate = function (currency, value) {
            $localStorage.rates[currency].value = value;
        }

        var _getCurrentCurrency = function () {
            return $localStorage.currentCurrency;
        }


        // building service facade        
        return {
            getAllExpenses: _getAllExpenses,
            addExpense: _addExpense,
            removeExpense: _removeExpense,
            removeAllExpenses: _removeAllExpenses,
            getBalance: _getBalance,
            getTotalBalance: _getTotalBalance,
            addPerson: _addPerson,
            // removePerson: _removePerson,
            removeAllPersons: _removeAllPersons,
            getAllPersons: _getAllPersons,
            containsPerson: _containsPerson,
            getPersonColor: _getPersonColor,
            getRates: _getRates,
            setRate: _setRate,
            getCurrentCurrency: _getCurrentCurrency
        };
    });
