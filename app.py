import os
import pickle
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import cv2
import threading
from PIL import Image
from skimage import color
#from skimage import io
import seaborn as sns
from base64 import b64decode
#from pycaret.regression import *
from flask import Flask, session, url_for, request, render_template, redirect, jsonify, send_file
#from flask_ngrok import run_with_ngrok
from PIL import Image, ImageOps
from tensorflow import keras

#create and configure the app
app = Flask(__name__,template_folder='templates',static_folder='static')
model = keras.models.load_model("assets/mnistmodel.h5")


@app.route('/')
@app.route('/<name>')
def hello(name=None):
    return render_template('index.html', name=name,w=260,h=260,lw=15,ret=None)

@app.route('/predict', methods=['POST'])
def predict():
    imageArray = [] 
    if request.method == 'POST':
        canvasData = request.form['canvasimg']
        binaryImg = b64decode(canvasData.split(',')[1])
        filename="digito.png"
        #escribiendo los datos de la imagen al VM
        with open(filename, 'wb') as f:
            f.write(binaryImg)
            f.close()
        image_file = Image.open(filename) # opens image
        resized_im = image_file.resize((28, 28))
        
        # Create a blank background image
        bg = Image.new('RGB', resized_im.size, (255, 255, 255))
        # Paste image to background image
        bg.paste(resized_im, (0, 0), resized_im)
        g = bg.convert('L')

        gg = ImageOps.invert(g)
        gg = ImageOps.grayscale(gg)
        gg = ImageOps.equalize(gg, mask=None)
        
        resImg = np.array(gg)
        print(resImg.shape)
        
        plt.imshow(gg,cmap='gray')
        plt.show()
        imageArray = np.array(gg)
        print(imageArray.shape)
        
        prediccion = model.predict(imageArray[None,:,:,None])

        df = pd.DataFrame({ "Digito":list(range(0,10)), "Probabilidad":prediccion.ravel() })
        df["Digito"] = df["Digito"].astype(str)

        df = df.sort_values(by="Probabilidad", ascending=False)
        sns.barplot(x="Probabilidad", y="Digito", data=df)
        plt.title("EL digito es un " + df.iloc[0,0]+ " con " + str(round(float(df.iloc[0,1])*100,1)) + "% de Probabilidad") 
        plt.show()
        
        #predList = prediccion.ravel().tolist()
        predList = df.iloc[:,1]
        

    return render_template('index.html',name=None,w=260,h=260,lw=15,ret=predList)

if __name__ == "__main__":
    #app.run(threaded=True)
    threading.Thread(target=app.run, kwargs={'host':'0.0.0.0','port':5000}).start()

