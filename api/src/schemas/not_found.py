from marshmallow import Schema, fields


class NotFoundResponse(Schema):
    message = fields.String()
