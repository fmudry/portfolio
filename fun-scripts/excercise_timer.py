import playsound
from time import sleep

BEEP_SOUND = r'.\beep_sound.mp3'
HOORAY_SOUND = r'.\hooray_sound.mp3'

START_DELAY = 10
NUMBER_OF_EXCERCISES = 5
NUMBER_OF_REPETITIONS = 2
WORKOUT_TIME = 20
REST_TIME = 20

sleep(START_DELAY)

rounds_left = NUMBER_OF_EXCERCISES * NUMBER_OF_REPETITIONS
while rounds_left:
    playsound.playsound(BEEP_SOUND)
    sleep(WORKOUT_TIME)

    if rounds_left != 1:
        playsound.playsound(BEEP_SOUND)
        sleep(REST_TIME)

    rounds_left -= 1

playsound.playsound(HOORAY_SOUND)
