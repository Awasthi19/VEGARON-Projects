# Generated by Django 5.1 on 2024-10-10 01:50

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0007_alter_customer_citizenship_issue_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='meterreading',
            name='cost',
        ),
        migrations.RemoveField(
            model_name='meterreading',
            name='fine',
        ),
        migrations.RemoveField(
            model_name='meterreading',
            name='paid',
        ),
        migrations.RemoveField(
            model_name='meterreading',
            name='reading_month',
        ),
        migrations.RemoveField(
            model_name='meterreading',
            name='units_consumed',
        ),
        migrations.AddField(
            model_name='meterreading',
            name='charges',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meterreading',
            name='consumption_units',
            field=models.DecimalField(decimal_places=2, default=12, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meterreading',
            name='meter_status',
            field=models.CharField(default='OK', max_length=50),
        ),
        migrations.AddField(
            model_name='meterreading',
            name='month',
            field=models.CharField(default='aw', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meterreading',
            name='payment_status',
            field=models.CharField(default='Pending', max_length=50),
        ),
        migrations.AddField(
            model_name='meterreading',
            name='receipt_number',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='meterreading',
            name='upload_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meterreading',
            name='verified_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meterreading',
            name='year',
            field=models.IntegerField(default=2000),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='customer',
            name='citizenship_issue_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='dob',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='meter_connected_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='reading_effective_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='registration_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='meterreading',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app1.customer'),
        ),
        migrations.AlterField(
            model_name='meterreading',
            name='previous_reading',
            field=models.DecimalField(decimal_places=2, default=12, max_digits=10),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='LedgerEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('description', models.CharField(max_length=255)),
                ('entry_by', models.CharField(max_length=255)),
                ('debit', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('credit', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('balance', models.DecimalField(decimal_places=2, max_digits=10)),
                ('remarks', models.CharField(blank=True, max_length=255, null=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app1.customer')),
            ],
        ),
    ]
