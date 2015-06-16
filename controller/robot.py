from drv8835 import motors,MAX_SPEED
import time


def move(direction):    #One of ['forward', 'reverse', 'left', 'right', 'stop']
    if direction == 'forward':
        r.forward(1)
    if direction == 'reverse':
        r.reverse(1)
    if direction == 'left':
        r.left(0.5)
    if direction == 'right':
        r.right(0.5)
    if direction == 'stop':
        r.stop()

def forward(t=0):
    motors.setSpeeds(0, 0)
    motors.motor1.setSpeed(-MAX_SPEED)
    motors.motor2.setSpeed(MAX_SPEED)
    if t > 0:
        time.sleep(t)
        motors.setSpeeds(0, 0)
def reverse(t=0):
    motors.setSpeeds(0, 0)
    motors.motor1.setSpeed(MAX_SPEED)
    motors.motor2.setSpeed(-MAX_SPEED)
    if t > 0:
        time.sleep(t)
        motors.setSpeeds(0, 0)
def left(t=0):
    motors.setSpeeds(0, 0)
    motors.motor1.setSpeed(MAX_SPEED)
    motors.motor2.setSpeed(MAX_SPEED)
    if t > 0:
        time.sleep(t)
        motors.setSpeeds(0, 0)
def right(t=0):
    motors.setSpeeds(0, 0)
    motors.motor1.setSpeed(-MAX_SPEED)
    motors.motor2.setSpeed(-MAX_SPEED)
    if t > 0:
        time.sleep(t)
        motors.setSpeeds(0, 0)
def stop():
    motors.setSpeeds(0, 0)

