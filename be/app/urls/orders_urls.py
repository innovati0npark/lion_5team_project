from django.urls import path
from app.views.orders_views import *

urlpatterns = [
    path('detail/<int:pk>/', order_item_detail, name='order_detail'),
    path('cart/', cart_detail, name='cart_detail'),
    path('payment/', create_order, name='create_order'),
]