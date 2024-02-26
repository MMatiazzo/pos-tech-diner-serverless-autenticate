// 

data "archive_file" "lambda" {
  type        = "zip"
  source_file = "lambda.js"
  output_path = "lambda_function_payload.zip"
}

# add role com permissão para mexer no cognito
data "aws_iam_role" "lab_role" {
  name = "LabRole"
}

resource "aws_lambda_function" "autenticate_lambda_test" {
  # If the file is not in the current working directory you will need to include a
  # path.module in the filename.
  filename      = "lambda_function_payload.zip"
  function_name = "autenticate_test"
  role          = data.aws_iam_role.lab_role.arn
  handler       = "lambda.handler"

  source_code_hash = data.archive_file.lambda.output_base64sha256

  runtime = "nodejs18.x"

  environment {
    variables = {
      foo = "bar"
    }
  }
}