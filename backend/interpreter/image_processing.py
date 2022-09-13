import pyautogui
import cv2
import numpy as np
import pytesseract
import os
from . import  builtin_funcs

def printImage(image, context=None):
    imageid = os.listdir("printedimages")
    imageName = "printedimages/" + str(len(imageid)) + ".png"
    cv2.imwrite(imageName, image)
    builtin_funcs.onPrint({"type": "image", "message": imageName})
    return imageName

def takeScreenshot(region=None, context=None):
    scrshot = None
    if region != None:
        scrshot = pyautogui.screenshot(region=region)
    else:
        scrshot = pyautogui.screenshot()
    return cv2.cvtColor(np.array(scrshot),
                     cv2.COLOR_RGB2BGR)

def saveImage(filename, img, context):
    pathToImageFolder=None
    if context["projectName"]:
        pathToImageFolder = os.path.join("projects", context["projectName"], "images")
    else:
        pathToImageFolder = "images/"
    pathToImage = os.path.join(pathToImageFolder, filename)
    relpath = os.path.relpath(pathToImage, pathToImageFolder)
    if relpath[:3] == "../":
        if os.path.split(filename)[1] == "" or os.path.split(filename)[1] == "..":
            pathToImage = os.path.join(pathToImageFolder, "image.png")
        else:
            pathToImage = os.path.join(pathToImageFolder, os.path.split(filename)[1])
        
    
    cv2.imwrite(pathToImage, img)

def locateCenterOnScreen(imageName, confidence=0.9, context=None):
    pathToImage = os.path.join("projects", context["projectName"], "images", imageName)
    retval = pyautogui.locateCenterOnScreen(pathToImage, confidence=confidence)
    if retval:
        return [int(retval.x), int(retval.y)]
    return None

def loadImage(filename, context):
    pathToImage = os.path.join("projects", context["projectName"], "images", filename)
    return cv2.imread(pathToImage, cv2.IMREAD_COLOR)

def imageToText(img, context=None):
    return pytesseract.image_to_string(img)

def imageToBlackAndWhite(img, context=None):
    gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return cv2.threshold(gray_image, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

def blurImage(img, blurSize=3, context=None):
    return cv2.GaussianBlur(img,(blurSize,blurSize),cv2.BORDER_DEFAULT)

def getAveragePixel(img, context=None):
    return cv2.meanStdDev(img)[0]

def getImageDimensions(img, context=None):
    return [img.shape[1], img.shape[0]]

def compareImages(img1, img2, context=None):
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
