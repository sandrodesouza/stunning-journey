from marshmallow import Schema, fields


class AddressGeo(Schema):
    lat = fields.Number()
    lng = fields.Number()


class UserAddress(Schema):
    street = fields.String()
    suite = fields.String()
    city = fields.String()
    zipcode = fields.String()
    geo = fields.Nested(AddressGeo)


class UserCompany(Schema):
    name = fields.String()
    catchPhrase = fields.String()
    bs = fields.String()


class UserResponse(Schema):
    id = fields.Int()
    name = fields.String()
    username = fields.String()
    email = fields.String()
    address = fields.Nested(UserAddress)
    phone = fields.String()
    website = fields.String()
    company = fields.Nested(UserCompany)


class UsersResponseSchema(Schema):
    total_items = fields.Int()
    data = fields.List(fields.Nested(UserResponse))
