from rest_framework import permissions
from tasks.models import Category

class TaskPermissions(permissions.BasePermission):
    message = 'Category not founddd'

    def has_permission(self, request, view):
        print(request.method)

        if request.method == 'DELETE' or request.method == 'PATCH':
           
            return True

        elif request.method == 'UPDATE':
            return True
        
        elif request.method not in permissions.SAFE_METHODS:
            category = request.data.get('category')          
            user_categories = Category.objects.filter(created_by=request.user, id=category).exists()
          
            if user_categories:
                return True
            return False
        elif request.method in permissions.SAFE_METHODS:
            return True