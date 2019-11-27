exports.config = {

    // seleniumServerJar: './Drivers/selenium-server-standalone-3.141.59.jar',
    chromeDriver: './chromedriver.exe',
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    // specs: ['./specs/spec.js', './specs/spec1.js'],
    specs: ['./specs/data.js'],
    directConnect: true,

    capabilities: {
        'browserName': 'chrome'
        // 'version': '78.0'
    },

    allScriptsTimeout: 500000,

    suites: {

        Angular: [
            './specs/spec.js',
            './specs/spec1.js'
        ],

        Flipkart: [
            './specs/spec.js'
        ]
    },

    params: {

        URL: 'https://www.angularjs.org'

    },

    "baseUrl": 'https://www.angularjs.org',

    onPrepare: function() {


        browser.manage().window().maximize();
        browser.manage().timeouts().pageLoadTimeout(50000);
        browser.manage().timeouts().implicitlyWait(10000);

        var ptor = browser;
        ptor.ignoreSynchronization = true;

        // add jasmine spec reporter for reporting results in console
        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

        jasmine.getEnv().addReporter(new SpecReporter({
            displayStackTrace: 'all'
        }));

        /*jasmine.getEnv().addReporter(new SpecReporter ({
            spec: {
                displayStackTrace: true
            }
        }));*/

        // add jasmine reporter for reporting results in XML format
        var jasmineReporters = require('jasmine-reporters');

        jasmine.getEnv().addReporter( new jasmineReporters.JUnitXmlReporter({

            savePath: './',
            filePrefix: 'xmlresults'

        }));
        
        // To get the screenshots on failure
        var fs = require('fs-extra');
        var i = 0;

        fs.emptyDir('./reports/', function(err){
            fs.emptyDir('./reports/screenshots/', function(err){
                if(err) throw (err);
            });
        });

        fs.ensureDir('./HTMLReports', function(exists){
            if(exists){
                fs.mkdirs('./HTMLReports');
            }
        });

        jasmine.getEnv().addReporter({
            specDone: function(result) {
                if(result.status === 'failed') {
                    browser.getCapabilities().then(function(caps){
                        var browserName = caps.get('browserName');

                        browser.takeScreenshot().then(function(png){
                            var stream = fs.createWriteStream('./reports/screenshots/'+browserName+'-'+result.fullName.split(':',1)+ i++ + '.png');
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            }
        });
    },

    onComplete: function(){
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function(caps) {
            browserName = caps.get('browserName');

            var HTMLReport = require('protractor-html-reporter');

            let testConfig = {

                reportTitle: 'Test Execution Report',
                outputPath: './reports',
                screenshotPath: './reports/screenshots',
                testBrowser: browserName,
                // browserVersion: browserVersion,
                modifiedSuiteName: false
            };

            new HTMLReport().from('xmlresults.xml', testConfig);

            var fs = require('fs-extra');
            var date = new Date();
            var hours = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            fs.rename("./reports/chrome-test-report.html", "./HTMLReports/chrome-test-report-"+hours+"-"+min+"-"+sec+".html", function(err){
                if (err) return console.error(err);
                console.log("HTML file moved successfully");
            });
        });
    },

    jasmineNodeOpts: {

        showColors: true,
        defaultTimeoutInterval: 50000

    }

}