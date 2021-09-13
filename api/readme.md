## development

```bash
cd api
python3.8 -m venv ./venv
source ./venv/bin/activate

# install deps
npm install
pip3 install -r requirements.txt

# local debug
sls wsgi serve
```

## deployment

requirements:

- aws cli installed and a profile setup
- serverless framework globally installed
- create a s3 bucket for deployment
- rename .env.demo file to .env
- replace the key DEPLOYMENT_BUCKET value with the bucket name created

```bash
cd api
npm install
# stage is optional, defaults to dev
AWS_PROFILE=myprofile serverless deploy --stage <stage>
```
