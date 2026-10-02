import joblib
import pandas as pd

from sklearn.metrics import mean_absolute_error
from xgboost import XGBRegressor

from src.config import DATA_DIR, MODELS_DIR


if __name__ == "__main__":
    df = pd.read_csv(
        DATA_DIR
        / "processed"
        / "multi_horizon"
        / "training_dataset.csv"
    )

    df["forecast_origin"] = pd.to_datetime(
        df["forecast_origin"],
        utc=True,
    )
    df["target_timestamp"] = pd.to_datetime(
        df["target_timestamp"],
        utc=True,
    )

    df = df.sort_values(
        ["forecast_origin", "forecast_hour"]
    )

    forecast_origins = df["forecast_origin"].unique()

    split_index = int(len(forecast_origins) * 0.8)
    split_origin = forecast_origins[split_index]

    # At the first test origin, later target prices are not known yet.
    train_df = df[
        (df["forecast_origin"] < split_origin)
        & (df["target_timestamp"] < split_origin)
    ]
    test_df = df[
        df["forecast_origin"] >= split_origin
    ]

    non_feature_columns = [
        "price_eur_mwh",
        "forecast_origin",
        "target_timestamp",
    ]

    X_train = train_df.drop(
        columns=non_feature_columns
    )
    y_train = train_df["price_eur_mwh"]

    X_test = test_df.drop(
        columns=non_feature_columns
    )
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

    print(
        "Training origins:",
        train_df["forecast_origin"].nunique(),
    )
    print(
        "Test origins:",
        test_df["forecast_origin"].nunique(),
    )
    print("Training rows:", len(train_df))
    print("Test rows:", len(test_df))
    print("Features:", X_train.shape[1])
    print(f"Overall MAE: {mae:.2f} €/MWh")

    for day in range(1, 8):
        mask = test_df["forecast_day"] == day

        day_mae = mean_absolute_error(
            y_test[mask],
            predictions[mask],
        )

        print(
            f"Day {day} MAE: "
            f"{day_mae:.2f} €/MWh"
        )

    # Retrain on all available data for the production model
    X = df.drop(columns=non_feature_columns)
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
        / "multi_horizon"
        / "xgb_model.pkl",
    )

    joblib.dump(
        X.columns.tolist(),
        MODELS_DIR
        / "multi_horizon"
        / "feature_columns.pkl",
    )
