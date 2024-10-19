from rest_framework.response import Response
from rest_framework.views import APIView
import jwt, datetime
from django.contrib.auth.hashers import make_password, check_password
from .models import *
from django.conf import settings
from django.db.models import Sum
from rest_framework import status
from django.shortcuts import get_object_or_404
import decimal
from fuzzywuzzy import process
from django.utils.dateformat import format
from .test2 import bs_to_ad, ad_to_bs, get_days_in_bs_month, get_ad_date_range_for_bs_month
import json
from datetime import datetime

class BSADMappingView(APIView):
    def post(self, request):
        # Initialize a list to hold new objects for bulk creation
        bsad_mappings = []
        
        # Iterate through the request data
        for entry in request.data:
            try:
                # Validate and prepare data for creation
                bsad_mappings.append(
                    BSADMapping(
                        bs_month=entry['bs_month'],
                        bs_year=entry['bs_year'],
                        ad_month_start=datetime.strptime(entry['ad_month_start'], '%Y-%m-%d').date()
                    )
                )
            except KeyError as e:
                return Response(
                    {"error": f"Missing field: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except ValueError as e:
                return Response(
                    {"error": f"Invalid date format: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Bulk create all BSADMapping entries in a single query
        if bsad_mappings:
            BSADMapping.objects.bulk_create(bsad_mappings)

        return Response({"message": "Data successfully created"}, status=status.HTTP_201_CREATED)

class DaysInMonthView(APIView):
    def get(self, request):
        year = request.GET.get('year')
        month = request.GET.get('month')
        days_in_bs_month = get_days_in_bs_month(year, month)
        return Response({'days_in_bs_month': days_in_bs_month})

class CustomerRegistrationView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        customer_no = request.data.get('customerNumber')
        
        # Convert BS dates to AD
        registration_date_bs = request.data.get('registrationDate')
        meter_connected_date_bs = request.data.get('meterConnectedDate')
        citizenship_issue_date_bs = request.data.get('citizenshipIssueDate')
        dob_bs = request.data.get('dob')

        if registration_date_bs:
            registration_date_ad = convert_bs_to_ad(registration_date_bs)
        else:
            registration_date_ad = None

        if meter_connected_date_bs:
            meter_connected_date_ad = convert_bs_to_ad(meter_connected_date_bs)
        else:
            meter_connected_date_ad = None

        if citizenship_issue_date_bs:
            citizenship_issue_date_ad = convert_bs_to_ad(citizenship_issue_date_bs)
        else:
            citizenship_issue_date_ad = None

        if dob_bs:
            dob_ad = convert_bs_to_ad(dob_bs)
        else:
            dob_ad = None


        # Convert the BS dates to AD using NepaliDate class

        # Other data fields
        customers_name_english = request.data.get('customerNameEnglish')
        customers_name_nepali = request.data.get('customerNameNepali')
        citizenship_no = request.data.get('citizenshipNumber')
        citizenship_issue_district = request.data.get('citizenshipIssueDistrict')
        address_english = request.data.get('addressEnglish')
        address_nepali = request.data.get('addressNepali')
        marga = request.data.get('marga')
        mobile_number = request.data.get('mobileNumber')
        meter_status = request.data.get('meterStatus')
        customer_type = request.data.get('customerType')
        ampere_rating = request.data.get('ampereRating')
        meter_serial = request.data.get('meterSerial')
        meter_initial_reading = request.data.get('meterInitialReading')
        reading_effective_date_bs = request.data.get('readingEffectiveDate')
        number_of_consumers = request.data.get('numberOfConsumers')
        gender = request.data.get('gender')
        spouse_name = request.data.get('spouseName')
        father_name = request.data.get('fatherName')
        grand_father_name = request.data.get('grandFatherName')
        nibedan_darta_number = request.data.get('nibedanDartaNumber')
        transformer = request.data.get('transformer')

        # Convert readingEffectiveDate from BS to AD
        if reading_effective_date_bs:
            reading_effective_date_ad = convert_bs_to_ad(reading_effective_date_bs)
        else:
            reading_effective_date_ad = None

        # Create a new Customer object with converted AD dates
        customer = Customer(
            customer_no=customer_no,
            registration_date=registration_date_ad,
            meter_connected_date=meter_connected_date_ad,
            customers_name_english=customers_name_english,
            customers_name_nepali=customers_name_nepali,
            citizenship_no=citizenship_no,
            citizenship_issue_date=citizenship_issue_date_ad,
            citizenship_issue_district=citizenship_issue_district,
            address_english=address_english,
            address_nepali=address_nepali,
            marga=marga,
            mobile_number=mobile_number,
            meter_status=meter_status,
            customer_type=customer_type,
            ampere_rating=ampere_rating,
            meter_serial=meter_serial,
            meter_initial_reading=meter_initial_reading,
            reading_effective_date=reading_effective_date_ad,
            number_of_consumers=number_of_consumers,
            gender=gender,
            spouse_name=spouse_name,
            father_name=father_name,
            grand_father_name=grand_father_name,
            nibedan_darta_number=nibedan_darta_number,
            dob=dob_ad,
            transformer=transformer
        )
   

        def create_customer_registration_charges(customer):
            registration_charges = request.data.get('registration_charges', [])
            print(registration_charges)

            for charge in registration_charges:
                print(charge)
                AdministrativeCharge.objects.create(
                    customer=customer,
                    description=charge['description'],
                    charge=charge['charge'],
                    received_amount=0,  # Initially no payment received
                    paid=False  # Initially unpaid
                )
            
        customer.save()
        create_customer_registration_charges(customer)
        return Response({'success': 'customer registered'})

class CustomerSearchView(APIView):
    permission_classes = []
    authentication_classes = []

    def get(self, request):
        customer_id_query = request.GET.get('customerIDQuery')
        customer_name_query = request.GET.get('customerNameQuery')

        customers = Customer.objects.all()
        results = []

        if customer_id_query:
            for customer in customers:
                if process.extractOne(customer_id_query, [str(customer.customer_no)])[1] > 80:
                    results.append(customer)
        
        if customer_name_query:
            for customer in customers:
                if process.extractOne(customer_name_query, [customer.customers_name_english])[1] > 80:
                    results.append(customer)

        # Remove duplicates by converting to a set and back to a list
        results = list(set(results))

        # Prepare the data for the response with camelCase keys
        data = [
            {
                "customerNumber": customer.customer_no,
                "registrationDate": ad_to_bs(customer.registration_date) if customer.registration_date else None,
                "meterConnectedDate": ad_to_bs(customer.meter_connected_date) if customer.meter_connected_date else None,
                "customerNameEnglish": customer.customers_name_english,
                "customerNameNepali": customer.customers_name_nepali,
                "citizenshipNumber": customer.citizenship_no,
                "citizenshipIssueDate": ad_to_bs(customer.citizenship_issue_date) if customer.citizenship_issue_date else None,
                "citizenshipIssueDistrict": customer.citizenship_issue_district,
                "addressEnglish": customer.address_english,
                "addressNepali": customer.address_nepali,
                "marga": customer.marga,
                "mobileNumber": customer.mobile_number,
                "meterStatus": customer.meter_status,
                "customerType": customer.customer_type,
                "ampereRating": customer.ampere_rating,
                "meterSerial": customer.meter_serial,
                "meterInitialReading": customer.meter_initial_reading,
                "readingEffectiveDate": ad_to_bs( customer.reading_effective_date) if  customer.reading_effective_date else None,
                "numberOfConsumers": customer.number_of_consumers,
                "gender": customer.gender,
                "spouseName": customer.spouse_name,
                "fatherName": customer.father_name,
                "grandFatherName": customer.grand_father_name,
                "nibedanDartaNumber": customer.nibedan_darta_number,
                "dob": ad_to_bs( customer.dob) if  customer.dob else None,
                "transformer": customer.transformer,
            }
            for customer in results
        ]

        return Response(data)

class AdministrativeChargePaymentView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        received_amount = request.data.get('receivedAmount')
        Customer_no = request.data.get('customerNumber')
        try:
            self.customer = Customer.objects.get(customer_no=Customer_no)
        except Customer.DoesNotExist:
            return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)

        previous_unpaid_charges = AdministrativeCharge.objects.filter(
            customer=self.customer, paid=False
        ).order_by('charge_date')

        print(f"Found {previous_unpaid_charges.count()} unpaid charges.")
        print(f"Received amount: {received_amount}")

        remaining_amount = decimal.Decimal(received_amount)

        for charge in previous_unpaid_charges:
            amount_to_pay = charge.charge - charge.received_amount
            if remaining_amount >= amount_to_pay:
                remaining_amount -= amount_to_pay
                charge.paid = True
                charge.received_amount = charge.charge  # Mark as fully paid
                charge.save()
            else:
                charge.received_amount += remaining_amount
                remaining_amount = 0
                charge.save()
                break

        return Response({'success': 'Payment recorded successfully'}, status=status.HTTP_200_OK)

class CustomerEditView(APIView):
    permission_classes = []
    authentication_classes = []

    def patch(self, request):
        customer = get_object_or_404(Customer, customer_no=request.data['customerNumber'])

        if 'customerNumber' in request.data:
            customer.customer_no = request.data['customerNumber']

        if 'registrationDate' in request.data:
            registration_date_bs = request.data['registrationDate']
            if registration_date_bs:
                customer.registration_date = convert_bs_to_ad(registration_date_bs)
            else:
                customer.registration_date = None

        if 'meterConnectedDate' in request.data:
            meter_connected_date_bs = request.data['meterConnectedDate']
            if meter_connected_date_bs:
                customer.meter_connected_date = convert_bs_to_ad(meter_connected_date_bs)
            else:
                customer.meter_connected_date = None        
        if 'customerNameEnglish' in request.data:
            customer.customers_name_english = request.data['customerNameEnglish']

        if 'customerNameNepali' in request.data:
            customer.customers_name_nepali = request.data['customerNameNepali']

        if 'citizenshipNumber' in request.data:
            customer.citizenship_no = request.data['citizenshipNumber']

        if 'citizenshipIssueDate' in request.data:
            citizenship_issue_date_bs = request.data['citizenshipIssueDate']
            if citizenship_issue_date_bs:
                customer.citizenship_issue_date = convert_bs_to_ad(citizenship_issue_date_bs)
            else:
                customer.citizenship_issue_date = None
        
        if 'citizenshipIssueDistrict' in request.data:
            customer.citizenship_issue_district = request.data['citizenshipIssueDistrict']

        if 'addressEnglish' in request.data:
            customer.address_tole = request.data['addressEnglish']

        if 'addressNepali' in request.data:
            customer.address_nepali = request.data['addressNepali']

        if 'marga' in request.data:
            customer.marga = request.data['marga']

        if 'mobileNumber' in request.data:
            customer.mobile_number = request.data['mobileNumber']

        if 'meterStatus' in request.data:
            customer.meter_status = request.data['meterStatus']

        if 'customerType' in request.data:
            customer.customer_type = request.data['customerType']

        if 'ampereRating' in request.data:
            customer.ampere_rating = request.data['ampereRating']

        if 'meterSerial' in request.data:
            customer.meter_serial = request.data['meterSerial']

        if 'meterInitialReading' in request.data:
            customer.meter_initial_reading = request.data['meterInitialReading']

        if 'readingEffectiveDate' in request.data:
            reading_effective_date_bs = request.data['readingEffectiveDate']
            if reading_effective_date_bs:
                customer.reading_effective_date = convert_bs_to_ad(reading_effective_date_bs)
            else:
                customer.reading_effective_date = None

        if 'numberOfConsumers' in request.data:
            customer.number_of_consumers = request.data['numberOfConsumers']

        if 'transformer' in request.data:
            customer.transformer = request.data['transformer']
        
        if 'gender' in request.data:
            customer.gender = request.data['gender']

        if 'spouseName' in request.data:
            customer.spouse_name = request.data['spouseName']

        if 'fatherName' in request.data:
            customer.father_name = request.data['fatherName']

        if 'grandFatherName' in request.data:
            customer.grandfather_name = request.data['grandFatherName']

        if 'nibedanDartaNUmber' in request.data:
            customer.nibedan_darta_number = request.data['nibedanDartaNUmber']

        if 'dob' in request.data:
            dob_bs = request.data['dob']
            if dob_bs:
                customer.dob = convert_bs_to_ad(dob_bs)
            else:
                customer.dob = None
        
        charges = request.data.get('editCharges')

        if charges:
            for charge in charges:
                print(charge)
                AdministrativeCharge.objects.create(
                    customer=customer,
                    description=charge['description'],
                    charge=charge['charge'],
                    received_amount=0,  # Initially no payment received
                    paid=False  # Initially unpaid
                )

        customer.save()

        return Response({'success': 'Customer details updated successfully'}, status=status.HTTP_200_OK)

class DeleteCustomerView(APIView):
    permission_classes = []  
    authentication_classes = []  

    def delete(self, request):
        customer_no = request.data.get('customerNumber')
        if not customer_no:
            return Response({'error': 'Customer number is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            customer = Customer.objects.get(customer_no=customer_no)
        except Customer.DoesNotExist:
            return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)

        customer.delete()
        return Response({'success': 'Customer deleted successfully'}, status=status.HTTP_200_OK)

class AdministrativeChargeView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        customer_no = request.data.get('customerNumber')
        description = request.data.get('description')
        charge_amount = request.data.get('charge')
        charge_date = request.data.get('chargeDate')
        received_amount = request.data.get('receivedAmount', 0)

        try:
            customer = Customer.objects.get(customer_no=customer_no)
        except Customer.DoesNotExist:
            return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)

        # Create a new AdministrativeCharge
        charge = AdministrativeCharge(
            customer=customer,
            description=description,
            charge=charge_amount,
            charge_date=charge_date,
            received_amount=received_amount,
        )
        charge.save()

        return Response({'success': 'Administrative charge added successfully'}, status=status.HTTP_201_CREATED)

class PaybulkView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        payments = request.data.get('payments')  # Assuming data is sent as a list

        if not payments:
            return Response({'error': 'No payment data provided'}, status=status.HTTP_400_BAD_REQUEST)

        for payment in payments:
            customer_no = payment.get('customerNumber')
            date = datetime.datetime.now()
            description = payment.get('description')
            entry_by = payment.get('entryBy')
            debit = payment.get('debit')
            credit = payment.get('credit')
            balance = payment.get('balance')
            remarks = payment.get('remarks')

            try:
                customer = Customer.objects.get(customer_no=customer_no)
            except Customer.DoesNotExist:
                return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)

            payment_obj = LedgerEntry(
                customer=customer,
                date=date,
                description=description,
                entry_by=entry_by,
                debit=debit,
                credit=credit,
                balance=balance,
                remarks=remarks,
            )
            payment_obj.save()

        return Response({'success': 'Payments recorded successfully'}, status=status.HTTP_201_CREATED)

class TransactionStatementView(APIView):
    def get(self, request):
        customer_no = request.GET.get('customerNumber')
        selected_year = request.GET.get('selectedYear', 'All')

        # Validate if customer exists
        try:
            customer = Customer.objects.get(customer_no=customer_no)
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=404)

        # Determine start_date and end_date based on selected fiscal year
        if selected_year == 'All':
            # No date range filtering, retrieve all payments
            payments = LedgerEntry.objects.filter(customer=customer).order_by('date')
        else:
            # Fiscal year filtering, assume fiscal year starts on a specific month, e.g., Nepali fiscal year (starts mid-July)
            fiscal_start_month = 7  # July
            fiscal_start_day = 16   # 16th day
            year = int(selected_year)

            # Calculate the start and end dates of the fiscal year
            start_date = datetime(year, fiscal_start_month, fiscal_start_day)
            end_date = datetime(year + 1, fiscal_start_month, fiscal_start_day) - timedelta(days=1)

            payments = LedgerEntry.objects.filter(
                customer=customer, 
                date__date__range=[start_date, end_date]
            ).order_by('date')

        # Prepare the payment data for the response
        payment_data = []
        for payment in payments:
            payment_data.append({
                'date': payment.date,
                'description': payment.description,
                'entryBy': payment.entry_by,
                'debit': payment.debit,
                'credit': payment.credit,
                'balance': payment.balance,
                'remarks': payment.remarks,
            })
        
        # Calculate total debit, credit, and balance for the selected period
        total_debit = payments.aggregate(Sum('debit'))['debit__sum'] or 0
        total_credit = payments.aggregate(Sum('credit'))['credit__sum'] or 0
        current_balance = payments.last().balance if payments.exists() else 0
        
        # Send the response with payment data and totals
        return Response({
            'payments': payment_data,
            'total_debit': total_debit,
            'total_credit': total_credit,
            'current_balance': current_balance,
        })

class MeterReadingView(APIView):
    def get(self, request):
        customer_no = request.GET.get('customerNumber')
        selected_year = request.GET.get('selectedYear', 'All')

        # Validate if customer exists
        try:
            customer = Customer.objects.get(customer_no=customer_no)
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=404)

        # Determine if we are filtering by year or retrieving all records
        if selected_year == 'All':
            # No date range filtering, retrieve all meter readings
            meter_readings = MeterReading.objects.filter(customer=customer).order_by('year', 'month')
        else:
            # Filter meter readings by the selected year
            year = int(selected_year)
            meter_readings = MeterReading.objects.filter(customer=customer, year=year).order_by('month')

        # Prepare the meter reading data for the response
        meter_reading_data = []
        for reading in meter_readings:
            meter_reading_data.append({
                'year': reading.year,
                'month': reading.month,
                'previous_reading': reading.previous_reading,
                'current_reading': reading.current_reading,
                'consumption_units': reading.consumption_units,
                'upload_date': reading.upload_date,
                'verified_date': reading.verified_date,
                'charges': reading.charges,
                'meter_status': reading.meter_status,
                'receipt_number': reading.receipt_number,
                'payment_status': reading.paid,
                'paid_amount': reading.paid_amount,
                'paid_date': reading.paid_date,
            })

        # Calculate total consumption and total charges for the selected period
        total_consumption = meter_readings.aggregate(Sum('consumption_units'))['consumption_units__sum'] or 0
        total_charges = meter_readings.aggregate(Sum('charges'))['charges__sum'] or 0

        # Send the response with meter reading data and totals
        return Response({
            'meter_readings': meter_reading_data,
            'total_consumption': total_consumption,
            'total_charges': total_charges,
        })

