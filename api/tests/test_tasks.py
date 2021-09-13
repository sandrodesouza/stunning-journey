from .base import BaseCase
default_limit = 10


class TestTasks(BaseCase):
    # Not found error
    def test_task_notfound(self):
        response = self.app.get('/tasks/notexists')
        self.assertEqual(response.status_code, 404)

    # Retrieves all tasks listed on the tasks.json
    def test_get_all_tasks(self):
        response = self.app.get('/tasks')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json["data"], object)
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(len(response.json["data"]), default_limit)

    # Retrieves all tasks listed on the tasks.json that has the attribute completed as true
    def test_get_all_tasks_filter_by_completed(self):
        response = self.app.get('/tasks?completed=true')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json, object)
        data = response.json["data"]
        for i in data:
            assert bool(i["completed"]) == True
        assert isinstance(data, object)
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(len(data), default_limit)

    # Retrieves all tasks listed on the tasks.json using limit and offset
    def test_get_all_tasks_filter_by_limit_and_offset(self):
        response = self.app.get('/tasks?limit=1&offset=1')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json, object)
        data = response.json["data"]
        print(data)
        assert isinstance(data, object)
        self.assertEqual(len(data), 1)
        for i in data:
            assert i == {
                "user_id": 1,
                "id": 2,
                "title": "quis ut nam facilis et officia qui",
                "completed": False
            }
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(response.json["total_items"], 200)

    # Retrieves all tasks listed on the tasks.json filter by title
    def test_get_all_tasks_filter_by_title(self):
        response = self.app.get('/tasks?title=porro')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json, object)
        data = response.json["data"]
        for i in data:
            assert "porro" in str(i["title"])
        assert isinstance(data, object)
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(response.json["total_items"], len(data))
        self.assertEqual(len(data), 3)

    # Retrieves information from a single task.
    def test_get_task_by_id(self):
        response = self.app.get('/tasks/1')
        self.assertEqual(response.json, {
            "user_id": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": False
        })
        self.assertEqual(response.status_code, 200)

    # Retrieves all tasks from the specified user (not exists)
    def test_get_tasks_by_user_that_not_exists(self):
        response = self.app.get('/users/11/tasks')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json, object)
        data = response.json["data"]
        assert isinstance(data, object)
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(0, response.json["total_items"])
        self.assertEqual(len(data), response.json["total_items"])

    # Retrieves all tasks listed on the tasks.json that has the attribute completed as true
    def test_get_tasks_by_user_filter_by_completed(self):
        response = self.app.get('/users/1/tasks?completed=true')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json, object)
        data = response.json["data"]
        for i in data:
            assert bool(i["completed"]) == True
        assert isinstance(data, object)
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(len(data), default_limit)

    # Retrieves all tasks listed on the tasks.json that has the attribute completed as false
    def test_get_tasks_by_user_filter_by_not_completed(self):
        response = self.app.get('/users/1/tasks?completed=false')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json, object)
        data = response.json["data"]
        for i in data:
            assert bool(i["completed"]) == False
        assert isinstance(data, object)
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(len(data), 9)

    # Retrieves all tasks listed on the tasks.json that has the attribute completed as true
    def test_get_tasks_by_user_filter_by_completed_offset(self):
        response = self.app.get('/users/1/tasks?completed=true&offset=10')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json, object)
        data = response.json["data"]
        for i in data:
            assert bool(i["completed"]) == True
        assert isinstance(data, object)
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(len(data), 1)

    # Retrieves all tasks listed on the tasks.json using limit and offset
    def test_get_tasks_by_user_filter_by_limit_and_offset(self):
        response = self.app.get('/users/1/tasks?limit=1&offset=1')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json, object)
        data = response.json["data"]
        for i in data:
            assert i == {
                "user_id": 1,
                "id": 2,
                "title": "quis ut nam facilis et officia qui",
                "completed": False
            }
        assert isinstance(data, object)
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(len(data), 1)

    # Retrieves all tasks listed on the tasks.json filter by title
    def test_get_tasks_by_user_filter_by_title(self):
        response = self.app.get('/users/1/tasks?title=porro')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json, object)
        data = response.json["data"]
        for i in data:
            assert "porro" in str(i["title"])
        assert isinstance(data, object)
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(response.json["total_items"], len(data))
        self.assertEqual(len(data), 1)
