# Generated by Django 2.2.13 on 2020-10-28 02:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webPages', '0008_webpages_front_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='webpages',
            name='front_image',
        ),
    ]
