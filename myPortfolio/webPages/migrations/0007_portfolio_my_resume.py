# Generated by Django 2.2.13 on 2020-10-12 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webPages', '0006_webpages_contact_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolio',
            name='my_resume',
            field=models.FileField(blank=True, upload_to='webpages/portfolio'),
        ),
    ]
