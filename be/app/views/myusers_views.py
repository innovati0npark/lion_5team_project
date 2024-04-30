from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from app.models import Seller, User , User_QnA, Order,OrderItem
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from app.serializer import SellerSerializer, UserSerializer, OrderSerializer, OrderItemSerializer, MyUserQnASerializer 


@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def get_Seller_Apply(request):
    serializer = SellerSerializer(data=request.data)

    if serializer.is_valid():
        user = User.objects.get(name=request.user)
        serializer.save(user_id=user)

        # User의 is_seller를 True로 변경
        user = request.user
        user.is_seller = True
        user.save()

        return Response(serializer.data, status=201)
    else:
        return Response(serializer.errors, status=400)
    



@api_view(['GET'])
def my_shopping(request):
    user = User.objects.get(name=request.user)
    orders = Order.objects.filter(user_id=user)
    orders_ids = orders.values_list('id', flat=True)
    order_items = OrderItem.objects.filter(order_id__in=orders_ids)
    serializer = OrderItemSerializer(order_items, many=True)
    
    # 시리얼라이즈된 주문 정보를 응답으로 반환합니다.
    return Response(serializer.data)


# def get_mypage_profile(request):
#     user = request.user
#     serializer = UserSerializer(user)
#     return JsonResponse(serializer.data)


from django.core.exceptions import ObjectDoesNotExist

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def get_mypage_profile(request):
    user = User.objects.get(name=request.user)
    user_data = User_Serializer(user).data
    try:
        seller = Seller.objects.get(user_id=user)
        seller_data = SellerSerializer(seller).data
    except ObjectDoesNotExist:
        seller_data = None
    return JsonResponse({'user': user_data, 'seller': seller_data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyUserQnA(request):
    user = User.objects.get(name=request.user)
    my_user_qna_list = User_QnA.objects.filter(user_id=user)
    serializer = MyUserQnASerializer(my_user_qna_list, many=True)
    return Response(serializer.data)