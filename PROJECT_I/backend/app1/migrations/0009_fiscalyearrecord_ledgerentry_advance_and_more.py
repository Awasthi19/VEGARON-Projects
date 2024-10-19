# Generated by Django 5.1 on 2024-10-12 02:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0008_remove_meterreading_cost_remove_meterreading_fine_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='FiscalYearRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fiscal_year', models.CharField(max_length=20)),
                ('receipt_count', models.PositiveIntegerField(default=0)),
                ('application_count', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.AddField(
            model_name='ledgerentry',
            name='advance',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='administrativecharge',
            name='charge_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 10, 12, 2, 19, 49, 329967, tzinfo=datetime.timezone.utc)),
        ),
    ]