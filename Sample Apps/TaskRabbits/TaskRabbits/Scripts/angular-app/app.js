﻿var app = angular.module("App", []);

app.directive('onKeyupFn', function() {
    return function(scope, elm, attrs) {
        var keyupFn = scope.$eval(attrs.onKeyupFn);
        elm.bind('keyup', function(evt) {
            scope.$apply(function() {
                keyupFn.call(scope, evt.which);
            });
        });
    };
});

app.controller('AppCtrl', function($scope, $http) {
  $http({ method: 'GET', url: '/rabbits' })
    .success(function(data, status, headers, config) {
      $scope.rabbits = data.Rabbits;
    });

  $scope.selectedRabbit = null;

  $scope.loadTasks = function() {
    $http({ method: 'GET', url: $scope.selectedRabbit.TasksUrl })
      .success(function(data, status, headers, config) {
        _.each(data.Tasks, ToTaskVm);
        $scope.tasks = data.Tasks;
      });
  };

  $scope.tasks = [];
});

function ToTaskVm(task) {
  task.parseDate = function() {
    var date = Date.parse(task.DueDate);

    if(date) {
      task.ParsedDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    } else {
      task.ParsedDate = "?";
    }
  };

  task.ParsedDate = task.DueDate;
}
