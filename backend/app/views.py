from datetime import datetime, timedelta

from django.db.models import Sum
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Order, OrderItem, SparePart, Customer
from .serializers import OrderSerializer, OrderItemSerializer, \
    SparePartSerializer, CustomerSerializer, createOrderItemSerializer, \
        CreateOrderSerializer

import random 

class SparePartViewSet(viewsets.ModelViewSet):
    queryset = SparePart.objects.all()
    serializer_class = SparePartSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CreateOrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = CreateOrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()
            for item in request.data.get('items', []):
                spare_part_data = item.pop('spare_part')
                spare_part = SparePart.objects.get(id=spare_part_data['id'])
                OrderItem.objects.create(order=order, spare_part=spare_part, **item)
            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def revenue_summary(request):
    # Calculate dates
    today = datetime.now()
    last_7_days = [today - timedelta(days=i) for i in range(7)]
    last_6_months = [(today.replace(day=1) - timedelta(days=i * 30)).strftime('%Y-%m') for i in range(6)]
    last_6_years = [today.year - i for i in range(6)]

    # Revenue calculations
    daily_revenue = [
        {
            "date": day.strftime('%Y-%m-%d'),
            "revenue": Order.objects.filter(order_date__date=day).aggregate(total=Sum('total_price'))['total'] or 0
        }
        for day in reversed(last_7_days)
    ]

    monthly_revenue = [
        {
            "month": month,
            "revenue": Order.objects.filter(order_date__year=month.split('-')[0],
                                            order_date__month=month.split('-')[1]).aggregate(total=Sum('total_price'))['total'] or 0
        }
        for month in reversed(last_6_months)
    ]

    yearly_revenue = [
        {
            "year": year,
            "revenue": Order.objects.filter(order_date__year=year).aggregate(total=Sum('total_price'))['total'] or 0
        }
        for year in reversed(last_6_years)
    ]

    return JsonResponse({
        "daily_revenue": daily_revenue,
        "monthly_revenue": monthly_revenue,
        "yearly_revenue": yearly_revenue
    })
