# Generated by Django 5.1 on 2024-10-08 06:34

import nepali_datetime_field.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0006_alter_customer_registration_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='citizenship_issue_date',
            field=nepali_datetime_field.models.NepaliDateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='dob',
            field=nepali_datetime_field.models.NepaliDateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='meter_connected_date',
            field=nepali_datetime_field.models.NepaliDateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='reading_effective_date',
            field=nepali_datetime_field.models.NepaliDateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='meterreading',
            name='reading_month',
            field=nepali_datetime_field.models.NepaliDateField(),
        ),
    ]