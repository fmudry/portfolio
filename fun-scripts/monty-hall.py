from random import randint


def play_game(switch=False) -> float:
    wins = 0
    for _ in range(REPEATS):
        pick = randint(0, 2)
        if (not switch and doors[pick] == "car") or \
                (switch and doors[pick] == "goat"):
            wins += 1
    
    return float(wins) / REPEATS * 100.0


REPEATS = 1_000_000
doors = ["car", "goat", "goat"]

print(f"Probabilty of winning the car without swtiching: {play_game(switch=False)} %")
print(f"Probabilty of winning the car with swtiching: {play_game(switch=True)} %")