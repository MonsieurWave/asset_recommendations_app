import pandas as pd

def csv_to_json(csv_file, json_file):
    df = pd.read_csv(csv_file, sep='\t')
    df.to_json(json_file)

csv_to_json('/Users/julian/hackzurich/banking_web_app/public/user_data/user_portfolio_1.txt', '/Users/julian/hackzurich/banking_web_app/public/user_data/user_portfolio_1.json')