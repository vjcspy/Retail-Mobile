/**
 * Created by vjcspy on 11/04/2016.
 */
'use strict';
app.constant('MODULE_CONFIG', [
    {
      name: 'flow',
      module: true,
      files: [
        '../iz/bower_components/ng-flow/dist/ng-flow-standalone.min.js'
      ]
    },
    {
      name: 'ui.select',
      module: true,
      files: [
        'bower_components/ui-select/dist/select.min.js',
        'bower_components/ui-select/dist/select.min.css'
      ]
    }, {
      name: 'izOrder',
      module: true,
      files: [
        'scripts/services/order/create.js'
      ]
    }, {
      name: 'ui.crud.editor',
      module: true,
      files: [
        './scripts/directives/crud/ui-crud-editor.js'
      ]
    }, {
      name: 'daterangepicker',
      module: true,
      files: [
        '../iz/bower_components/bootstrap-daterangepicker/daterangepicker.js',
        '../iz/bower_components/bootstrap-daterangepicker/daterangepicker.css',
        '../iz/bower_components/angular-daterangepicker/js/angular-daterangepicker.min.js'
      ]
    },
    {
      name: 'textAngular',
      module: true,
      files: [
        '../libs/angular/textAngular/dist/textAngular-sanitize.min.js',
        '../libs/angular/textAngular/dist/textAngular.min.js'
      ]
    },
    {
      name: 'vr.directives.slider',
      module: true,
      files: [
        '../libs/angular/venturocket-angular-slider/build/angular-slider.min.js',
        '../libs/angular/venturocket-angular-slider/angular-slider.css'
      ]
    },
    {
      name: 'angularBootstrapNavTree',
      module: true,
      files: [
        '../libs/angular/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
        '../libs/angular/angular-bootstrap-nav-tree/dist/abn_tree.css'
      ]
    },
    {
      name: 'izNavTree',
      module: true,
      files: [
        './scripts/directives/system/configElement.js'
      ]
    }, {
      name: 'adminshop.currency',
      module: true,
      files: [
        './scripts/services/shop/currency.js'
      ]
    },
    {
      name: 'izFormValidateElem',
      module: true,
      files: [
        './scripts/directives/form/formElement.js'
      ]
    },
    {
      name: 'angularFileUpload',
      module: true,
      files: [
        '../libs/angular/angular-file-upload/angular-file-upload.js'
      ]
    },
    {
      name: 'ngImgCrop',
      module: true,
      files: [
        '../libs/angular/ngImgCrop/compile/minified/ng-img-crop.js',
        '../libs/angular/ngImgCrop/compile/minified/ng-img-crop.css'
      ]
    },
    {
      name: 'smart-table',
      module: true,
      files: [
        '../libs/angular/angular-smart-table/dist/smart-table.min.js'
      ]
    },
    {
      name: 'ui.map',
      module: true,
      files: [
        '../libs/angular/angular-ui-map/ui-map.js'
      ]
    },
    {
      name: 'ngGrid',
      module: true,
      files: [
        '../libs/angular/ng-grid/build/ng-grid.min.js',
        '../libs/angular/ng-grid/ng-grid.min.css',
        '../libs/angular/ng-grid/ng-grid.bootstrap.css'
      ]
    },
    {
      name: 'ui.grid',
      module: true,
      files: [
        '../libs/angular/angular-ui-grid/ui-grid.min.js',
        '../libs/angular/angular-ui-grid/ui-grid.min.css',
        '../libs/angular/angular-ui-grid/ui-grid.bootstrap.css'
      ]
    },
    {
      name: 'xeditable',
      module: true,
      files: [
        '../libs/angular/angular-xeditable/dist/js/xeditable.min.js',
        '../libs/angular/angular-xeditable/dist/css/xeditable.css'
      ]
    },
    {
      name: 'smart-table',
      module: true,
      files: [
        '../libs/angular/angular-smart-table/dist/smart-table.min.js'
      ]
    }, {
      name: 'ladda',
      module: true,
      files: [
        '../iz/bower_components/ladda/dist/ladda.min.js',
        '../iz/bower_components/ladda/dist/spin.min.js',
        '../iz/bower_components/ladda/dist/ladda.min.css',
        '../iz/bower_components/ladda-angular/dist/ladda-angular.min.js'
      ]
    }, {
      name: 'izFacebook',
      module: true,
      files: [
        './scripts/services/facebook/authentication.js'
      ]
    }, {
      name: 'iz-facebook-api',
      module: true,
      files: [
        './scripts/services/facebook/api.js'
      ]
    },
    {
      name: 'dataTable',
      module: false,
      files: [
        '../libs/jquery/datatables/media/js/jquery.dataTables.min.js',
        '../libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
        //'../iz/bower_components/editorDataTable/dataTables.buttons.min.js',
        //'../iz/bower_components/editorDataTable/dataTables.select.min.js',
        //'../iz/bower_components/editorDataTable/dataTables.editor.min.js',
        //'../iz/bower_components/editorDataTable/dataTables.buttons.min.js',
        //'../iz/bower_components/editorDataTable/buttons.dataTables.min.css',
        //'../iz/bower_components/editorDataTable/select.dataTables.min.css',
        //'../iz/bower_components/editorDataTable/editor.dataTables.min.css',
        '../libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'
      ]
    },
    {
      name: 'footable',
      module: false,
      files: [
        '../libs/jquery/footable/dist/footable.all.min.js',
        '../libs/jquery/footable/css/footable.core.css'
      ]
    },
    {
      name: 'easyPieChart',
      module: false,
      files: [
        '../libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'
      ]
    },
    {
      name: 'sparkline',
      module: false,
      files: [
        '../libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js'
      ]
    },
    {
      name: 'plot',
      module: false,
      files: [
        '../libs/jquery/flot/jquery.flot.js',
        '../libs/jquery/flot/jquery.flot.resize.js',
        '../libs/jquery/flot/jquery.flot.pie.js',
        '../libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js',
        '../libs/jquery/flot-spline/js/jquery.flot.spline.min.js',
        '../libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js'
      ]
    },
    {
      name: 'vectorMap',
      module: false,
      files: [
        '../libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js',
        '../libs/jquery/bower-jvectormap/jquery-jvectormap.css',
        '../libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
        '../libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-en.js'
      ]
    },
    {
      name: 'moment',
      module: false,
      files: [
        '../libs/jquery/moment/moment.js'
      ]
    }
  ]
  )
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function ($ocLazyLoadProvider, MODULE_CONFIG) {
    $ocLazyLoadProvider.config({
      debug: false,
      events: false,
      modules: MODULE_CONFIG
    });
  }]);
