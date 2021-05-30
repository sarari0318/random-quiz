from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Quiz

CREATE_USER_URL = '/api/create/'
TOKEN_URL = '/auth/'


class UnauthorizedUserApiTest(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_1_1_should_get_user(self):
        payload = {
            'email': 'dummy@gmail.com',
            'password': 'dummy_pw',
        }
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email=payload['email'])
        self.assertTrue(
            user.check_password(payload['password'])
        )
        self.assertNotIn('password', res.data)

    def test_1_2_should_not_create_user_by_same_credentials(self):
        payload = {'email': 'dummy@gmail.com', 'password': 'dummy_pw'}
        get_user_model().objects.create_user(**payload)
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1_3_should_response_token(self):
        payload = {'email': 'dummy@gmail.com', 'password': 'dummy_pw'}
        get_user_model().objects.create_user(**payload)
        res = self.client.post(TOKEN_URL, payload)

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_1_4_should_not_response_token_with_invalid_credentials(self):
        get_user_model().objects.create_user(email='dummy@gmail.com', password='dummy_pw')
        payload = {'email': 'dummy@gmail.com', 'password': 'wrong'}
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1_5_should_not_response_token_with_non_exist_credentials(self):
        payload = {'email': 'dummy@gmail.com', 'password': 'dummy_pw'}
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1__6_should_not_response_token_with_missing_field(self):
        payload = {'email': 'dummy@gmail.com', 'password': ''}
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1__7_should_not_response_token_with_missing_field(self):
        payload = {'email': '', 'password': ''}
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
