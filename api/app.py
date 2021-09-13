from src.routes import initialize_routes
from flask import Flask, got_request_exception
from flask_restful import Api


def log_exception(sender, exception, **extra):
    sender.logger.debug('Got exception during processing: %s', exception)


app = Flask(__name__)

api = Api(app, catch_all_404s=True)
got_request_exception.connect(log_exception, app)

initialize_routes(api)
