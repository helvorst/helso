/**
 * Created by hel on 03.07.2016.
 */
so.config(function (RestangularProvider, $stateProvider) {
    RestangularProvider.setBaseUrl('http://api.stackexchange.com/2.2/');

    $stateProvider
        .state('search', {
            url: '/search',
            templateUrl: "partials/search.html",
            controller: 'searchCnt',
            //abstract: true //<-- Declare parent as an abstract state.
        })
        .state('results', {
            url: '/results',
            templateUrl: "partials/results.html",
            controller: 'resultsCnt'
        })
        .state('answers', {
            url: '/question/:questionId/answers',
            templateUrl: "partials/answers.html",
            controller: 'answersCnt'
        })


})
