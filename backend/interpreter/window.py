import sys

def windows(windowName):
    from win32gui import FindWindow, GetWindowRect
    window_handle = FindWindow(None, windowName)
    window_rect = GetWindowRect(window_handle)
    x = window_rect[0]
    y = window_rect[1]
    w = window_rect[2] - x
    h = window_rect[3] - y
    return (x, y, w, h)

def linux(windowName):
    from gi.repository import Gtk, Wnck

    Gtk.init([])  # necessary only if not using a Gtk.main() loop
    screen = Wnck.Screen.get_default()
    screen.force_update()  # recommended per Wnck documentation

    # loop all windows
    targetWindow = None
    for window in screen.get_windows():
        if window.get_name() == windowName:
            targetWindow = window

    dimensions = targetWindow.get_geometry()

    # clean up Wnck (saves resources, check documentation)
    window = None
    targetWindow
    screen = None
    Wnck.shutdown()
    return dimensions

def getWindow(windowName):
    if sys.platform == 'windows' or sys.platform == "win32":
        return windows(windowName)
    elif sys.platform == 'linux':
        return linux(windowName)
    else:
        print(sys.platform)
        raise "getWindow() not implemented for your platform"