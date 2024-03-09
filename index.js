
// Modules, e.g. Webpack:
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import pg from 'pg';
import axios from 'axios';

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const { cpf, password } = body;

  // Retrieve username
  const client = new pg.Client({ connectionString: "postgresql://postgres_username:postgres_password@rds-pos-tech-diner.cpiuqcs2ov56.us-east-1.rds.amazonaws.com:5432/postechdinerdb" });
  await client.connect();

  const res = await client.query('SELECT name FROM clientes WHERE cpf=$1', [cpf])
  await client.end();
  const username = res.rows[0].name;

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

  return data;
};
