from datetime import timedelta
from django.shortcuts import get_object_or_404
from .models import BSADMapping

def bs_to_ad(bs_date_str):
    bs_year, bs_month, bs_day = map(int, bs_date_str.split('-'))
    bs_month_record = get_object_or_404(BSADMapping, bs_month=bs_month, bs_year=bs_year)
    bsmonth_1_ad = bs_month_record.ad_month_start
    ad_date = bsmonth_1_ad + timedelta(days=bs_day - 1)
    return ad_date

def get_ad_date_range_for_bs_month(bs_year,bs_month):
    """
    Returns the start and end date in AD for the given BS month and year.
    :param bs_month: Bikram Sambat month (1 to 12)
    :param bs_year: Bikram Sambat year
    :return: Tuple of two dates (start_date, end_date) in AD
    """
    try:
        # Retrieve the BSADMapping entry for the given BS month and year
        bsad_mapping = BSADMapping.objects.get(bs_month=bs_month, bs_year=bs_year)
        
        # Get the start date in AD (ad_month_start from BSADMapping)
        start_date = bsad_mapping.ad_month_start
        
        # Calculate the end date by getting the start date of the next BS month
        try:
            next_bsad_mapping = BSADMapping.objects.get(
                bs_month=bs_month % 12 + 1,  # Handle month wrap-around (12 -> 1)
                bs_year=bs_year if bs_month < 12 else bs_year + 1  # Handle year change
            )
            end_date = next_bsad_mapping.ad_month_start - timedelta(days=1)
        except BSADMapping.DoesNotExist:
            # If there is no next mapping (end of dataset), just assume the current month has 30 days
            end_date = start_date + timedelta(days=29)  # You can adjust this based on actual month lengths in BS

        return start_date, end_date

    except BSADMapping.DoesNotExist:
        return None, None  # Handle cases where the mapping doesn't exist

def ad_to_bs(ad_date):
    """
    Converts an AD date to a BS date (Bikram Sambat).
    :param ad_date: The AD (Gregorian) date to be converted.
    :return: Tuple (bs_day, bs_month, bs_year) or None if not found.
    """
    try:
        # Find the BSADMapping where the given AD date is within the month range
        bsad_mapping = BSADMapping.objects.filter(ad_month_start__lte=ad_date).order_by('-ad_month_start').first()

        if bsad_mapping:
            # Calculate the day in the BS month
            delta_days = (ad_date - bsad_mapping.ad_month_start).days
            bs_day = delta_days + 1  # since the first day corresponds to ad_month_start
            bs_month = bsad_mapping.bs_month
            bs_year = bsad_mapping.bs_year
            
            return bs_day, bs_month, bs_year
        
        return None  # If no mapping is found
    except BSADMapping.DoesNotExist:
        return None

def get_days_in_bs_month(bs_month, bs_year):
    """
    Returns the number of days in a given BS month and year.
    :param bs_month: Bikram Sambat month (1 to 12)
    :param bs_year: Bikram Sambat year
    :return: Number of days in the BS month
    """
    try:
        bsad_mapping = BSADMapping.objects.get(bs_month=bs_month, bs_year=bs_year)
        
        try:
            next_bsad_mapping = BSADMapping.objects.get(
                bs_month=bs_month % 12 + 1,  # Handle month wrap-around (12 -> 1)
                bs_year=bs_year if bs_month < 12 else bs_year + 1  # Handle year change
            )
            days_in_month = (next_bsad_mapping.ad_month_start - bsad_mapping.ad_month_start).days
        except BSADMapping.DoesNotExist:
            days_in_month = 32  # Default number of days

        return days_in_month

    except BSADMapping.DoesNotExist:
        return None  # Handle cases where the mapping doesn't exist
