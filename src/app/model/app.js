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
})
/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
.constant('JQ_CONFIG', {
    // easyPieChart:   ['../vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
    // sparkline:      ['../vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
    // plot:           ['../vendor/jquery/charts/flot/jquery.flot.min.js', 
    //                     '../vendor/jquery/charts/flot/jquery.flot.resize.js',
    //                     '../vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
    //                     '../vendor/jquery/charts/flot/jquery.flot.spline.js',
    //                     '../vendor/jquery/charts/flot/jquery.flot.orderBars.js',
    //                     '../vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
    // slimScroll:     ['../vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
    // sortable:       ['../vendor/jquery/sortable/jquery.sortable.js'],
    // nestable:       ['../vendor/jquery/nestable/jquery.nestable.js',
    //                     '../vendor/jquery/nestable/nestable.css'],
    // filestyle:      ['../vendor/jquery/file/bootstrap-filestyle.min.js'],
    // slider:         ['../vendor/jquery/slider/bootstrap-slider.js',
    //                     '../vendor/jquery/slider/slider.css'],
    // chosen:         ['../vendor/jquery/chosen/chosen.jquery.min.js',
    //                     '../vendor/jquery/chosen/chosen.css'],
    // TouchSpin:      ['../vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
    //                     '../vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
    // wysiwyg:        ['../vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
    //                     '../vendor/jquery/wysiwyg/jquery.hotkeys.js'],
    // dataTable:      ['../vendor/jquery/datatables/jquery.dataTables.min.js',
    //                     '../vendor/jquery/datatables/dataTables.bootstrap.js',
    //                     '../vendor/jquery/datatables/dataTables.bootstrap.css'],
    // vectorMap:      ['../vendor/jquery/jvectormap/jquery-jvectormap.min.js', 
    //                     '../vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
    //                     '../vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
    //                     '../vendor/jquery/jvectormap/jquery-jvectormap.css'],
    footable:       ['../vendor/jquery/footable/footable.all.min.js',
                        '../vendor/jquery/footable/footable.core.css']
    }
)