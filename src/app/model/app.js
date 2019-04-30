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
            // modalsStack.shift();
            removeLatestModal('close');
        }, function() {
            // modalsStack.shift();
            removeLatestModal('dismiss');
        });
        modalsStack.push(instance);
    };
    function removeLatestModal(type) {
        if(modalsStack.length) {
            var m = modalsStack.slice(modalsStack.length - 1, modalsStack.length)
            modalsStack = modalsStack.slice(0, modalsStack.length - 1);
            m[0][type]();
        }
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
            // modalInstance.index = modalsStack.length + 1;
            backback(modalInstance);
            return modalInstance;
        },
        close : function(args) {
            if(modalsStack.length) {
                var tp = modalsStack[modalsStack.length - 1];
                tp.close(args);
            }
            // removeLatestModal('close');
        },
        dismiss : function(args) {
            // removeLatestModal('dismiss');
            if(modalsStack.length) {
                var tp = modalsStack[modalsStack.length - 1];
                tp.dismiss(args);
            }
        }
    };
    return $diModal;
}]).run(['$rootScope', '$state', function() {
    // axios的回复
    axios.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axios.interceptors.response.use(function (response) {
        if(response.status >= 200 && response.status < 400) {
            return response.data && response.data.data;
            // return response.data;
        }
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
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