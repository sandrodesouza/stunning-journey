from .base import BaseCase
default_limit = 10


class TestUsers(BaseCase):
    # Not found error
    def test_user_notfound(self):
        response = self.app.get('/users/notexists')
        self.assertEqual(response.status_code, 404)

    # Retrieves all users listed on the users.json
    def test_get_all_users(self):
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json, object)
        assert isinstance(response.json["data"], object)
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(
            len(response.json["data"]), response.json["total_items"])

    # Retrieves information from a single user.
    def test_get_user_by_id(self):
        response = self.app.get('/users/1')
        self.assertEqual(response.json, {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company": {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
            }
        })
        self.assertEqual(response.status_code, 200)

    # Retrieves all tasks from the specified user.
    def test_get_tasks_by_user_id(self):
        response = self.app.get('/users/1/tasks')
        self.assertEqual(response.status_code, 200)
        assert isinstance(response.json, object)
        data = response.json["data"]
        assert isinstance(data, object)
        for i in data:
            assert i["user_id"] == 1
        assert isinstance(response.json["total_items"], object)
        self.assertEqual(len(data), default_limit)
