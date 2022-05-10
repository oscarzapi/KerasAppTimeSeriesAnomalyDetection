from django.shortcuts import render
from django.http import JsonResponse
import json
import pandas as pd
import numpy as np
from django.core.files.storage import FileSystemStorage
import joblib
import tensorflow as tf
import os

# Create your views here.
model = tf.keras.models.load_model('/home/ubuntu/Downloads/app6/model/AnomaliesDetectorModel')

model.summary()

TIME_STEPS = 288

def create_sequences(values, time_steps=TIME_STEPS):
    output =  []
    for i in range(len(values) - time_steps +1):
        output.append(values[i:(i+time_steps)])
    return np.stack(output)


def batchProcessing(request):
    # Get uploaded file
    fileObj = request.FILES['filePath']
    fs = FileSystemStorage()
    filePathName = fs.save(fileObj.name, fileObj)
    filePathName= fs.url(filePathName)
    filePath='.'+filePathName
    dataFile = pd.read_csv(filePath, parse_dates=True, index_col="timestamp")

    # Normalize and save the mean and std we get,
    # for normalizing test data.
    training_mean = dataFile.mean()
    training_std = dataFile.std()
    df_training_value = (dataFile - training_mean) / training_std

    x_test = create_sequences(df_training_value.values)

    # Get test MAE loss.
    x_test_pred = model.predict(x_test)
    test_mae_loss = np.mean(np.abs(x_test_pred - x_test), axis=1)
    test_mae_loss = test_mae_loss.reshape((-1))
    
    threshold = np.max(test_mae_loss)
    anomalies = test_mae_loss > threshold*0.7

    anomalous_data_indices = []
    for data_idx in range(TIME_STEPS - 1, len(df_training_value) - TIME_STEPS + 1):
        if np.all(anomalies[data_idx - TIME_STEPS + 1 : data_idx]):
            anomalous_data_indices.append(data_idx)

    df_subset = dataFile.iloc[anomalous_data_indices]

    print(df_subset)
    df_subset = df_subset.to_json()
    dataFile = dataFile.to_json()
    return JsonResponse({'result': df_subset, 'file': dataFile})