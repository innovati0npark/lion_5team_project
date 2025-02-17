from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from app.models import Seller, OrderItem, User, Item, User_Answer, Refund
from app.serializer import SellerSerializer, OrderItemSerializer, ItemSerializer, RefundSerializer, ItemAnswerSerializer
from rest_framework import status

@api_view(['GET'])
def index(request):
    sellers = Seller.objects.all()
    order_items = OrderItem.objects.all()

    seller_serializer = SellerSerializer(sellers, many=True)
    order_item_serializer = OrderItemSerializer(order_items, many=True)

    data = {
        'sellers': seller_serializer.data,
        'order_items': order_item_serializer.data
    }

    return Response(data)

class SellerItemManageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.get(username=request.user)
        seller = Seller.objects.get(user_id_id=user.id)
        items = Item.objects.filter(seller_id=seller)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def SellerRevenueView(request):
    user = User.objects.get(username=request.user)
    seller = Seller.objects.get(user_id=user)
    items = Item.objects.filter(seller_id=seller)
    total_revenue = 0
    for item in items:
        order_items = OrderItem.objects.filter(item_id=item)
        for order_item in order_items:
            order_item.price_multi_qty = item.price * order_item.qty
            total_revenue += order_item.price_multi_qty
    return Response({'total_revenue': total_revenue})


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def SellerSettingsView(request):
    user = User.objects.get(username=request.user)
    seller = Seller.objects.get(user_id=user)
    if request.method == 'GET':
        return Response({
            'name': user.name,
            'phone': user.phone,
            'address': user.address,
            'nickname': user.nickname,
            'email': user.email,
            'address': user.address,
            'description': user.description,
            'bs_number': seller.bs_number,
        })
    elif request.method == 'POST':
        # Seller information 수정요청시
        seller.bs_number = request.data.get('bs_number', seller.bs_number)
        seller.save()
        return Response({'message': 'Seller information updated successfully'})
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def seller_qna_view(request):
    user = User.objects.get(username=request.user)

    seller_answer_list = User_Answer.objects.filter(user_id_id=user.id)
    serializer = ItemAnswerSerializer(seller_answer_list, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def seller_refund_view(request):
    user = User.objects.get(username=request.user)
    print(request.user)
    print(f'User: {user}')

    seller = Seller.objects.get(user_id=user)
    print(f'Seller: {seller}')

    order_items = OrderItem.objects.filter(item_id__seller_id=seller)
    print(f'Order items: {order_items}')

    order_item_ids = [item.id for item in order_items]
    print(order_item_ids)

    refund_items = Refund.objects.filter(order_item_id__in=order_item_ids)
    print(f'Refund items: {refund_items}')
    
    serializer = RefundSerializer(refund_items, many=True)
    return Response(serializer.data)

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def Seller_Apply_Save(request):
    if request.method == 'POST':
        bs_number = request.data.get('bs_number')
        if bs_number is None:
            return Response({'error': 'bs_number is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.get(username=request.user)
        user.is_seller = True
        user.save()
        seller = Seller.objects.create(
            user_id=user,
            bs_number=request.data.get('bs_number')
            )
        serializer = SellerSerializer(seller)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'GET':
        user = User.objects.get(username=request.user)
        if user.is_seller:
            seller = Seller.objects.get(user_id=user)
            serializer = SellerSerializer(seller)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User is not a seller'}, status=status.HTTP_400_BAD_REQUEST)