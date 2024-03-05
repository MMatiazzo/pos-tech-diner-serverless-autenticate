
// Modules, e.g. Webpack:
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

export const handler = async (event) => {
  var poolData = {
    UserPoolId: '', // Your user pool id here
    ClientId: '', // Your client id here
  };

  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
  var attributeList = [];
  
  var dataEmail = {
    Name: 'email',
    Value: 'email@mydomain.com',
  };
  
  var dataCpf = {
    Name: 'CPF',
    Value: '04411915090',
  };
  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  var attributeCpf = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataCpf
  );
  
  attributeList.push(attributeEmail);
  attributeList.push(attributeCpf);
  
  userPool.signUp('usernameTest', 'b{XR{3yfk+=p)^BJ', attributeList, null, function(
    err,
    result
  ) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    var cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
  });
  
};
