from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth import logout
from django.contrib import messages
import bcrypt
from .models import *


def index(request):
    if "user_id" in request.session:
        context = {
            "one_user" : User.objects.get(id=request.session["user_id"]),
            "all_scores" : Score.objects.exclude(student = request.session["user_id"])
        }
        return render(request, "skazka_app/index.html", context)
    return render(request, "skazka_app/index.html")

def header(request):
    if "user_id" in request.session:
        context = {
            "one_user" : User.objects.get(id=request.session["user_id"]),
            "all_scores" : Score.objects.exclude(student = request.session["user_id"])
        }
        return render(request, "skazka_app/header.html", context)
    return redirect("/")

def register(request):
    return render(request, "skazka_app/register.html")

def register_method(request):
    print("request.POST")
    errors = User.objects.regValidate(request.POST)
    if len(errors) > 0:
        for key, val in errors.items():
            messages.error(request, val)
        return redirect("/register") 
    first_name = request.POST["first_name"]
    last_name = request.POST["last_name"]
    email = request.POST["email"]
    password = request.POST["password"]
    pw_hash = bcrypt.hashpw(password.encode() , bcrypt.gensalt()).decode()
    user = User.objects.create(first_name=first_name, last_name=last_name, email=email, password=pw_hash)
    request.session["user_id"] = user.id
    print(user.first_name)
    return redirect("/")

    # def change_password(request):
    # print("request.POST")
    # errors = User.objects.regValidate(request.POST)
    # if len(errors) > 0:
    #     for key, val in errors.items():
    #         messages.error(request, val)
    #     return redirect("/register") 
    # first_name = request.POST["first_name"]
    # last_name = request.POST["last_name"]
    # email = request.POST["email"]
    # password = request.POST["password"]
    # pw_hash = bcrypt.hashpw(password.encode() , bcrypt.gensalt()).decode()
    # user = User.objects.create(first_name=first_name, last_name=last_name, email=email, password=pw_hash)
    # request.session["user_id"] = user.id
    # print(user.first_name)
    # return redirect("/")

    print("Validations passed")
    return redirect("/")

def login(request):
    return render(request, "skazka_app/login.html")

def login_method(request):
    email = request.POST["email"]
    password = request.POST["password"]
    user_list = User.objects.filter(email = email)
    # request.session["user_id"] = user.id
    context = {
        "email" : email,
        "user" : user_list
    }  
    if len(user_list) > 0:
        logged_user = user_list[0]
        if bcrypt.checkpw(password.encode() , logged_user.password.encode()):
            request.session["user_id"] = logged_user.id
            print(logged_user, "USER ID")
            return redirect("/dashboard")
        else:
            messages.error(request, "Incorrect password")
            return redirect("/login")
    else:
        messages.error(request, "Email does not exist in database")
        return redirect("/login")

def dashboard(request):
    if "user_id" in request.session:
        context = {
            "one_user" : User.objects.get(id=request.session["user_id"]),
            "user_scores" : Score.objects.filter(student = request.session["user_id"]),
            "all_scores" : Score.objects.exclude(student = request.session["user_id"])
        }
        print(Score.objects.filter(student = request.session["user_id"]))
        return render(request, "skazka_app/dashboard.html", context)
    return render(request, "skazka_app/index.html")


def logout_request(request):
    context = {
        "one_user" : User.objects.get(id=request.session["user_id"]),
    }
    request.session.clear()
    logout(request)
    print("cleared")
    return redirect("/", context)

def ch_1(request):
    if "user_id" in request.session:
        context = {
            "one_user" : User.objects.get(id=request.session["user_id"]),
            "all_scores" : Score.objects.exclude(student = request.session["user_id"])
        }
        return render(request, "skazka_app/ch_1.html", context)
    return render(request, "skazka_app/ch_1.html")

def ch_1_quiz(request):
    if "user_id" in request.session:
        context = {
            "one_user" : User.objects.get(id=request.session["user_id"]),
            "all_scores" : Score.objects.exclude(student = request.session["user_id"])
        }
        return render(request, "skazka_app/ch_1_quiz.html", context)
    return render(request, "skazka_app/ch_1_quiz.html")

def create_score(request):
    for key, value in request.session.items(): 
        print (key, value)
    if not "user_id" in request.session:
        messages.error(request, "You must be logged in to save scores")
        return redirect("/")
    student = User.objects.get(id = request.session["user_id"])
    # errors = {}
    # errors = Score.objects.validate_score(request.POST)
    # if len(errors) > 0:
    #     for key, val in errors.items():
    #         messages.error(request, val)
    #     return redirect("/ch_1_quiz")
    chapter = request.POST["chapter"]
    grade = request.POST["grade"]
    new_score = Score.objects.create(chapter=chapter, grade=grade, student=student)
    return redirect ("/dashboard")





# //select results by user id






