from marshmallow import Schema, fields


class TaskResponse(Schema):
    id = fields.Int()
    user_id = fields.Int()
    title = fields.String()
    completed = fields.Bool()


class TaskRequest(Schema):
    task_id = fields.Int()


class TasksResponseSchema(Schema):
    total_items = fields.Int()
    data = fields.List(fields.Nested(TaskResponse))


class TasksRequestSchema(Schema):
    offset = fields.Int()
    limit = fields.Int()
    completed = fields.Bool()
    title = fields.String()
