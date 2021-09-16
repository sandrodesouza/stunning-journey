import os
from flask import Flask, got_request_exception
from flask_restful import Api
from flask_apispec.extension import FlaskApiSpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec import APISpec
from src.routes import initialize_routes
from flask_cors import CORS


def log_exception(sender, exception, **extra):
    sender.logger.debug('Got exception during processing: %s', exception)


app = Flask(__name__)
CORS(app)

api = Api(app, catch_all_404s=True)
got_request_exception.connect(log_exception, app)


settings = {"basePath": "/dev"}
if os.getenv("IS_OFFLINE") is not None:
    settings["basePath"] = "/"

app.config.update({
    'APISPEC_SPEC': APISpec(
        title='Stunning Journey',
        version='v1',
        plugins=[MarshmallowPlugin()],
        openapi_version='2.0',
        **settings
    ),
    'APISPEC_SWAGGER_URL': '/swagger/',  # URI to access API Doc JSON
    'APISPEC_SWAGGER_UI_URL': '/swagger-ui/'  # URI to access UI of API Doc
})
docs = FlaskApiSpec(app)


initialize_routes(api, docs)