class BillingReportView(APIView):
    def get(self, request):
        # Get 'start_date' and 'end_date' from request, defaulting to 'None'
        start_date = request.GET.get('date_range[startDate]')
        end_date = request.GET.get('date_range[endDate]')

        # Initialize variables for date range
        start_date_ad = end_date_ad = None
        start_date_obj = end_date_obj = None
        
        if start_date:
            # Handle case where only year and month are given (e.g., 'YYYY-MM')
            parts = start_date.split('-')

            if len(parts) == 2:  # If only year and month are given
                start_date_ad,end_date_ad = get_ad_date_range_for_bs_month(int(parts[0]), int(parts[1]))
                end_date_obj = datetime.strptime(end_date_ad.strftime('%Y-%m-%d'), '%Y-%m-%d')
            else :
                start_date_ad = bs_to_ad(start_date)

            start_date_obj = datetime.strptime(start_date_ad.strftime('%Y-%m-%d'), '%Y-%m-%d')

        if end_date:
            end_date_ad = bs_to_ad(end_date)
            end_date_obj = datetime.strptime(end_date_ad.strftime('%Y-%m-%d'), '%Y-%m-%d')

        # Prepare the query based on the provided date or date range
        meter_readings = MeterReading.objects.all()

        if start_date_obj and not end_date_obj:
            # Filter for a single day if only 'start_date' is provided
            meter_readings = meter_readings.filter(paid_date__date=start_date_obj.date())
        elif start_date_obj and end_date_obj:
            # Filter by date range if both 'start_date' and 'end_date' are available
            meter_readings = meter_readings.filter(paid_date__date__gte=start_date_obj.date(),
                                                   paid_date__date__lte=end_date_obj.date())

        # Prepare the meter reading data for the response
        meter_reading_data = []
        for reading in meter_readings:
            meter_reading_data.append({
                'paid_date': reading.paid_date,
                'payment_status': reading.paid,
                'paid_amount': reading.paid_amount,
                'year': reading.year,
                'month': reading.month,
                'consumption_units': reading.consumption_units,
                'receipt_number': reading.receipt_number,
                'customer_name': reading.customer.customers_name_english,  # Assuming the 'Customer' model has this field
                'customer_number': reading.customer.customer_no,  # Assuming 'Customer' has this field
            })

        # Calculate total consumption and total charges for the selected period
        total_consumption = meter_readings.aggregate(Sum('consumption_units'))['consumption_units__sum'] or 0
        total_charges = meter_readings.aggregate(Sum('paid_amount'))['paid_amount__sum'] or 0

        # Send the response with meter reading data and totals
        return Response({
            'meter_readings': meter_reading_data,
            'total_consumption': total_consumption,
            'total_charges': total_charges,
        })

