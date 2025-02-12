import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None


def load_saved_artifacts():
    print("loading saved artifacts....start")
    global __data_columns
    global __locations
    global __model

    try:
        with open("./artifacts/columns.json", "r") as f:
            data = json.load(f)
            __data_columns = data.get("data_columns", [])  # Safer way to extract columns
            __locations = __data_columns[3:] if len(__data_columns) > 3 else []
            print("DEBUG: Loaded locations:", __locations)  # Print debug info

        with open("./artifacts/bangaluru_house_prices_model.pickle", "rb") as f:
            __model = pickle.load(f)

        print("loading saved artifacts...done")
    except Exception as e:
        print("ERROR: Failed to load artifacts:", str(e))


def get_estimated_price(location, sqft, bath, bhk):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1
    return round(__model.predict([x])[0],2)


def get_location_names():
    return __locations


if __name__ == "__main__":
    load_saved_artifacts()