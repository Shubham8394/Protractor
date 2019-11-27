exports.config = {

    directConnect: true,
    specs: ['./specs/super.js'],

    params: {
        URL: 'https://www.angularjs.org'
    },

    capabilities: {
        browserName: 'chrome'
        // browserName: 'firefox',

        // chromeOptions: {
            // args: ["--headless"]
        // }

        /*'moz:firefoxOptions': {
            args: ["--headless"]
        }*/
    },

    onPrepare: function() {
        var HTMLReporter = require('protractor-beautiful-reporter');
        var date = new Date();
        var hours = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        var docName = 'TestReport-'+hours+'-'+min+'-'+sec+'.html';

        jasmine.getEnv().addReporter(new HTMLReporter({
            baseDirectory: './reports/screenshots',
            // takeScreenShotsOnlyForFailedSpecs: true,
            docTitle: 'Test Execution Report',
            docName: docName,
            // disableScreenshots: true
        }).getJasmine2Reporter());
    }
}