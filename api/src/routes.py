from src.resources.tasks import Task, Tasks, UserTasks
from src.resources.users import User, Users


def initialize_routes(api):
    api.add_resource(Tasks, '/tasks')
    api.add_resource(Task, '/tasks/<int:task_id>')
    api.add_resource(Users, '/users')
    api.add_resource(User, '/users/<int:user_id>')
    api.add_resource(UserTasks, '/users/<int:user_id>/tasks')
