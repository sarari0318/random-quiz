from django.shortcuts import render
from rest_framework import viewsets, generics, authentication, permissions
from .serializers import UserSerializer, QuizSerializer
from .models import User, Quiz


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class SolvedListViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.filter(is_solved=True).order_by('created_on')
    serializer_class = QuizSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class UnsolvedListViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.filter(is_solved=False).order_by('created_on')
    serializer_class = QuizSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
