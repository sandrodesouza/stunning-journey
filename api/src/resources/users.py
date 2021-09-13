from flask_restful import Resource, abort
from src.database.db import get_db


def get_repository():
    return get_db()["users"]


class Users(Resource):
    def get(self):
        user_repository = get_repository()
        return {"data": user_repository, "total_items": len(user_repository)}


class User(Resource):
    def get(self, user_id):
        user_repository = get_repository()
        for user in user_repository:
            if user["id"] == user_id:
                return user
        abort(404, message="Task {} doesn't exist".format(user_id))
