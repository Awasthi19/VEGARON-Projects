# Generated by Django 5.1 on 2024-08-28 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0002_administrativecharge_meterreading_payment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='customer_no',
            field=models.CharField(max_length=20),
        ),
    ]
