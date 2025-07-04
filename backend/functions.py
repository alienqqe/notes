import csv
import os
import datetime
import string
import re
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets
from static import *





def userIsExist(user, file):
    with open(file, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["username"] == user:
                return True

    return False

def generate_code():
    result = ""
    for i in range(6):
        number = random.randint(0,9)
        result += str(number)
    return result


def add_user(file, username, email, password):
    with open(file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        ids = [int(row["id"]) for row in reader]
        new_id = max(ids) + 1 if ids else 1
    hash = secrets.token_hex(32)
    with open(file, "a", newline="", encoding="utf-8") as f:
        fieldnames = ["id", "username", "email", "password", "hash"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writerow({
            "id": new_id,
            "username": username,
            "email": email,
            "password": password,
            "hash":hash
        })



    return new_id, hash


def check_password(file,user,password):
    with open(file, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["username"] == user:
                if row["password"] == password:
                    return True
                else:
                    return False


def check_hash(file, id, hash):
    with open(file, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["id"] == id:
                if row["hash"] == hash:
                    return True
                else:
                    return False


def get_id(file, username):
    with open(file, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["username"] == username:
                return row["id"]

    return False

def get_hash(file, username):
    with open(file, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["username"] == username:
                return row["hash"]

    return False

def get_username(file, id):
    with open(file, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["id"] == id:
                return row["username"]

    return False


