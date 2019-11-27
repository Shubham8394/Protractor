var Common = require('../lib/CommonFunctions');
var page = new Common();


describe('Describe Block', function(){

    it('It Block', function(){
        
        // browser.get(browser.baseUrl);
        browser.get(browser.params.URL);
        browser.manage().window().maximize();
        browser.getTitle().then(function(result){
            if(result){
                console.log(result);
                expect(result).toContain('AngularJS');
                page.clickOnObject(page.nextButton);
                browser.sleep(5000);
            }
        });

    });
});