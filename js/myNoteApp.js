/**
 * Created by momo on 2016/7/14.
 */
var app=angular.module("myNoteApp",[]);

app.controller("myNoteCtrl",function ($scope) {
    $scope.message="";
    $scope.left=function () {
        return 100-$scope.message.length;
    };
    $scope.save=function () {
        alert("not save");
    };
    $scope.clear=function () {
        $scope.message="";
    };
});