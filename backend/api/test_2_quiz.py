from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Quiz
from .serializers import QuizSerializer

UNSOLVED_QUIZ_URL = '/api/unsolved/'


def create_quiz(quiz_title, quiz_url, quiz_memo):
    return Quiz.objects.create(quizTitle=quiz_title, quizUrl=quiz_url, quizMemo=quiz_memo)


class AuthorizedUserApiTasks(TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(email='dummy', password='dummy_pw')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_2_should_get_all_solved_quiz(self):
        create_quiz("No.1", "https://google.com", "This is Google")
        create_quiz("No.2", "https://facebook.com", "This is Facebook")
        create_quiz("No.3", "https://amazon.com", "This is Facebook")
        res = self.client.get(UNSOLVED_QUIZ_URL)
        quizzes = Quiz.objects.all().order_by('id')
        serialzer = QuizSerializer(quizzes, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serialzer.data)
