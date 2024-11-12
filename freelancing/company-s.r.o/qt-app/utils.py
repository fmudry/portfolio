from typing import List, Dict, Union, Tuple, Optional
import pandas as pd
from math import isnan
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()  
USERS = {
    "email1@email.com": os.getenv("EMAIL1_PASSWORD"),
    "email2@email.com": os.getenv("EMAIL2_PASSWORD"),
}


OPTION_NAMES = {
    "diameter": ["diameter \n[m/tr]", "priemer"],
    "length": ["length\n [mm]", "dĺžka", "dlzka"],
    "standard": ["leading \nstandard", "norma"],
    "treatment": ["surface treatments\n (long)", "úprava", "uprava"],
    "material": ["material", "materiál"],
    "class": ["class", "trieda"],
    "name": ["money názov"],
    "number_smart": ["číslo smart"],
}

FILE_PATH = r"C:\data.xlsx"
LOG_FILE_PATH = r"C:\log-in-log.txt"


def get_column_index(names: List[str], headers: List[str], window) -> int:
    """
    Find index of column matching one of the provided names.
    """
    for i, header in enumerate(headers):
        if header in names:
            return i
    message = f"""
                Error Code: 2
                Unable to locate column with possible names {names}.
                Rename column in Excel to one of these names and restart the application:
                {[name.capitalize() for name in names]}
              """
    window.exception_dialog(message)
    return -1


def get_lowest_price(prices: List[str]) -> Optional[str]:
    """
    Get the lowest numeric price from a list, ignoring non-numeric and placeholder values.
    """
    values = {price for price in prices if price != "-"}
    min_price = None
    for value in values:
        try:
            price = round(float(value), 5)
            if min_price is None or price < min_price:
                min_price = price
        except ValueError:
            continue
    return str(min_price) if min_price is not None else None


def products_standards(df: pd.DataFrame, product_class: str, window) -> List[str]:
    """
    Return a sorted list of unique standards for the given product class.
    """
    headers = [col.strip().lower() for col in df.columns]
    class_index = get_column_index(OPTION_NAMES["class"], headers, window)
    standard_index = get_column_index(OPTION_NAMES["standard"], headers, window)
    standards = {
        str(df.iloc[row, standard_index]) 
        for row in range(df.shape[0]) 
        if str(df.iloc[row, class_index]) == product_class
    }
    return sorted(standards)


def get_filter_values(df: pd.DataFrame, window) -> Dict[str, List[str]]:
    """
    Generate filterable values for each option in the dataframe.
    """
    headers = [col.strip().lower() for col in df.columns]
    option_indices = {
        option: get_column_index(OPTION_NAMES[option], headers, window)
        for option in set(OPTION_NAMES.keys()) - {"name", "number_smart"}
    }

    filter_values = {}
    for option, col_idx in option_indices.items():
        unique_values = {str(df.iloc[row, col_idx]) for row in range(df.shape[0])}
        filter_values[option] = sorted(unique_values)

    return filter_values


def get_data(df: pd.DataFrame, shops: List[str], filters: Dict[str, List[str]], window) -> Tuple[List[str], Dict[str, Dict[str, str]]]:
    """
    Filter dataframe according to provided shop and option filters and return headers and data.
    """
    headers = [col.strip().lower() for col in df.columns]
    shop_indices = {shop: {
        "price_index": get_column_index([f"{shop} nc"], headers, window),
        "stock_index": get_column_index([f"{shop} sklad"], headers, window)
    } for shop in shops}

    for option in filters:
        if option != "profit":
            filters[option].append(get_column_index(OPTION_NAMES[option], headers, window))

    return filter_data(df, filters, shop_indices, headers, window)


def filter_data(
    df: pd.DataFrame, 
    filters: Dict[str, List[Union[str, int]]], 
    shops: Dict[str, Dict[str, int]], 
    headers: List[str], 
    window
) -> Tuple[List[str], Dict[str, Dict[str, str]]]:
    """
    Apply filters to data and format results for each shop.
    """
    name_col_index = get_column_index(OPTION_NAMES["name"], headers, window) if "name" not in filters else filters["name"][1]
    result_headers = ["Názov"] + [shop.capitalize() for shop in shops] + ["Ponechať"]
    data = {}

    profit_multiplier = 1 + int(filters["profit"][0]) / 100 if "profit" in filters else 1

    for row in range(df.shape[0]):
        for option, filter_value in filters.items():
            col_index = filter_value[1]
            if option == "number_smart":
                if not get_smart_num(df, row, col_index).startswith(filter_value[0]):
                    break
            elif str(df.iloc[row, col_index]) != filter_value[0]:
                break
        else:
            product_name = df.iloc[row, name_col_index]
            data[product_name] = {
                shop: {
                    "price": normalize_price(df.iloc[row, cols["price_index"]], profit_multiplier),
                    "stock": normalize_stock(df.iloc[row, cols["stock_index"]])
                } for shop, cols in shops.items()
            }
    return result_headers, data


def normalize_price(value: Union[str, int], profit: float) -> str:
    if isnan(value) if isinstance(value, (int, float)) else False:
        return "-"
    try:
        return str(round(float(value) * profit, 4))
    except ValueError:
        return str(value)


def normalize_stock(value: Union[str, int]) -> str:
    if isnan(value) if isinstance(value, (int, float)) else False:
        return "-"
    try:
        return str(int(value))
    except ValueError:
        return str(value)


def get_smart_num(df: pd.DataFrame, row: int, col: int) -> str:
    try:
        return str(df.iloc[row, col])
    except IndexError:
        return "---"


def write_user_to_log(username: str) -> None:
    """
    Logs the user"s login details with a timestamp.
    """
    with open(LOG_FILE_PATH, "a") as log:
        timestamp = datetime.now().strftime("%d.%m.%Y %H:%M")
        log.write(f"{username}  -  {timestamp}\n")
