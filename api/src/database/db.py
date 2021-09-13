from flask import g
import json


def get_db():

    if "db" not in g:
        g.db = {"tasks": [], "users": []}
        with open('src/database/tasks.json') as json_data:
            g.db["tasks"] = json.load(json_data)
            json_data.close()
        with open('src/database/users.json') as json_data:
            g.db["users"] = json.load(json_data)
            json_data.close()

    return g.db
