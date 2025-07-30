from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('profile/', views.profile, name='profile'),
    # Artikel
    path('articles/', views.article_list_create, name='article-list'),
    path('articles/<int:pk>/', views.article_detail, name='article-detail'),
]
