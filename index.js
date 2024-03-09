
// Modules, e.g. Webpack:
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import pg from 'pg';

export const handler = async (event) => {

  const client = new pg.Client({ connectionString: "postgresql://postgres_username:postgres_password@rds-pos-tech-diner.cpiuqcs2ov56.us-east-1.rds.amazonaws.com:5432/postechdinerdb" })
  await client.connect()

  const res = await client.query('SELECT * FROM clientes')
  console.log(res)
  await client.end()

  return res;

  // var poolData = {
  //   UserPoolId: '', // Your user pool id here
  //   ClientId: '', // Your client id here
  // };

  // var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  // var attributeList = [];

  // var dataEmail = {
  //   Name: 'email',
  //   Value: 'email@mydomain.com',
  // };

  // var dataCpf = {
  //   Name: 'CPF',
  //   Value: '04411915090',
  // };
  // var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  // var attributeCpf = new AmazonCognitoIdentity.CognitoUserAttribute(
  //   dataCpf
  // );

  // attributeList.push(attributeEmail);
  // attributeList.push(attributeCpf);

  // userPool.signUp('usernameTest', 'b{XR{3yfk+=p)^BJ', attributeList, null, function (
  //   err,
  //   result
  // ) {
  //   if (err) {
  //     alert(err.message || JSON.stringify(err));
  //     return;
  //   }
  //   var cognitoUser = result.user;
  //   console.log('user name is ' + cognitoUser.getUsername());
  // });

};
