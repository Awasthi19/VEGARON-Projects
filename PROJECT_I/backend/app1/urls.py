from django.urls import path
from .views import *

urlpatterns = [
    path('login/', loginView.as_view(), name='login'),
    path("register/", CustomerRegistrationView.as_view(), name="register"),
    path("bulkregister/", BulkCustomerRegistrationView.as_view(), name="bulkregister"),
    path("search/", CustomerSearchView.as_view(), name="search"),
    path("statement/", TransactionStatementView.as_view(), name="statement"),
    path("uploadmeterreading/", UploadMeterReadingView.as_view(), name="uploadmeterreading"),
    path("administrativecharge/", AdministrativeChargeView.as_view(), name="administrativecharge"),
    path("administrativechargepayment/", AdministrativeChargePaymentView.as_view(), name="administrativechargepayment"),
    path("edit/", CustomerEditView.as_view(), name="edit"),
    path("delete/", DeleteCustomerView.as_view(), name="delete"),
    path("recordpayment/", PaybulkView.as_view(), name="recordpayment"),
    path("meterreading/", MeterReadingView.as_view(), name="meterreading"),
    path("meterreadingbulk/", UploadMeterReadingBulkView.as_view(), name="meterreadinghistory"),
    path("loadpayment/", loadpaymentView.as_view(), name="loadpayment"),
    path("pay/", PayView.as_view(), name="pay"),
    path("calendar/", DaysInMonthView.as_view(), name="calendar"),
    path("billingreport/", BillingReportView.as_view(), name="billingreport"),
    path("bsadmapping/", BSADMappingView.as_view(), name="bsadmapping"),
]