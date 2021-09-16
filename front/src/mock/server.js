// src/server.js
import { createServer, Model } from "miragejs";
import users from "./fixtures/users.data";
import tasks from "./fixtures/tasks.data";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    models: {
      users: Model,
      tasks: Model,
    },
    fixtures: {
      users,
      tasks,
    },

    routes() {
      this.urlPrefix = process.env.REACT_APP_API_URL;

      this.get("/users", (schema) => {
        return { data: schema.db.users, total_items: schema.db.users.length };
      });
      this.get("/tasks", (schema, request) => {
        console.log("queryParams", request.queryParams);
        const { page, offset, title, completed } = request.queryParams;
        let data = [...schema.db.tasks];
        if (!!completed) {
          console.log("completed", completed);
          data = data.filter((task) => String(task.completed) === completed);
        }
        if (!!title) {
          console.log("title", title);
          data = data.filter((task) => task.title.includes(title));
        }
        return { data, total_items: data.length };
      });
    },
  });
}
