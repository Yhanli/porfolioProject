from .models import *
from rest_framework import viewsets, permissions, status
from .serializers import WebPagesSerializer
from rest_framework import filters
from rest_framework.response import Response
import smtplib, ssl
from django.conf import settings

class WebPagesViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WebPagesSerializer
    http_method_names = {'get', 'post'}

    def post(self, request, format=None):
        try:
            email_text = f"""\
From: {request.data['email']}
To: {request.data['sendto']}
Subject: {request.data['subject']} - {request.data['name']}

Contact person is {request.data['name']}
Contact person's email is {request.data['email']}

{request.data['message']}
"""
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(settings.EMAIL_SERVER, settings.EMAIL_PORT, context=context) as server:
                server.ehlo()
                server.login(settings.EMAIL_ACCOUNT, settings.EMAIL_PASSWORD)
                server.ehlo()
                server.sendmail(settings.EMAIL_ACCOUNT, request.data['sendto'], email_text)
                server.ehlo()
            return Response("Message sent", status=status.HTTP_200_OK)
        except:
            return Response("Message not sent, please contact me on LinkedIn.", status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = WebPages.objects.all()
        serializer = WebPagesSerializer(many=True)
        if len(serializer.data) > 0:
            return Response(serializer.data[0])
        else:
            serializer = WebPagesSerializer(queryset, many=True)
            return Response(serializer.data[0])
