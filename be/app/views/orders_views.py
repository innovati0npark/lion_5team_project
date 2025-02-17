from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes
from app.models import OrderItem, User, Cart, Order, Item, Shipping_Address
from app.serializer import OrderItemSerializer, CartSerializer, OrderSerializer, ShippingAddressSerializer, RefundSerializer


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def order_item_detail(request, pk):
    try:
        order_item = OrderItem.objects.filter(order_id=pk)
        serializer = OrderItemSerializer(order_item, many=True)
        return Response(serializer.data)
    except OrderItem.DoesNotExist:
        raise Response("Order item does not exist")

@api_view(['POST'])
def add_to_cart(request, pk):
    print(request.user)
    user = User.objects.get(username=request.user)
    item_id = pk
    item = Item.objects.get(id=item_id)
    qty = int(request.data["qty"])
    exist_item = Cart.objects.filter(user_id=user, item_id=item_id)
    if exist_item:
        cart_data = {"user_id": user.id, "item_id": item_id, "qty": exist_item[0].qty + qty, "name": item.name, "price": item.price, "image": item.image_url}   
        exist_item.delete()

    else:
        cart_data = {"user_id": user.id, "item_id": item_id, "qty": qty, "name": item.name, "price": item.price, "image": item.image_url}
    cart_serializer = CartSerializer(data=cart_data)

    if cart_serializer.is_valid():
        cart_serializer.save()
        return Response(cart_serializer.data, status=201)
    else:
        return Response(cart_serializer.errors, status=400)

@api_view(['GET'])
def cart_detail(request):
    user = User.objects.get(username=request.user)
    cart_items = Cart.objects.filter(user_id=user)
    serializer = CartSerializer(cart_items, many=True)

    return Response(serializer.data)

@api_view(['DELETE'])
def remove_from_cart(request, pk):
    user = User.objects.get(username=request.user)
    item = Item.objects.get(id=pk)  
    cart_item = Cart.objects.get(user_id_id=user.id, item_id_id=item.id)
    cart_item.delete()
    return Response("Item removed from cart")

@api_view(['PUT'])
def set_cart_qty(request, pk):
    user = User.objects.get(username= request.user)
    cart_item = Cart.objects.get( id=pk)
    cart_item.qty = request.data["qty"]
    cart_item.save()
    cart_items = Cart.objects.filter(user_id=user)
    serializer = CartSerializer(cart_items, many=True)
    return Response(serializer.data)




@api_view(['POST'])
def create_order(request):
    user = User.objects.get(username=request.user)
    cart_items = Cart.objects.filter(user_id=user.id)
    payment_info = request.data.get('paymentInfo', None)  # paymentInfo 데이터 추출
    print(payment_info)
    if not payment_info:
        return Response({"detail":"Payment information is missing"}, status=400)

    if not cart_items:
        return Response({"detail":"Cart is empty"}, status=400)
    
    now = datetime.now()
    delivery_date = now + timedelta(days=3)
    order_data = {"user_id": user.id, "payment_method": request.data["payment_method"], "shipping_price": 5000, "total_price": 0, "paid_at": now, "is_delivered": False, "delivered_at": delivery_date}
    order_serializer = OrderSerializer(data=order_data)

    if order_serializer.is_valid():
        order = order_serializer.save()
        shipping_address_data = {"order_id": order.id, "address": request.data["address"], "shipping_price": 5000, "city":"city",  "country": "country", "postal_code": "postal_code"}
        shipping_address_serializer = ShippingAddressSerializer(data=shipping_address_data)
        if shipping_address_serializer.is_valid():
            shipping_address_serializer.save()
        else:
            return Response(shipping_address_serializer.errors, status=00)

        total_price = 0
        for cart_item in cart_items:
            print(cart_item)
            image = cart_item.image if cart_item.image else "path/to/default/image.jpg"
            price_multi_qty = cart_item.item_id.price * cart_item.qty
            item_name = Item.objects.get(id=cart_item.item_id_id).name
            print(item_name)
            order_item_data = {"order_id": order.id, "item_id": cart_item.item_id.id, "qty": cart_item.qty, "name": item_name, "price_multi_qty": price_multi_qty, "image": image}
            order_item_serializer = OrderItemSerializer(data=order_item_data)
            if order_item_serializer.is_valid():
                order_item_serializer.save()
                total_price += price_multi_qty
            else:
                return Response(order_item_serializer.errors, status=400)
        cart_items.delete()
        order.total_price = total_price
        order.save()

        return Response(order_serializer.data, status=201)
    else:
        return Response(order_serializer.errors, status=402)


@api_view(['GET'])
def my_order_list(request):
    user = User.objects.get(username=request.user)
    orders = Order.objects.filter(user_id=user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def refund_item(request, order_id, order_item_id):
    order_item = OrderItem.objects.get(id=order_item_id)
    order = Order.objects.get(id=order_id)
    user = User.objects.get(username=request.user)

    # 환불할 수 있는 양이 주문한 양보다 큰지 확인
    refund_amount = request.data.get('refund_amount')
    if int(refund_amount) is None or int(refund_amount) >= order_item.qty:
        return Response({"error": "환불할 수 있는 양이 주문한 양보다 큽니다."}, status=status.HTTP_400_BAD_REQUEST)

    refund_data = {
        "user_id": user.id,
        "order_item_id": order_item_id,
        "reason": request.data.get('reason'), 
        "refund_amount": request.data.get('refund_amount') 
    }

    refund_serializer = RefundSerializer(data=refund_data)

    if refund_serializer.is_valid():
        refund_serializer.save()
        return Response(refund_serializer.data, status=201)
    else:
        return Response(refund_serializer.errors, status=400)
    

@api_view(['GET'])
def order_detail(request, pk):
    try:
        order = Order.objects.get(id=pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    except Order.DoesNotExist:
        raise Response("Order does not exist")
    
@api_view(['GET'])
def get_shipping_address(request, pk):
    try:
        shipping_address = Shipping_Address.objects.get(order_id=pk)
        serializer = ShippingAddressSerializer(shipping_address)
        return Response(serializer.data)
    except Shipping_Address.DoesNotExist:
        raise Response("Shipping address does not exist")