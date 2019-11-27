var ptor = browser;
var driver = ptor.driver;
var fs = require('fs');
var path = require('path');
var EC = protractor.ExpectedConditions;


var CommonFns = function() {

    /*goHome: function() {
        return browser.getTitle();
    }*/

    this.nextButton = element(by.xpath("//a[text()='Learn']"));

    this.clickOnObject = function(Obj) {

        Obj.isPresent().then(function(result){
            if(result){
                browser.executeScript("arguments[0].click()", Obj);
            } else {
                console.log("Object is not displayed");
            }
        });
    };
};

module.exports = CommonFns