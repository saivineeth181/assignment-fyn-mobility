# serializers.py
from rest_framework import serializers
from .models import Order, OrderItem, SparePart, Customer

class SparePartSerializer(serializers.ModelSerializer):
    class Meta:
        model = SparePart
        fields = ['id', 'name', 'price', 'description']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    spare_part = SparePartSerializer()

    class Meta:
        model = OrderItem
        fields = ['spare_part', 'quantity', 'total_price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    customer = CustomerSerializer()

    class Meta:
        model = Order
        fields = ['id', 'customer', 'status', 'total_price', 'order_date', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        return order

class CreateOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'status', 'total_price', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        return order


class createOrderItemSerializer(serializers.ModelSerializer):
    spare_part = SparePartSerializer()
    order = OrderSerializer()

    class Meta:
        model = OrderItem
        fields = ['order', 'spare_part', 'quantity', 'total_price']

    def create(self, validated_data):
        print(validated_data)
        spare_part_data = validated_data.pop('spare_part')
        spare_part = SparePart.objects.get(id=spare_part_data['id'])
        order_item = OrderItem.objects.create(spare_part=spare_part, **validated_data)
        return order_item