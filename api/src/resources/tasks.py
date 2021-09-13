from flask_restful import Resource, abort, reqparse, inputs
from src.database.db import get_db


def create_request_parser():
    parser = reqparse.RequestParser()
    parser.add_argument('offset', type=int)
    parser.add_argument('limit', type=int)
    parser.add_argument('title', type=str)
    parser.add_argument('completed', type=inputs.boolean)
    return parser.parse_args()


def apply_filter(task, args):
    if args["title"] is not None and not args["title"] in task["title"]:
        return False
    if args["completed"] is not None and args["completed"] != bool(task["completed"]):
        return False
    return True


def apply_limit_offset(tasks, args):
    limit = 10
    offset = 0
    if args["limit"] is not None:
        limit = args["limit"]
    if args["offset"] is not None:
        offset = args["offset"]
    return tasks[offset:limit+offset]


def get_repository():
    return get_db()["tasks"]


class Tasks(Resource):
    def get(self):
        args = create_request_parser()
        tasks = list()
        task_repository = get_repository()
        for task in task_repository:
            if apply_filter(task, args):
                tasks.append(task)
        return {"data": apply_limit_offset(tasks, args), "total_items": len(tasks)}


class Task(Resource):
    def get(self, task_id):
        task_repository = get_repository()
        for task in task_repository:
            if task["id"] == task_id:
                return task
        abort(404, message="Task {} doesn't exist".format(task_id))


class UserTasks(Resource):
    def get(self, user_id):
        args = create_request_parser()
        tasks = list()
        task_repository = get_repository()
        for task in task_repository:
            if task["user_id"] == user_id and apply_filter(task, args):
                tasks.append(task)
        return {"data": apply_limit_offset(tasks, args), "total_items": len(tasks)}
