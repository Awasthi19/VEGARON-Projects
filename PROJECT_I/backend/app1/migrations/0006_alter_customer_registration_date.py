# Generated by Django 5.1 on 2024-10-08 06:33

import nepali_datetime_field.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0005_rename_wire_size_customer_ampere_rating_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='registration_date',
            field=nepali_datetime_field.models.NepaliDateField(blank=True, null=True),
        ),
    ]