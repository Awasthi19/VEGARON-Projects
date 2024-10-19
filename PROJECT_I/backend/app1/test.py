import nepali_datetime
import datetime

def convert_bs_to_ad(bs_date_str):
    year, month, day = map(int, bs_date_str.split('-'))
    print(year, month, day)
    bs_date = nepali_datetime.date(year, month, day)
    ad_date = bs_date.to_datetime_date()
    return ad_date


def convert_ad_to_bs(ad_date_str):
    year, month, day = map(int, str(ad_date_str).split('-'))
    ad_date = datetime.date(year, month, day)
    bs_date = nepali_datetime.date.from_datetime_date(ad_date)
    return str(bs_date)
