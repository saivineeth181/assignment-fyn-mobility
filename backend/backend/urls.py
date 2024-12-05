"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter

from app.views import OrderViewSet, SparePartViewSet, CustomerViewSet, revenue_summary, CreateOrderViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/revenue/', revenue_summary)
]


router = DefaultRouter()
router.register(r'api/orders/create', CreateOrderViewSet, basename='create-order')
router.register(r'api/orders', OrderViewSet, basename='orders')
router.register(r'api/spareparts', SparePartViewSet)
router.register(r'api/customers', CustomerViewSet)


urlpatterns += router.urls
