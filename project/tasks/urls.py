from rest_framework.routers import DefaultRouter
from .views import CategoryMV, TasksMV, DashboardTaskCompletionsStatViewSet, DashboardTaskByCategoryViewSer

router = DefaultRouter()
router.register('api/categories', CategoryMV, basename= 'cateogries')
router.register('api/tasks', TasksMV, 'tasks')
router.register('api/dashboard/tasks-completion', DashboardTaskCompletionsStatViewSet, 'completion')
router.register('api/dashboard/tasks-category-distribution', DashboardTaskByCategoryViewSer, 'tasks-category-distribution' )

urlpatterns = router.urls