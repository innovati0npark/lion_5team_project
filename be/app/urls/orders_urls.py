from django.urls import path
from app.views.orders_views import order_item_detail, cart_detail, add_to_cart, create_order, refund_item, remove_from_cart, set_cart_qty

urlpatterns = [
    path('detail/<int:pk>/', order_item_detail, name='order_detail'),
    path('cart/', cart_detail, name='cart_detail'),
    path('cart/<int:pk>/', add_to_cart, name='add_cart'),
    path('cart/update/<int:pk>/', set_cart_qty, name='set_cart_qty'),
    path('cart/remove/<int:pk>/', remove_from_cart, name='remove_cart'),
    path('payment/', create_order, name='create_order'),
    path('refund/<int:order_id>/<int:order_item_id>/', refund_item, name='refund_item'),
]