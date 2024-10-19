from django.db import models
import datetime
from django.utils import timezone

class BSADMapping(models.Model):
    bs_month = models.IntegerField()
    bs_year = models.IntegerField()
    ad_month_start = models.DateField()  # The AD date corresponding to the first day of the BS month

    def __str__(self):
        return f"BS {self.bs_month}/{self.bs_year}"


class FiscalCalendar(models.Model):
    year = models.IntegerField()  
    month = models.IntegerField() 
    days_array = models.JSONField()  

    def __str__(self):
        return f"Fiscal Calendar: Year {self.year}, Month {self.month}"

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    def __str__(self):
        return self.username

class Customer(models.Model):
    customer_no = models.CharField(max_length=20, null=True, blank=True)  # customerNumber
    registration_date = models.DateField(null=True, blank=True)  # registrationDate
    meter_connected_date = models.DateField(null=True, blank=True)  # meterConnectedDate
    customers_name_english = models.CharField(max_length=100, null=True, blank=True)  # customerNameEnglish
    customers_name_nepali = models.CharField(max_length=100, null=True, blank=True)  # customerNameNepali
    citizenship_no = models.CharField(max_length=20, null=True, blank=True)  # citizenshipNumber
    citizenship_issue_date = models.DateField(null=True, blank=True)  # citizenshipIssueDate
    citizenship_issue_district = models.CharField(max_length=100, null=True, blank=True)  # citizenshipIssueDistrict
    address_english = models.CharField(max_length=100, null=True, blank=True)  # addressEnglish
    address_nepali = models.CharField(max_length=100, null=True, blank=True)  # addressNepali
    marga = models.CharField(max_length=50, null=True, blank=True)  # marga
    mobile_number = models.CharField(max_length=15, null=True, blank=True)  # mobileNumber

    meter_status = models.CharField(max_length=50, null=True, blank=True)  # meterStatus
    customer_type = models.CharField(max_length=50, null=True, blank=True)  # customerType
    ampere_rating = models.CharField(max_length=50, null=True, blank=True)  # ampereRating
    meter_serial = models.CharField(max_length=50, null=True, blank=True)  # meterSerial
    meter_initial_reading = models.CharField(max_length=50, null=True, blank=True)  # meterInitialReading

    reading_effective_date = models.DateField(null=True, blank=True)  # readingEffectiveDate
    number_of_consumers = models.CharField(max_length=50, null=True, blank=True) # numberOfConsumers
    gender = models.CharField(max_length=10, null=True, blank=True)  # gender
    spouse_name = models.CharField(max_length=100, null=True, blank=True)  # spouseName
    father_name = models.CharField(max_length=100, null=True, blank=True)  # fatherName
    grand_father_name = models.CharField(max_length=100, null=True, blank=True)  # grandFatherName
    nibedan_darta_number = models.CharField(max_length=50, null=True, blank=True)  # nibedanDartaNUmber
    dob = models.DateField(null=True, blank=True)  # dob
    transformer = models.CharField(max_length=50, null=True, blank=True)  # transformer

    def __str__(self):
        return f"{self.customer_no} - {self.customers_name_english}"

class AdministrativeCharge(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='other_charges')
    description = models.CharField(max_length=255)
    charge_date = models.DateTimeField(default=timezone.now())
    charge = models.DecimalField(max_digits=10, decimal_places=2)
    received_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.description} - {self.charge}"
    
class FiscalYearRecord(models.Model):
    fiscal_year = models.CharField(max_length=20)
    receipt_count = models.PositiveIntegerField(default=0)
    application_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Fiscal Year: {self.fiscal_year} | Receipts: {self.receipt_count} | Applications: {self.application_count}"

    @staticmethod
    def get_current_fiscal_year():
        today = datetime.datetime.now()

        # Determine the current fiscal year (Nepali fiscal year: July 16 to July 15)
        if today.month > 7 or (today.month == 7 and today.day >= 16):
            fiscal_year_str = f"{today.year}/{today.year + 1 - 2000}"
        else:
            fiscal_year_str = f"{today.year - 1}/{today.year - 2000}"

        return fiscal_year_str
    
    @classmethod
    def get_or_create_current_fiscal_year(cls):
        fiscal_year = cls.get_current_fiscal_year()
        fiscal_year_record, created = cls.objects.get_or_create(fiscal_year=fiscal_year)
        return fiscal_year_record

class LedgerEntry(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)  
    date = models.DateTimeField()
    description = models.CharField(max_length=255)
    entry_by = models.CharField(max_length=255)  
    debit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    credit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    remarks = models.CharField(max_length=255, null=True, blank=True)  

    def __str__(self):
        return f"{self.date} - {self.description} ({self.balance})"

class MeterReading(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE) 
    year = models.IntegerField()
    month = models.CharField(max_length=50)
    previous_reading = models.DecimalField(max_digits=10, decimal_places=2)
    current_reading = models.DecimalField(max_digits=10, decimal_places=2)
    consumption_units = models.DecimalField(max_digits=10, decimal_places=2)
    upload_date = models.DateTimeField()  
    verified_date = models.DateTimeField()
    charges = models.DecimalField(max_digits=10, decimal_places=2) 
    meter_status = models.CharField(max_length=50, default='OK')
    receipt_number = models.CharField(max_length=255, null=True, blank=True)  
    paid = models.BooleanField(default=False)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    paid_date = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"Meter Reading {self.month}-{self.year}: {self.consumption_units} units"
