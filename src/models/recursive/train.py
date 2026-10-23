import joblib
import pandas as pd

from sklearn.metrics import mean_absolute_error
from xgboost import XGBRegressor

from src.config import DATA_DIR, MODELS_DIR


if __name__ == "__main__":
    df = pd.read_csv(
        DATA_DIR
        / "processed"
        / "recursive"
        / "training_dataset.csv"
    )

    df["timestamp"] = pd.to_datetime(
        df["timestamp"],
        utc=True,
    )
    df = df.set_index("timestamp").sort_index()

    # Chronological split because future observations must not leak into training
    split_index = int(len(df) * 0.8)

    train_df = df.iloc[:split_index]
    test_df = df.iloc[split_index:]

    X_train = train_df.drop(columns="price_eur_mwh")
    y_train = train_df["price_eur_mwh"]

    X_test = test_df.drop(columns="price_eur_mwh")
    y_test = test_df["price_eur_mwh"]

    model = XGBRegressor(
        n_estimators=100,
        learning_rate=0.05,
        max_depth=6,
        random_state=42,
    )

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    mae = mean_absolute_error(
        y_test,
        predictions,
    )

    print("Training rows:", len(train_df))
    print("Test rows:", len(test_df))
    print("Features:", X_train.shape[1])
    print(f"MAE: {mae:.2f} €/MWh")

    # Retrain on all available data for the production model
    X = df.drop(columns="price_eur_mwh")
    y = df["price_eur_mwh"]

    final_model = XGBRegressor(
        n_estimators=100,
        learning_rate=0.05,
        max_depth=6,
        random_state=42,
    )

    final_model.fit(X, y)

    joblib.dump(
        final_model,
        MODELS_DIR
        / "recursive"
        / "xgb_model.pkl",
    )

    joblib.dump(
        X.columns.tolist(),
        MODELS_DIR
        / "recursive"
        / "feature_columns.pkl",
    )