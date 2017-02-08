// Karma configuration
// Generated on Fri Feb 03 2017 11:34:14 GMT+0300 (Belarus Standard Time)

//karma start -noWatch
var singleRunFlag = process.argv.filter(itm=>itm==='-noWatch').length ? true : false;

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        //'Chrome',
        'PhantomJS'
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'public/js/cms.vendor.js',
        './node_modules/angular-mocks/angular-mocks.js',
        'public/js/cms.build.js',
        './src/**/*.spec.js'
    ],
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './src/**/*.spec.js': ['webpack'],
        'public/js/cms.build.js': ['coverage']
    },

    webpack: {
      module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['latest','react'] }},
            {test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/ }
        ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],



    // https://github.com/karma-runner/karma-coverage
    coverageReporter: {
      type : 'html',
      dir : 'Test_coverage/'
    },

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: singleRunFlag,
    concurrency: Infinity,
    logLevel: config.LOG_INFO
  })
}
