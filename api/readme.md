# stunning journey api

## install

Create a virtualenv and activate it:

```bash
python3 -m venv venv
. venv/bin/activate
```

Install dependencies:

```bash
npm install -g serverless
pip install -r requirements.txt
npm install
```

## run locally

```bash
serverless wsgi serve
```

## deployment

requirements:

- aws cli installed and a profile setup
- create a s3 bucket for deployment
- rename .env.demo file to .env
- replace the key DEPLOYMENT_BUCKET value with the bucket name created

```bash
npm install
AWS_PROFILE=myprofile serverless deploy --stage <stage> # stage is optional, defaults to dev
```

## test

```bash
pip install pytest
pytest
```