class PayView(APIView):
    def post(self, request):
        customer_no = request.data.get('customerNumber')
        description = 'description'
        received_amount = decimal.Decimal(request.data.get('amountReceived'))  # Handle received amount as Decimal
        entry_by = request.data.get('entryBy')

        # Fetch customer object from customerNumber
        try:
            customer = Customer.objects.get(customer_no=customer_no)
        except Customer.DoesNotExist:
            return Response({
                'error': 'Customer not found'
            }, status=status.HTTP_404_NOT_FOUND)

        # Get the last ledger entry for balance
        last_ledger_entry = LedgerEntry.objects.filter(customer__customer_no=customer_no).order_by('-date').first()
        if last_ledger_entry:
            balance = last_ledger_entry.balance - received_amount
        else:
            balance = -received_amount  # Assuming a new customer starts with a 0 balance

        # Get or create the current fiscal year record
        fiscal_year_record = FiscalYearRecord.get_or_create_current_fiscal_year()

        # Increment the receipt count for this fiscal year
        receipt_number = fiscal_year_record.receipt_count + 1
        fiscal_year_record.receipt_count = receipt_number
        fiscal_year_record.save()

        # Create new ledger entry with updated balance
        LedgerEntry.objects.create(
            customer=customer,
            date=timezone.now(),
            description=description,
            entry_by=entry_by,
            credit=received_amount,
            balance=balance,
            remarks=receipt_number
        )

        # Fetch all pending meter readings for this customer sorted by date (oldest to newest)
        pending_meter_readings = MeterReading.objects.filter(
            customer__customer_no=customer_no, 
            paid=False
        ).order_by('upload_date')

        remaining_amount = received_amount

        for meter_reading in pending_meter_readings:
            amount_to_pay = meter_reading.charges - meter_reading.paid_amount

            if remaining_amount >= amount_to_pay:
                # Mark this meter reading as fully paid
                remaining_amount -= amount_to_pay
                meter_reading.paid = True
                meter_reading.paid_amount = meter_reading.charges  # Mark as fully paid
                meter_reading.paid_date = timezone.now()
                meter_reading.save()
            else:
                # Partially pay this meter reading and stop the loop
                meter_reading.paid_amount += remaining_amount
                remaining_amount = 0
                meter_reading.paid_date = timezone.now()
                meter_reading.save()
                break

        # Return success response with remaining balance and the last status
        return Response({
            'success': 'Payment recorded successfully',
            'receipt_count': receipt_number,
            'remaining_amount': remaining_amount,
        }, status=status.HTTP_201_CREATED)



