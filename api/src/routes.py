from src.resources.tasks import Task, Tasks, UserTasks
from src.resources.users import User, Users


def initialize_routes(api, docs):
    api.add_resource(Tasks, '/tasks')
    docs.register(Tasks)

    api.add_resource(Task, '/tasks/<int:task_id>')
    docs.register(Task)

    api.add_resource(Users, '/users')
    docs.register(Users)

    api.add_resource(User, '/users/<int:user_id>')
    docs.register(User)

    api.add_resource(UserTasks, '/users/<int:user_id>/tasks')
    docs.register(UserTasks)
