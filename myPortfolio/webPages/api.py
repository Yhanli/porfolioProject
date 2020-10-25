from .models import *
from rest_framework import viewsets, permissions, status
from .serializers import WebPagesSerializer
from rest_framework import filters
from rest_framework.response import Response
import smtplib, ssl
from django.conf import settings

from records.models import *
import threading
from django.utils import timezone
from datetime import timedelta


class LikeThread(threading.Thread):
    def __init__(self, request, **kwargs):
        self.request = request
        super(LikeThread, self).__init__(**kwargs)

    def run(self):
        request = self.request


def record_log(request, status):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    record = Records()
    record.record_type = 'email'
    record.action = 'send email'
    record.status = status
    record.reference = ip
    record.name = request.data['name']
    record.content = f"{request.data['subject']}\n{request.data['message']}"
    record.save()


class WebPagesViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WebPagesSerializer
    http_method_names = {'get', 'post'}

    def post(self, request, format=None):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        repeat = Records.objects.filter(reference=ip, created_at__gte=(
                    timezone.now() - timedelta(minutes=settings.EMAIL_MAX_DURATION)))
        if repeat:
            time_wait = ((repeat[0].created_at + timedelta(
                minutes=settings.EMAIL_MAX_DURATION)) - timezone.now()).seconds
            return Response(f"Too frequent, please wait {time_wait} seconds before trying with IP:{ip}.",
                            status=status.HTTP_400_BAD_REQUEST)
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
                server.sendmail(settings.EMAIL_ACCOUNT, request.data['sendto'], email_text.encode('utf-8'))
                server.ehlo()
            record_log(request, 1)
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
