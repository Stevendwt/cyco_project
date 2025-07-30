# core/views.py
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from .models import Article, Video
from .serializers import ArticleSerializer, VideoSerializer
from django.db import IntegrityError

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    user.username = request.data.get('username', user.username)
    user.email = request.data.get('email', user.email)
    user.save()
    return Response({
        'username': user.username,
        'email': user.email,
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')

    if not username or not password:
        return Response({'error': 'Username dan password wajib diisi'}, status=400)

    try:
        User.objects.create_user(username=username, password=password, email=email)
        return Response({'message': 'Register berhasil'}, status=201)
    except IntegrityError:
        return Response({'error': 'Username sudah digunakan'}, status=400)
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']

    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'message': 'Login berhasil'})
    else:
        return JsonResponse({'error': 'Login gagal'}, status=401)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    return JsonResponse({
        'username': request.user.username,
        'email': request.user.email,
    })


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]  # Ganti ke [IsAuthenticated] jika butuh login


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all().order_by('-created_at')
    serializer_class = VideoSerializer
    permission_classes = [AllowAny]  # Ganti ke [IsAuthenticated] jika butuh login