class loadpaymentView(APIView):
    def get(self, request):
        customer_no = request.GET.get('customerNumber')
        customer = Customer.objects.filter(customer_no=customer_no).first()

        if not customer:
            return Response({"error": "Customer not found."}, status=status.HTTP_404_NOT_FOUND)

        last_ledger_entry = LedgerEntry.objects.filter(customer=customer).order_by('-date').first()
        last_credit_entry = LedgerEntry.objects.filter(customer=customer, credit__isnull=False).order_by('-date').first()

        if not last_ledger_entry or not last_credit_entry:
            return Response({"error": "No ledger entries found for this customer."}, status=status.HTTP_404_NOT_FOUND)

        # If the last ledger entry and last credit entry are the same, fetch the previous credit entry
        if last_ledger_entry == last_credit_entry:
            # Get the previous credit entry (i.e., the second most recent credit entry)
            previous_credit_entry = LedgerEntry.objects.filter(
                customer=customer, 
                credit__isnull=False
            ).exclude(id=last_credit_entry.id).order_by('-date').first()

            if previous_credit_entry:
                advance_amount = 0
        else:
            advance_amount = last_credit_entry.balance

        total_amount = last_ledger_entry.balance
        to_pay = total_amount - (-advance_amount)

        return Response({
            "total_amount": total_amount,
            "advance_amount": advance_amount,
            "to_pay": to_pay,
        }, status=status.HTTP_200_OK)


    
