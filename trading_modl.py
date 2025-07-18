import yfinance as yf
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
import warnings

# Ignore potential warnings from statsmodels or other libraries
warnings.filterwarnings("ignore")

def add_technical_indicators(data):
    """Adds technical indicators to the stock data."""
    data['SMA_10'] = data['Close'].rolling(window=10).mean()
    data['SMA_50'] = data['Close'].rolling(window=50).mean()
    # Calculate RSI
    delta = data['Close'].diff()
    gain = delta.mask(delta < 0, 0)
    loss = delta.mask(delta > 0, 0)
    avg_gain = gain.ewm(com=14-1, adjust=False).mean()
    avg_loss = loss.ewm(com=14-1, adjust=False).mean()
    rs = avg_gain / abs(avg_loss)
    data['RSI'] = 100 - (100 / (1 + rs))
    return data

# --- Data Acquisition ---
# Define the list of stock tickers (replace with Indian stock tickers)
tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']

# Define the date range for historical data
start_date = '2022-01-01'
end_date = '2023-01-01'

stock_data = {}
for ticker in tickers:
    try:
        data = yf.download(ticker, start=start_date, end=end_date)
        stock_data[ticker] = data
        print(f"Downloaded data for {ticker}")
    except Exception as e:
        print(f"Could not download data for {ticker}: {e}")

# --- Feature Engineering ---
stock_data_with_indicators = {}
for ticker, data in stock_data.items():
    stock_data_with_indicators[ticker] = add_technical_indicators(data.copy())

# --- Backtesting Setup ---
# Select a ticker for backtesting (replace with an Indian stock ticker)
ticker_for_backtesting = 'AAPL'
stock_data_for_backtesting = stock_data_with_indicators[ticker_for_backtesting].copy()

# Determine the split point (e.g., 80% for training, 20% for testing)
split_ratio = 0.8
split_index = int(len(stock_data_for_backtesting) * split_ratio)

# Split the data
train_data = stock_data_for_backtesting.iloc[:split_index]['Close']
test_data = stock_data_for_backtesting.iloc[split_index:]['Close']

# Define risk management parameters
position_size_percentage = 0.02  # Allocate 2% of portfolio value per trade
stop_loss_percentage = 0.03      # 3% stop loss
take_profit_percentage = 0.05    # 5% take profit

# Initialize portfolio tracking
cumulative_return = 1.0
portfolio_value_history = [cumulative_return]
simulated_trades = []

# --- Backtesting Loop ---
trading_period_days = 5 # Assuming a week is 5 trading days

for i in range(0, len(test_data), trading_period_days):
    current_test_window = test_data.iloc[i : i + trading_period_days]
    current_train_window = pd.concat([train_data, test_data.iloc[:i]])

    print(f"\n--- Simulating week starting at index {i} ---")
    print(f"Current training window length: {len(current_train_window)}")
    print(f"Current test window length: {len(current_test_window)}")

    # Train ARIMA model and forecast
    forecast = None
    if len(current_train_window) > 0 and len(current_test_window) > 0:
        try:
            model = ARIMA(current_train_window, order=(5, 1, 0))
            model_fit = model.fit()
            forecast = model_fit.forecast(steps=len(current_test_window))
            print(f"ARIMA forecast for the next {len(current_test_window)} days:")
            print(forecast)
        except Exception as e:
            print(f"Could not fit ARIMA model or make forecast: {e}")

    # Simulate a trade based on the forecast and risk management
    if forecast is not None and not forecast.empty and len(current_test_window) > 0:
        start_price = current_test_window.iloc[0].item()
        end_price_forecast = forecast.iloc[-1]

        trade_decision = "Hold"
        if end_price_forecast > start_price:
            trade_decision = "Buy"

            # Calculate position size
            current_portfolio_value = portfolio_value_history[-1]
            position_value = current_portfolio_value * position_size_percentage
            num_shares = position_value / start_price if start_price > 0 else 0

            # Calculate stop-loss and take-profit prices
            stop_loss_price = start_price * (1 - stop_loss_percentage)
            take_profit_price = start_price * (1 + take_profit_percentage)

            trade_outcome = "End of Period"
            profit_loss_percentage = 0
            close_price = start_price # Initialize close price

            # Iterate through the week to check for stop-loss or take-profit
            for day_index in range(len(current_test_window)):
                current_day_price = current_test_window.iloc[day_index].item()
                close_price = current_day_price # Update close price with daily price

                if current_day_price <= stop_loss_price:
                    trade_outcome = "Stop Loss"
                    profit_loss_percentage = ((stop_loss_price - start_price) / start_price) * 100
                    close_price = stop_loss_price # Set close price to stop loss price
                    break # Exit the daily loop

                if current_day_price >= take_profit_price:
                    trade_outcome = "Take Profit"
                    profit_loss_percentage = ((take_profit_price - start_price) / start_price) * 100
                    close_price = take_profit_price # Set close price to take profit price
                    break # Exit the daily loop

            # If the loop finished without hitting stop-loss or take-profit, calculate P/L at end of period
            if trade_outcome == "End of Period":
                 profit_loss_percentage = ((close_price - start_price) / start_price) * 100


            simulated_trades.append({
                "start_date": current_test_window.index[0],
                "end_date": current_test_window.index[day_index] if trade_outcome != "End of Period" and day_index < len(current_test_window) else current_test_window.index[-1],
                "decision": trade_decision,
                "start_price": start_price,
                "end_price_forecast": end_price_forecast,
                "actual_price_at_close": close_price,
                "profit_loss_percentage": profit_loss_percentage,
                "outcome": trade_outcome,
                "position_value": position_value,
                "num_shares": num_shares
            })

            # Update cumulative return and portfolio history after each trade
            trade_return_multiplier = 1.0 + (profit_loss_percentage / 100.0)
            cumulative_return *= trade_return_multiplier
            portfolio_value_history.append(cumulative_return)


            print(f"Simulated Buy: Start Price = {start_price:.2f}, Forecast End Price = {end_price_forecast:.2f}, Outcome: {trade_outcome}, P/L % = {profit_loss_percentage:.2f}%")

        else:
            trade_decision = "Hold/Sell"
            print(f"Simulated Hold/Sell: Forecast indicates no significant increase or a decrease.")
            # Append current portfolio value even if no trade to track performance over time
            portfolio_value_history.append(cumulative_return)


