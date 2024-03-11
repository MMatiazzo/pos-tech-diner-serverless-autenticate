
// Modules, e.g. Webpack:
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import pg from 'pg';
import axios from 'axios';

export const handler = async (event) => {
  console.log('event', event)
  const { cpf, password } = event;
  console.log('cpf', cpf, 'password', password)

  // Retrieve username
  const client = new pg.Client({ connectionString: "postgresql://postgres_username:postgres_password@rds-pos-tech-diner.cpiuqcs2ov56.us-east-1.rds.amazonaws.com:5432/postechdinerdb" });
  await client.connect();

  const res = await client.query('SELECT nome FROM clientes WHERE cpf=$1', [cpf])
  console.log('res', res)
  await client.end();
  const username = res.rows[0].nome;
  console.log('username', username)

  // Authenticate with Cognito
  const cognitoApi = axios.create({
    baseURL: 'https://cognito-idp.us-east-1.amazonaws.com/',
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      Accept: "/",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive"
    }
  })

  console.log('before request',)
  const { data } = await cognitoApi.post('/', {
    "AuthFlow": "USER_PASSWORD_AUTH",
    "ClientId": "278fmimfp7pl48hs52jnctihlg",
    "AuthParameters": {
      "USERNAME": username,
      "PASSWORD": password
    }
  }, {
    headers: {
      "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth"
    }
  })
  console.log('data', data)


  return data;
};
