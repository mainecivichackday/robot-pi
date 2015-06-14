from drv8835 import motors,MAX_SPEED
import time

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

