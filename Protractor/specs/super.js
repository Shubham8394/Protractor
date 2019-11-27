var Common = require('../lib/CommonFunctions');
var page = new Common();

describe('Test Web App', function(){
    it('Validate', async function(){
        await browser.get('http://juliemr.github.io/protractor-demo/');
        // await browser.get('http://www.fb.com');
        // browser.sleep(5000);
        // console.log('Shubham Sharma');
        // expect(page.goHome()).toEqual('Super Calculator');

        element(by.model('operator')).$('option:checked').getText().then(function(result){
            if(result){
                console.log(result);
            } else {
                expect(true).toBe(false);
            }
        });

        element(by.model('operator')).isPresent().then(function(result){
            if(result){
                // element(by.model('operator')).all(by.xpath("option[.='*']")).click();
                // element(by.model('operator')).all(by.css("option[value='MULTIPLICATION']")).click();
                // element(by.cssContainingText("select[ng-model='operator'] option",'*')).click();
                
                element.all(by.tagName('option')).each(function(values){
                    values.getText().then(function(text){
                        console.log(text);
                    });
                });
                browser.sleep(5000);
            } else {
                expect(true).toBe(false);
            }
        });

    });
});