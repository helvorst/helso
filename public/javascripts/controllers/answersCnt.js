/**
 * Created by hel on 03.07.2016.
 */
so.controller('answersCnt', function ($scope, Restangular, $state, $stateParams, $rootScope) {
    var fetchQuestions = function (url) {

    }

    $scope.spinner = true;
    if (!$rootScope.results)
        $state.go('search')
    else {
        $scope.spinner = true;
        var id = $stateParams.questionId;
        var myQ = $rootScope.results.filter(function (it) {
            return it.question_id == id
        })
        $scope.question = myQ[0] ? myQ[0] : null;
        var url = "questions/" + id + "/answers?order=desc&sort=votes&site=stackoverflow"
        Restangular.one(url).get()
            .then(function (ans) {
                if (ans.plain())
                    $scope.answers = ans.plain();
                $scope.spinner = false;
            },
            function (error) {
                $scope.error = "Can't REST StackOverflow:  " + (error.data && error.data.error_message ? error.data.error_message : '')
                console.log(error)
                $scope.spinner = false;
            })

    }
})