class PaymentView(APIView):
    def post(self, request):
        # Get data from request
        customer_no = request.data.get('customerNumber')
        description = request.data.get('description') 
        entry_by = request.data.get('entryBy')
        amount = float(request.data.get('receivedAmount'))  # Make sure amount is treated as a float

        # Fetch customer object from customerNumber
        try:
            customer = Customer.objects.get(customer_no=customer_no)
        except Customer.DoesNotExist:
            return Response({
                'error': 'Customer not found'
            }, status=status.HTTP_404_NOT_FOUND)

        # Get or create the current fiscal year record
        fiscal_year_record = FiscalYearRecord.get_or_create_current_fiscal_year()

        # Increment the receipt count for this fiscal year
        receipt_number = fiscal_year_record.receipt_count + 1
        fiscal_year_record.receipt_count = receipt_number
        fiscal_year_record.save()

        # Get the last ledger entry to fetch the previous balance
        last_entry = LedgerEntry.objects.filter(customer=customer).order_by('-date').first()
        previous_balance = last_entry.balance if last_entry else 0

        # Calculate the new balance (adding the received amount as credit)
        new_balance = previous_balance - amount

        # Create new ledger entry with updated advance
        ledger_entry = LedgerEntry.objects.create(
            customer=customer,
            date=timezone.now(),
            description=description,
            entry_by=entry_by,
            credit=amount,
            balance=new_balance,
            remarks=receipt_number
        )

        # Return success response with receipt count and updated advance
        return Response({
            'success': 'Payment recorded successfully',
            'receipt_count': LedgerEntry.objects.filter(customer=customer).count(),
            'balance': new_balance
        }, status=status.HTTP_201_CREATED)

        
