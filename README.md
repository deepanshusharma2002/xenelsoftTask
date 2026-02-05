if .env is -

PORT=8000
JWT_SECRET=xenelsoft_test
MONGO_URI=mongodb://127.0.0.1:27017/deepanshu_task


Then
User SignUp: Method: - POST - http://localhost:8000/api/user/signup

req.body: - { 
    "name": "Deepanshu Sharma",
    "phone_number": "+911234567890", 
    "email": "deepanshu@xenelsoft.com", 
    "password": "88888888"
  }

  response: - {
    "success": true,
    "message": "User registered successfully",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODQ0NDc1YTRhZTFkNzUxZjUwOWExYSIsImVtYWlsIjoiZGVwYW5zaHVAeGVuZWxzb2Z0LmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJpYXQiOjE3NzAyNzU5NTcsImV4cCI6MTc3MDg4MDc1N30.kyzfJGgZxEpXcLAqGIOZqWUaUJuDhNlklZMMc5F0Q9g"
    }
}

token expires after 7 days.

User LogIn: Method: - POST - http://localhost:8000/api/user/login

req.body: - {
    "email": "deepanshu@xenelsoft.com", 
    "password": "88888888"
  }

req.body: - {
    "success": true,
    "message": "User loged in successfully",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODQ0NDc1YTRhZTFkNzUxZjUwOWExYSIsImVtYWlsIjoiZGVwYW5zaHVAeGVuZWxzb2Z0LmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJpYXQiOjE3NzAyNzYwMzAsImV4cCI6MTc3MDg4MDgzMH0.yZ5rU0UmIsHdLCdtkWJDqiY2oVYwNp4grX4HQW9GprY"
    }
}

token expires after 7 days.

for get User : - Method: - GET - http://localhost:8000/api/user/login

in Authorization add bearer Token (got it from login and signup)

response: - {
    "success": true,
    "data": {
        "_id": "698441b1f4ab82805bbb85ae",
        "name": "Deepanshu Sharma",
        "email": "deepanshu@xenelsoft.com",
        "phone_number": "+911234567890",
        "role": "user",
        "status": 1,
        "__v": 0
    }
}


CATCH 
if port is not 8000 then replace port into env port.



