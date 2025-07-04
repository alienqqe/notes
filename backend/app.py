from flask import Flask, make_response, request, jsonify, redirect
from functions import *
from flask_cors import CORS
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])


@app.route('/')
def hello_world():

    id = request.cookies.get("id")
    hash = request.cookies.get("hash")

    if not check_hash(USERS_DB, id, hash):
        return redirect("/login")




    return 'Hello World!'




@app.route('/api/login', methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not userIsExist(username, USERS_DB):
        return jsonify({"success": False, "message": "User does not exist"}), 404

   
    if not check_password(USERS_DB, username, password):
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

   
    user_id = get_id(USERS_DB, username)
    user_hash = get_hash(USERS_DB, username)

    response = make_response(jsonify({"success": True, "message": "Login successful"}))
    response.set_cookie("id", user_id)
    response.set_cookie("hash", user_hash)

    return response


@app.route('/api/register', methods=["POST"])
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

        response.set_cookie("id", str(id))
        response.set_cookie("hash", str(hash))

        return response




if __name__ == '__main__':
    app.run()
