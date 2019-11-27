var data = require('../Data/Creds.json');

describe('Test Data', function(){
    it('Validate', function(){
        console.log(data.url);

        console.log(data.credentials.username);     // Shubham    
        console.log(data.credentials.password);     // Sharma

        console.log(data.userDetails[0].firstName); // Ravi
        console.log(data.userDetails[1].lastName);  // Singh

        console.log(data.userDetails.lastName);     // undefined
    });
});