class UploadMeterReadingBulkView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        print(request.data)
        meter_readings = request.data.get('meterReadings')  # Assuming data is sent as a list

        if not meter_readings:
            return Response({'error': 'No meter reading data provided'}, status=status.HTTP_400_BAD_REQUEST)

        for reading in meter_readings:
            customer_no = reading.get('customerNumber')
            year = reading.get('year')
            month = reading.get('month')
            previous_reading = reading.get('previousReading')
            current_reading = reading.get('currentReading')
            consumption_units = reading.get('consumptionUnits')
            charges = reading.get('charges')
            meter_status = reading.get('meterStatus', 'OK')
            receipt_number = reading.get('receiptNumber')
            paid = reading.get('paid', False)
            paid_amount = reading.get('paidAmount', 0)  # Default to 0 if not provided
            paid_date = reading.get('paidDate', None)  # None if not paid
            upload_date = datetime.datetime.now()
            verified_date = upload_date.replace(day=25)

            # Validate customer
            try:
                customer = Customer.objects.get(customer_no=customer_no)
            except Customer.DoesNotExist:
                return Response({'error': f'Customer with number {customer_no} not found'}, status=status.HTTP_404_NOT_FOUND)

            # Validate readings
            if current_reading < previous_reading:
                return Response({'error': f'Current reading cannot be less than previous reading for customer {customer_no}'}, status=status.HTTP_400_BAD_REQUEST)

            # If the reading is paid, ensure paid_date is set
            if paid and not paid_date:
                paid_date = upload_date  # Set the paid_date to the current date if not provided

            # Create MeterReading object
            meter_reading_obj = MeterReading(
                customer=customer,
                year=year,
                month=month,
                previous_reading=previous_reading,
                current_reading=current_reading,
                consumption_units=consumption_units,
                charges=charges,
                meter_status=meter_status,
                receipt_number=receipt_number,
                paid=paid,
                paid_amount=paid_amount,
                paid_date=paid_date,
                upload_date=upload_date,
                verified_date=verified_date,
            )
            meter_reading_obj.save()

        return Response({'success': 'Meter readings uploaded successfully'}, status=status.HTTP_201_CREATED)



