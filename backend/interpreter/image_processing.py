from json import load
import pyautogui
import cv2
import numpy as np
import pytesseract
import os
from . import  builtin_funcs

loadedImages = {}

def createNewImage(img, context):
    if context["projectName"] not in loadedImages:
        loadedImages[context["projectName"]] = []
    
    imgId = len(loadedImages[context["projectName"]])
    loadedImages[context["projectName"]].append(img)
    return {"type": "img", "id": imgId, "projectName": context["projectName"]}

def printImage(image, context=None):
    imageid = os.listdir("printedimages")
    imageName = "printedimages/" + str(len(imageid)) + ".png"
    image = loadedImages[image["projectName"]][image["id"]]
    cv2.imwrite(imageName, image)
    builtin_funcs.onPrint({"type": "image", "message": imageName})
    return imageName

def cloneImage(img, context):
    return createNewImage(loadedImages[img["projectName"]][img["id"]], context)

def takeScreenshot(region=None, context=None):
    scrshot = None
    if region != None:
        scrshot = pyautogui.screenshot(region=region)
    else:
        scrshot = pyautogui.screenshot()
    return createNewImage(cv2.cvtColor(np.array(scrshot),
                     cv2.COLOR_RGB2BGR), context)

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
        
    
    cv2.imwrite(pathToImage, loadedImages[img["projectName"]][img["id"]])

def locateCenterOnScreen(imageName, confidence=0.9, context=None):
    pathToImage = os.path.join("projects", context["projectName"], "images", imageName)
    retval = pyautogui.locateCenterOnScreen(pathToImage, confidence=confidence)
    if retval:
        return [int(retval.x), int(retval.y)]
    return None

def loadImage(filename, context):
    pathToImage = os.path.join("projects", context["projectName"], "images", filename)
    return createNewImage(cv2.imread(pathToImage, cv2.IMREAD_COLOR), context)

def imageToText(img, context=None):
    return pytesseract.image_to_string(loadedImages[img["projectName"]][img["id"]])

def imageToBlackAndWhite(img, context=None):
    gray_image = cv2.cvtColor(loadedImages[img["projectName"]][img["id"]], cv2.COLOR_BGR2GRAY)
    loadedImages[img["projectName"]][img["id"]] = cv2.threshold(gray_image, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
    return img

def blurImage(img, blurSize=3, context=None):
    loadedImages[img["projectName"]][img["id"]] = cv2.GaussianBlur(loadedImages[img["projectName"]][img["id"]],(blurSize,blurSize),cv2.BORDER_DEFAULT)
    return img

def getAveragePixel(img, context=None):
    return cv2.meanStdDev(loadedImages[img["projectName"]][img["id"]])[0]

def getImageDimensions(img, context=None):
    return [loadedImages[img["projectName"]][img["id"]].shape[1], loadedImages[img["projectName"]][img["id"]].shape[0]]

def cropImage(img, newDimensions, context=None):
    loadedImages[img["projectName"]][img["id"]] = loadedImages[img["projectName"]][img["id"]][newDimensions[1]:newDimensions[1]+newDimensions[3], newDimensions[0]:newDimensions[0]+newDimensions[2]]
    return img

def compareImages(img1, img2, context=None):
    if(loadedImages[img1["projectName"]][img1["id"]].shape != loadedImages[img2["projectName"]][img2["id"]].shape):
        return False
    
    difference = cv2.subtract(loadedImages[img1["projectName"]][img1["id"]], loadedImages[img2["projectName"]][img2["id"]])
    b, g, r = cv2.split(difference)
    if \
        cv2.countNonZero(b) == 0 and \
        cv2.countNonZero(g) == 0 and \
        cv2.countNonZero(r) == 0:

        return True
    return False
