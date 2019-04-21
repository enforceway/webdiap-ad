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
        close : function() {
            if(modalsStack.length) {
                var tp = modalsStack[modalsStack.length - 1];
                tp.close();
            }
            // removeLatestModal('close');
        },
        dismiss : function() {
            // removeLatestModal('dismiss');
            if(modalsStack.length) {
                var tp = modalsStack[modalsStack.length - 1];
                tp.dismiss();
            }
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