# --- Evaluation of Backtesting Results ---
print("\n--- Backtesting Performance and Risk Metrics ---")

# Calculate performance metrics
total_profit_loss_percentage = (cumulative_return - 1.0) * 100
print(f"Total Return: {total_profit_loss_percentage:.2f}%")

if len(portfolio_value_history) > 1:
    portfolio_returns = pd.Series(portfolio_value_history).pct_change().dropna()
    if portfolio_returns.std() != 0:
        sharpe_ratio = portfolio_returns.mean() / portfolio_returns.std()
    else:
        sharpe_ratio = 0.0
else:
    sharpe_ratio = 0.0
print(f"Sharpe Ratio (assuming risk-free rate = 0): {sharpe_ratio:.4f}")


peak_value = pd.Series(portfolio_value_history).cummax()
drawdown = (pd.Series(portfolio_value_history) - peak_value) / peak_value
max_drawdown = drawdown.min() if not drawdown.empty else 0.0
print(f"Maximum Drawdown: {max_drawdown:.2f}%")

num_trades = len(simulated_trades)
print(f"Number of Trades: {num_trades}")

winning_trades = [trade for trade in simulated_trades if trade["profit_loss_percentage"] > 0]
winning_percentage = (len(winning_trades) / num_trades) * 100 if num_trades > 0 else 0.0
print(f"Winning Percentage: {winning_percentage:.2f}%")

average_profit_loss = np.mean([trade["profit_loss_percentage"] for trade in simulated_trades]) if num_trades > 0 else 0.0
print(f"Average Profit/Loss per Trade: {average_profit_loss:.2f}%")

# Calculate Value at Risk (VaR) and Conditional Value at Risk (CVaR)
alpha = 0.05
var = 0.0
cvar = 0.0
if not portfolio_returns.empty:
    var = np.percentile(portfolio_returns, alpha * 100)
    cvar = portfolio_returns[portfolio_returns <= var].mean()

print(f"Value at Risk (VaR) at {((1 - alpha) * 100):.0f}% Confidence: {var:.4f}")
print(f"Conditional Value at Risk (CVaR) at {((1 - alpha) * 100):.0f}% Confidence: {cvar:.4f}")

print("\n--- Interpretation ---")
print(f"The total return of {total_profit_loss_percentage:.2f}% indicates the overall gain or loss of the strategy during the backtesting period.")
print(f"The Sharpe Ratio of {sharpe_ratio:.4f} measures the risk-adjusted return. A higher Sharpe Ratio generally indicates a better return for the amount of risk taken.")
print(f"The Maximum Drawdown of {max_drawdown:.2f}% represents the largest percentage drop from a peak in the portfolio value, indicating the potential downside risk of the strategy.")
print(f"The strategy executed {num_trades} trades, with a winning percentage of {winning_percentage:.2f}%, meaning {len(winning_trades)} trades were profitable.")
print(f"On average, each trade resulted in a {average_profit_loss:.2f}% profit or loss.")
print(f"The Value at Risk (VaR) of {var:.4f} means that there is a {alpha * 100:.0f}% chance that the portfolio will lose at least {abs(var):.4f} over the next period, based on historical performance.")
print(f"The Conditional Value at Risk (CVaR) of {cvar:.4f} means that if the portfolio's return is in the worst {alpha * 100:.0f}% of outcomes, the average loss will be {abs(cvar):.4f}.")

# Display the portfolio value history (optional)
print("\nPortfolio Value History:")
print(portfolio_value_history)
