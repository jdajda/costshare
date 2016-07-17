angular.module('app.services', ['ngStorage'])

    .factory('StorageService', function ($localStorage) {
        $localStorage = $localStorage.$default({
            expenses: []
        });

        var _getAll = function () {
            return $localStorage.expenses;
        };
        var _add = function (expense) {
            $localStorage.expenses.push(expense);
        }
        var _remove = function (expense) {
            $localStorage.expenses.splice($localStorage.expenses.indexOf(expense), 1);
        }
        var _removeAll = function () {
            $localStorage.expenses.length = 0;
        }
        
        return {
            getAll: _getAll,
            add: _add,
            remove: _remove,
            removeAll: _removeAll
        };
    });
    
// .factory('BlankFactory', [function(){
    
    
// }])

// .service('BlankService', [function(){

// }]);

