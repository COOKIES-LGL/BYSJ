from django.conf.urls import url
from . import views

urlpatterns = [
    url('rankList', views.rankList)
]