from django.urls import path     
from . import views

app_name = "skazka_app"

urlpatterns = [
    path('', views.index, name = "index"),
    path('ch_1/', views.ch_1, name = "ch_1"),
    path('ch_1_quiz/', views.ch_1_quiz, name = "ch_1"),
    path('create_score', views.create_score, name = "create_score"),
    path('dashboard/', views.dashboard, name = "dashboard"),
    path('login/', views.login, name='login'),
    path('login_method/', views.login_method, name='login_method'),
    path('logout/', views.logout_request, name='logout'),
    path('register/', views.register, name='register'),
    path('register_method/', views.register_method, name='register_method'),
]