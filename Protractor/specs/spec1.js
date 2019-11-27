describe('Login', function(){
    it('Test', function(){

        browser.waitForAngularEnabled(false);
        browser.get('https://www.flipkart.com');

    });

    it('Second It Block', function(){
        expect(false).toBe(true);
    })
});