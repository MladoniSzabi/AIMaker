import pyautogui
import cv2
import numpy as np
import pytesseract
import os
from . import  builtin_funcs

def printImage(image):
    imageid = os.listdir("printedimages")
    imageName = "printedimages/" + str(len(imageid)) + ".png"
    cv2.imwrite(imageName, image)
    builtin_funcs.onPrint({"type": "image", "message": imageName})
    return imageName

def takeScreenshot(region=None):
    scrshot = None
    if region != None:
        scrshot = pyautogui.screenshot(region=region)
    else:
        scrshot = pyautogui.screenshot()
    return cv2.cvtColor(np.array(scrshot),
                     cv2.COLOR_RGB2BGR)

def saveImage(filename, img):
    cv2.imwrite(filename, img)

def loadImage(filename):
    return cv2.imread(filename, cv2.IMREAD_COLOR)

def imageToText(img):
    return pytesseract.image_to_string(img)

def imageToBlackAndWhite(img):
    gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return cv2.threshold(gray_image, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

def blurImage(img, blurSize=3):
    return cv2.GaussianBlur(img,(blurSize,blurSize),cv2.BORDER_DEFAULT)

def getAveragePixel(img):
    return cv2.meanStdDev(img)[0]

def getImageWidth(img):
    return img.shape[1]

def getImageHeight(img):
    return img.shape[0]

def compareImages(img1, img2):
    if(img1.shape != img2.shape):
        return False
    
    difference = cv2.subtract(img1, img2)
    b, g, r = cv2.split(difference)
    if \
        cv2.countNonZero(b) == 0 and \
        cv2.countNonZero(g) == 0 and \
        cv2.countNonZero(r) == 0:

        return True
    return False
