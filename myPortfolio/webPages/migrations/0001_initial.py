# Generated by Django 2.2.13 on 2020-09-13 07:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WebPages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site_name', models.CharField(blank=True, max_length=1000)),
                ('favicon', models.FileField(upload_to='website_main/')),
                ('facebook', models.CharField(blank=True, max_length=1000)),
                ('instagram', models.CharField(blank=True, max_length=1000)),
                ('twitter', models.CharField(blank=True, max_length=1000)),
                ('youtube', models.CharField(blank=True, max_length=1000)),
                ('linkedin', models.CharField(blank=True, max_length=1000)),
            ],
            options={
                'verbose_name': 'Website Page',
                'verbose_name_plural': 'Website Pages',
            },
        ),
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('front_image', models.FileField(blank=True, upload_to='webpages/portfolio')),
                ('page_title', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('name', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('description', models.TextField(blank=True)),
                ('webPages', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='webPages.WebPages')),
            ],
        ),
    ]
