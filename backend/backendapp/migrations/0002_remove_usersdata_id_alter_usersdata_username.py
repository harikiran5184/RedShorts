# Generated by Django 4.2 on 2023-05-23 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usersdata',
            name='id',
        ),
        migrations.AlterField(
            model_name='usersdata',
            name='username',
            field=models.CharField(max_length=225, primary_key=True, serialize=False),
        ),
    ]
