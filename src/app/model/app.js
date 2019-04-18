angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'ui.validate',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ngGrid',
    'toaster',
]).service('$diModal', ['$modal', function ($modal) {
    'use strict';

    var modalsStack = [];
    function backback(instance) {
        // var m = modalsStack.shift();
        instance.result.then(function() {
            modalsStack.shift();
        }, function() {
            modalsStack.shift();
        });
        modalsStack.push(instance);
    };
    var $diModal = {
        open : function (modalOptions) {
            if (!modalOptions.template && !modalOptions.templateUrl) {
                throw new Error('One of template or templateUrl options is required.');
            }
            var modalInstance = $modal.open({
                templateUrl: modalOptions.templateUrl,
                controller: modalOptions.controller,
                backdrop: modalOptions.backdrop || true,
                scope: modalOptions.scope,
                size: modalOptions.size || 'md',
                // resolve: {
                //     items1: function () {
                //         return $scope.items;
                //     }
                // }
            });
            backback(modalInstance);
            return modalInstance;
        },
        close : function() {
            var m = modalsStack.shift();
            modalsStack.unshift(m);
            m.close();
        },
        dismiss : function() {
            var m = modalsStack.shift();
            modalsStack.unshift(m);
            m.dismiss();
        }
    };
    return $diModal;
}]).factory('$diResource', function() {
    var m = {
        get: function(opts) {
            opts.data = opts.data || {};
            return axios.get(opts.url, opts.data);
        },
        post: function(opts) {
            opts.data = opts.data || {};
            return axios.post(opts.url, opts.data);
        },
        put: function(opts) {
            opts.data = opts.data || {};
            return axios.put(opts.url, opts.data);
        },
        delete: function(opts) {
            opts.data = opts.data || {};
            return axios.delete(opts.url, opts.data);
        }
    };
    return m;
}).constant('$G', {
    'addQuestion': '/webdiapp/question/add',
    'updateQuestion': '/webdiapp/question/update',
    'listQuestions': '/webdiapp/question/list',
    'listQuestionTypes': '/webdiapp/questionType/list',
    'listQuestionaires': '/webdiapp/questionaire/list',
    'addQuestionaire': '/webdiapp/questionaire/add',
    'updateQuestionaire': '/webdiapp/questionaire/update',
});