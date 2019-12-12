'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(['$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise('/siginin');
          $stateProvider
              .state('app', {
                  // abstract: true,
                  url: '/app',
                //   resolve: {
                //       deps: ['$ocLazyLoad',
                //         function( $ocLazyLoad ) {
                //           return $ocLazyLoad.load('pages/app/app.js').then(
                //               function() {
                //                   return $ocLazyLoad.load('pages/app/app.js');
                //               }
                //           );
                //       }]
                //   },
                  templateUrl: 'pages/app/app.html'
              })
              .state('siginin', {
                url: '/siginin',
                templateUrl: 'pages/access/signin/signin.html'
              })
              .state('nopermission', {
                url: '/nopermission',
                templateUrl: 'pages/access/nopermission/nopermission.html'
              })
              // questions
              .state('app.questions', {
                  url: '/questions',
                  templateUrl: 'pages/app/questions/questions.html'
              })
              // questions
              .state('app.questionsTypes', {
                url: '/questionsTypes',
                templateUrl: 'pages/app/questionTypes/questionTypes.html'
              })
              .state('app.questionaires', {
                url: '/questionaires',
                templateUrl: 'pages/app/questionaires/questionaire.html'
              })
              .state('app.addQuestionaire', {
                url: '/addQuestionaire',
                templateUrl: 'pages/app/questionaires/questionaire-add.html'
              })
              .state('app.updateQuestionaire', {
                url: '/updateQuestionaire/:questionaireId',
                templateUrl: 'pages/app/questionaires/questionaire-add.html'
              })
              // table
              .state('app.table', {
                  url: '/table',
                  template: '<div ui-view></div>'
              })
              .state('app.table.static', {
                  url: '/static',
                  templateUrl: 'tpl/table_static.html'
              })
              .state('app.table.datatable', {
                  url: '/datatable',
                  templateUrl: 'tpl/table_datatable.html'
              })
              .state('app.table.footable', {
                  url: '/footable',
                  templateUrl: 'tpl/table_footable.html'
              })
              .state('app.table.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/table_grid.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('ngGrid').then(
                              function(){
                                  return $ocLazyLoad.load('js/controllers/grid.js');
                              }
                          );
                      }]
                  }
              })
      }
    ]
  );