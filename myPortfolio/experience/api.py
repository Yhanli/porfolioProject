from .models import *
from rest_framework import viewsets, permissions
from .serializers import ExperienceSerializer
from rest_framework.response import Response
from datetime import datetime


class ExperienceViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.all()
    http_method_names = ['get']

    def list(self, request):
        queryset = Experience.objects.all()
        queryset = queryset.filter(active=True)
        queryset = queryset.order_by('-time_start')
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        result_ = {}
        for exp in data:
            start_time = datetime.strptime(exp['time_start'], '%Y-%m-%d')
            year = start_time.year
            month = start_time.strftime('%b')
            day = start_time.strftime('%d')
            try:
                end_time = datetime.strptime(exp['time_end'], '%Y-%m-%d').strftime('%b %Y')
            except:
                end_time = "CURRENT"
            if len(end_time) < 6:
                end_time = "CURRENT"

            if year not in result_.keys():
                result_[year] = []
            result_[year] += [
                {
                    'id': exp['id'],
                    'title': exp['title'],
                    'nature': exp['nature'],
                    'company': exp['company'],
                    'location': exp['location'],
                    'time_start': exp['time_start'],
                    'time_end': end_time,
                    'description': exp['description'],
                    'year': year,
                    'month': month,
                    'day': day,
                }
            ]
        final_ = []
        for (key, val) in result_.items():
            final_.append({
                'year': key,
                'experience': val
            })
        return Response(final_)
