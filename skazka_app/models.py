from django.conf import settings
from django.db import models
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

# User = settings.AUTH_USER_MODEL

# class Result(models.Model):
#     user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
#     score = models.IntegerField(default=0)
#     created = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.score

# models.ForeignKey

# Score / Result 
# What quiz
# what the result was
# what user took it
# look up a user on usermodel and look up result_set


from django.db import models
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

class UserManager(models.Manager):
    def regValidate(self, postData):
        error = {}
        if len(postData["first_name"]) < 2:
            error["first_name"] = "Your first name must be at least 2 characters"
        if len(postData["last_name"]) < 2:
            error["last_name"] = "Your last name must be at least 2 characters"
        
        #VALIDATE WITH EMAIL REGEX AND CHECK FOR DUPLICATES
        if not EMAIL_REGEX.match(postData["email"]):
            error["email"] = "Your email must be in a valid format"
        if User.objects.filter(email=postData["email"]):
            error["emaildupe"] = "Your email is already registered"
        
        #VALIDATE PASSWORD AND CONFIRM PASSWORD MATCHES
        if len(postData["password"]) < 8:
            error["password"] = "Your password must be longer than 8 characters"
        if postData["password"] != postData["confirm_password"]:
            error["passwordmatch"] = "Your passwords don't match!"
        return error

        def loginValidate(self, postData):
            error = {}
            #VALIDATE WITH REGEX AND CHECK FOR EMAIL IN DB
            if not EMAIL_REGEX.match(postData["email"]):
                error["email"] = "Your email must be in a valid format"
            
            #CHECK IF PASSWORD MATCHES PASSWORD IN DB
            if not User.objects.filter(email=postData["email"]):
                error["loginemail"] = "Email does not exist in system"
                return error
            user = User.objects.get(email=postData["email"])
            if bcrypt.checkpw(postData["password"].encode(), user.password.encode()):
                pass
            else:
                error["password"] = "Invalid password"
            return error

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    objects = UserManager()

    created_at = models.DateTimeField(auto_now_add=True)
    upddated_at = models.DateTimeField(auto_now=True)

class ScoreManager(models.Manager):
    def validate_score(self, postData):
        score_list = Score.objects.filter(grade = postData["grade"])
        # errors = {}
        # if len(postData["title"]) < 3:
        #     errors["score"] = "Score must be longer than 3 characters"
        # # elif len(trip_list) > 0:
        #     #errors[""] = "Your trip already exists!"

        # if len(postData["desc"]) < 3:
        #     errors["desc"] = "Description must be at least 3 characters"
        # return errors


class Score(models.Model):
    chapter = models.CharField(max_length=255)
    desc = models.CharField(max_length=255)
    grade = models.IntegerField(default=0)
    objects = ScoreManager()
    student = models.ForeignKey(User, related_name="quizzes_completed", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)