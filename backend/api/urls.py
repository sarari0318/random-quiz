from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'api'

router = DefaultRouter()
router.register('solved', views.SolvedListViewSet)
router.register('unsolved', views.UnsolvedListViewSet)

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name="create"),
    path('', include(router.urls)),
]
