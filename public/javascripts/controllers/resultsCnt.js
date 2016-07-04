/**
 * Created by hel on 03.07.2016.
 */
so.controller('resultsCnt', function ($scope, $rootScope, $state, $uibModal, Restangular, kbFocus) {

    $scope.error = null;
    $scope.spinner = true;
    var url = 'search/advanced?order=desc&sort=votes&q=' + $rootScope.whatToSearch + '&site=stackoverflow&pagesize=100'
    var getDataPage = function (page) {
        $scope.spinner = true;
        var pageurl = url + '&page=' + page;
        Restangular.one(pageurl).get()
            .then(function (ans) {
                if (ans.plain()) {
                    var data = ans.plain()
                    $rootScope.results = data.items;
                    $scope.spinner = false;
                    kbFocus('focusFirstLine');
                }
            },
            function (error) {
                $scope.error = "Can't REST StackOverflow: code" + (error.code ? error.code : 'no error code ') + ' message: ' + (error.message ? error.message : 'no error message')
                console.log(error)
            })
    }
    if (!$rootScope.whatToSearch)
        $state.go('search')
    else {

        var total = '&filter=total'
        $rootScope.results = [];

        Restangular.one(url + total).get()
            .then(function (rsp) {
                if (rsp.plain()) {
                    $scope.total = rsp.plain().total
                    getDataPage(1)
                }
                else
                    $scope.error = "Empty StackOverflow response"
            },
            function (error) {
                $scope.error = "Can't REST StackOverflow:  " + (error.data && error.data.error_message ? error.data.error_message : '')
                console.log(error)
            })

    }

    $scope.loadPage = function (newPage) {
        getDataPage(newPage)
    }

    $scope.goToAnswers = function (question) {
        $state.go('answers', {questionId: question.question_id})
    }

    $scope.goToDetails = function (userId, tag) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'partials/details.html',
            controller: 'detailsCnt',
            size: 'lg',
            resolve: {
                detailsAbout: function () {
                    return {
                        author: userId,
                        tag: tag
                    };
                }
            }
        });
    }
})
