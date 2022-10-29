from django.shortcuts import render
from .serializers import CategorySerializer, DashboardTaskByCategorySwrializer, DashboardTaskCompletedSerializer, TaskSerializer
from .models import Category, Task
from rest_framework import viewsets, permissions, filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .permisions import TaskPermissions
from django.db.models import Count
from django.db.models.query_utils import Q
# Create your views here.
class StandardResultSetPagination(PageNumberPagination):
    page_size = 6 #defaulta page_size
    page_size_query_param = 'page_size' # this is the parameter to specifize the page sieze otherwqise is 6
    max_page_size = 6


class CategoryMV(viewsets.ModelViewSet): # this provide crud in one url
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CategorySerializer
    queryset =  Category.objects.all()

    def get_queryset(self): #return categories that belogn to the current login user
        return self.request.user.categories.all()

    def perform_create(self, serializer): #when a categorie is created we are adding created_by = the current user
        serializer.save(created_by=self.request.user)

class TasksMV(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TaskPermissions]

    serializer_class = TaskSerializer
    pagination_class =  StandardResultSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    ordering_fields = ['completed', '-created_at'] #field to ordering our list
    ordering = ['completed']


    def get_queryset(self):

        user = self.request.user
        completed = self.request.query_params.get('completed')
        priority = self.request.query_params.get('priority')
        category = self.request.query_params.get('category')
        query_params = {}
        print(priority)

        if completed is not None:
            query_params["completed"] = completed

        if priority is not None:
            query_params['priority'] = priority

        if category is not None:
            query_params["category"] = category


        return Task.objects.filter(created_by=user, **query_params)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class DashboardTaskCompletionsStatViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        user = self.request.user
        queryset = Task.objects.filter(created_by=user).values("completed").annotate(count=Count('completed'))
        serializer = DashboardTaskCompletedSerializer(queryset, many=True)
        return Response(serializer.data)

class DashboardTaskByCategoryViewSer(viewsets.ViewSet):
    permission_classes =[permissions.IsAuthenticated]

    def list(self, request):
        user = self.request.user
        tasks_filter = {}
        completed = self.request.query_params.get("completed")
        if completed is not None:
            tasks_filter['tasks__completed'] = completed
        queryset = Category.objects.filter(created_by=user).annotate(count=Count('tasks', filter=Q(**tasks_filter)))
        serializer = DashboardTaskByCategorySwrializer(queryset, many=True)

        return Response(serializer.data)