class UploadMeterReadingView(APIView):
    def post(self, request):
        customer_no = request.data.get('customerNumber')
        customer = Customer.objects.filter(customer_number=customer_no).first()

        if not customer:
            return Response({"error": "Customer not found."}, status=status.HTTP_404_NOT_FOUND)

        latest_meter_reading = MeterReading.objects.filter(customer=customer).order_by('-verified_date').first()
        
        if latest_meter_reading:
            previous_reading = latest_meter_reading.current_reading

        current_reading = float(request.data.get('current_reading', 0))

        units_consumed = current_reading - previous_reading
        charges = units_consumed * 10 

        reading_month = request.data.get('reading_month')
        upload_date = datetime.datetime.now()
        verified_date = datetime.datetime.now()
        meter_status = 'OK'
        receipt_number = request.data.get('receipt_number')

        meter_reading = MeterReading.objects.create(
            customer=customer,
            year=reading_month,  
            month=reading_month,
            previous_reading=previous_reading,
            current_reading=current_reading,
            consumption_units=units_consumed,
            upload_date=upload_date,
            verified_date=verified_date,
            charges=charges,
            meter_status=meter_status,
            receipt_number=receipt_number,
            payment_status='Pending'
        )
        return Response({"message": "Meter reading uploaded successfully."}, status=status.HTTP_201_CREATED)

