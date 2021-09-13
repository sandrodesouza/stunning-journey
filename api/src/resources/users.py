from flask_restful import Resource, abort
from flask_apispec import marshal_with, doc
from flask_apispec.views import MethodResource
from src.database.db import get_db
from src.schemas.users import UserResponse, UsersResponseSchema
from src.schemas.not_found import NotFoundResponse


def get_repository():
    return get_db()["users"]


class Users(MethodResource, Resource):

    @doc(description='Retrieves all users listed on the users.json file', tags=['Users'])
    @marshal_with(UsersResponseSchema, code=200)
    def get(self):
        user_repository = get_repository()
        return {"data": user_repository, "total_items": len(user_repository)}


class User(MethodResource, Resource):

    @doc(description='Retrieves information from a single user', tags=['Users'])
    @marshal_with(UserResponse, code=200)
    @marshal_with(NotFoundResponse, code=404)
    def get(self, user_id):
        user_repository = get_repository()
        for user in user_repository:
            if user["id"] == user_id:
                return user
        abort(404, message="Task {} doesn't exist".format(user_id))
