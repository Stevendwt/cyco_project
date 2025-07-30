from django.db import models
from django.contrib.auth.models import User

CATEGORY_CHOICES = [
    ("dasar", "Dasar Jaringan"),
    ("keamanan", "Keamanan Jaringan"),
    ("tools", "Tools & Aplikasi"),
    ("konfigurasi", "Konfigurasi Jaringan"),
]

class Article(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="dasar")
    created_at = models.DateTimeField(auto_now_add=True)

class Video(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    video_url = models.URLField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="dasar")
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title