class loginView (APIView):
    permission_classes = []
    authentication_classes = []
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = User.objects.filter(username=username).first()
        except User.DoesNotExist:
            return Response({'error': 'Invalid username'})
        cp= check_password(password, user.password)
        if cp==False:
            return Response({'error': 'Invalid password'})
        else:
            now=datetime.datetime.now(datetime.timezone.utc)
            expire=now+datetime.timedelta(days=1)
            payload = {
                'username': user.username,
                'exp': expire,
                'iat': now
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            response= Response()
            
            response.data = {
                'message'  : 'login success',
                'jwt': token
            }
            return response
"""        
class signupView (APIView):
    permission_classes = []
    authentication_classes = []
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'username already exists'})
        
        hashed_password = make_password(password)
        print (hashed_password)
        user=User(username=username,password=hashed_password)   
        user.save()
        return Response({'success': 'account created'})   
        
"""

class BulkCustomerRegistrationView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        customers_data = request.data.get('customers', [])
        
        # To keep track of successfully registered customers
        registered_customers = []
        for customer_data in customers_data:
            try:
                customer = self.create_customer(customer_data)
                registered_customers.append(customer.customer_no)
                self.create_customer_registration_charges(customer, customer_data)
            except Exception as e:
                # Handle any exception (e.g., validation error)
                return Response({'error': str(e)}, status=400)

        return Response({'success': 'All customers registered', 'customer_numbers': registered_customers})

    def create_customer(self, customer_data):
        customer_no = customer_data.get('customerNumber')
        registration_date = customer_data.get('registrationDate')
        meter_connected_date = customer_data.get('meterConnectedDate')
        customers_name_english = customer_data.get('customerNameEnglish')
        customers_name_nepali = customer_data.get('customerNameNepali')
        citizenship_no = customer_data.get('citizenshipNumber')
        citizenship_issue_date = customer_data.get('citizenshipIssueDate')
        citizenship_issue_district = customer_data.get('citizenshipIssueDistrict')
        address_english = customer_data.get('addressEnglish')
        address_nepali = customer_data.get('addressNepali')
        marga = customer_data.get('marga')
        mobile_number = customer_data.get('mobileNumber')
        meter_status = customer_data.get('meterStatus')
        customer_type = customer_data.get('customerType')
        ampere_rating = customer_data.get('ampereRating')
        meter_serial = customer_data.get('meterSerial')
        meter_initial_reading = customer_data.get('meterInitialReading')
        reading_effective_date = customer_data.get('readingEffectiveDate')
        number_of_consumers = customer_data.get('numberOfConsumers')
        gender = customer_data.get('gender')
        spouse_name = customer_data.get('spouseName')
        father_name = customer_data.get('fatherName')
        grand_father_name = customer_data.get('grandFatherName')
        nibedan_darta_number = customer_data.get('nibedanDartaNumber')
        dob = customer_data.get('dob')
        transformer = customer_data.get('transformer')

        # Create the customer object
        customer = Customer(
            customer_no=customer_no,
            registration_date=registration_date,
            meter_connected_date=meter_connected_date,
            customers_name_english=customers_name_english,
            customers_name_nepali=customers_name_nepali,
            citizenship_no=citizenship_no,
            citizenship_issue_date=citizenship_issue_date,
            citizenship_issue_district=citizenship_issue_district,
            address_english=address_english,
            address_nepali=address_nepali,
            marga=marga,
            mobile_number=mobile_number,
            meter_status=meter_status,
            customer_type=customer_type,
            ampere_rating=ampere_rating,
            meter_serial=meter_serial,
            meter_initial_reading=meter_initial_reading,
            reading_effective_date=reading_effective_date,
            number_of_consumers=number_of_consumers,
            gender=gender,
            spouse_name=spouse_name,
            father_name=father_name,
            grand_father_name=grand_father_name,
            nibedan_darta_number=nibedan_darta_number,
            dob=dob,
            transformer=transformer
        )   
        
        # Save the customer to the database
        customer.save()
        return customer

    def create_customer_registration_charges(self, customer, customer_data):
        registration_charges = customer_data.get('registration_charges', [])
        for charge in registration_charges:
            AdministrativeCharge.objects.create(
                customer=customer,
                description=charge['description'],
                charge=charge['charge'],
                received_amount=0,  # Initially no payment received
                paid=False  # Initially unpaid
            )

