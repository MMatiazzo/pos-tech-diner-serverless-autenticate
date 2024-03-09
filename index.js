
// Modules, e.g. Webpack:
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import pg from 'pg';

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const { cpf } = body

  const client = new pg.Client({ connectionString: "postgresql://postgres_username:postgres_password@rds-pos-tech-diner.cpiuqcs2ov56.us-east-1.rds.amazonaws.com:5432/postechdinerdb" });
  await client.connect()

  const res = await client.query('SELECT email FROM clientes WHERE cpf=$1', [cpf])
  await client.end()

  return res;
};
