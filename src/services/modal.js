var modalInstance = $modal.open({
    templateUrl: 'pages/app/questions/question-add.html',
    controller: 'addQuestionController',
    backdrop: true,
    scope: $scope,
    size: 'md',
    // resolve: {
    //     items1: function () {
    //         return $scope.items;
    //     }
    // }
});