
import os
import pickle
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import cv2
import threading
from base64 import b64decode
#from pycaret.regression import *
from flask import Flask, url_for, request, render_template, redirect, jsonify, send_file
from markupsafe import escape, Markup
#from flask_ngrok import run_with_ngrok
from PIL import Image
from pyngrok import ngrok


#cargando el modelo
#model = load_model('deploy_chris')
#cols = ['age','sex','bmi','children','smoker','region']

#create and configure the app
app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flask.sqlite'),
        )
#Probar que la instancia del folder existe
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

@app.route('/')
def welcome():
    return 'Welcome to my app'

@app.route('/mnistTest/')
@app.route('/mnistTest/<name>')
def hello(name=None):
    return render_template('pycaretChris.html', name=name,pred=None,w=20,h=20,lw=1)

@app.route('/predict', methods=['GET','POST'])
def predict():
    if request.method == 'POST':
        canvasData = request.form['canvasimg']
        binaryImg = b64decode(canvasData.split(',')[1])
        filename="digito.png"
        #escribiendo los datos de la imagen al VM
        with open(filename, 'wb') as f:
            f.write(binaryImg)
            f.close()
        img = cv2.imread(filename,cv2.IMREAD_UNCHANGED)
        plt.imshow(img)
        plt.show()
    return render_template('pycaretChris.html',name=None,pred=None,w=20,h=20,lw=1)


if __name__ == '__main_':
    threading.Thread(target=app.run, kwargs={'host':'0.0.0.0','port':'5000'}).start()
