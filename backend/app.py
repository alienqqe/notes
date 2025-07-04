from flask import Flask, request, jsonify, redirect
from functions import *
app = Flask(__name__)


@app.route('/')
def hello_world():

    id = request.cookies.get("id")
    hash = request.cookies.get("hash")

    if not check_hash(USERS_DB, id, hash):
        return redirect("/login")




    return 'Hello World!'




@app.route('/api/login')
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")


    if not userIsExist(username, USERS_DB):
        response = make_response(jsonify({"success": True, "message": "Login successful"}))
        response.set_cookie("id", get_id(USERS_DB, username))
        response.set_cookie("hash", get_hash(USERS_DB, username))

        return response

    if check_password(USERS_DB, username, password):

        return jsonify({"success": True, "message": "Logged in",})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401


@app.route('/api/register')
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if userIsExist(username, USERS_DB):
        return jsonify({"success": False, "message": "User already exist", })

    else:
        response = make_response(jsonify({"success": True, "message": "Register successful"}))
        id, hash = add_user(USERS_DB, username, email, password)

        response.set_cookie("id", id)
        response.set_cookie("hash", hash)

        return response




if __name__ == '__main__':
    app.run()
