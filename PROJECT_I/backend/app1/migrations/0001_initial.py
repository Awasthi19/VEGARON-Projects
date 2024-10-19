# Generated by Django 5.1 on 2024-08-27 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_no', models.CharField(max_length=20, unique=True)),
                ('registration_date', models.DateField()),
                ('meter_connected_date', models.DateField()),
                ('customers_name_english', models.CharField(max_length=100)),
                ('customers_name_nepali', models.CharField(max_length=100)),
                ('citizenship_no', models.CharField(blank=True, max_length=20, null=True)),
                ('address_tole', models.CharField(max_length=100)),
                ('address_nepali', models.CharField(max_length=100)),
                ('political_ward', models.CharField(blank=True, max_length=10, null=True)),
                ('marga', models.CharField(blank=True, max_length=50, null=True)),
                ('area_number', models.CharField(max_length=20)),
                ('mobile_number', models.CharField(max_length=15)),
                ('meter_status', models.CharField(max_length=50)),
                ('customer_type', models.CharField(max_length=50)),
                ('meter_type', models.CharField(max_length=50)),
                ('meter_serial', models.CharField(max_length=50, unique=True)),
                ('tod_meter', models.BooleanField(default=False)),
                ('meter_initial_reading', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('reading_effective_date', models.DateField()),
                ('number_of_consumers', models.IntegerField(default=0)),
                ('wire_type', models.CharField(blank=True, max_length=50, null=True)),
                ('wire_size', models.CharField(blank=True, max_length=50, null=True)),
                ('transformer', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50, unique=True)),
                ('password', models.CharField(max_length=50)),
            ],
        ),
    ]