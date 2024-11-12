from typing import Dict
from time import perf_counter


# Finds lengths of the paths from 1 to N to reach number 1

# RUNTIME:
# 10 ** 3 = 0.003 sec
# 10 ** 4 = 0.015 sec
# 10 ** 5 = 0.133 sec
# 10 ** 6 = 1.582 sec
# 10 ** 7 = 17.048 sec
# 10 ** 8 = 207.844 sec

N = 10 ** 4
start = perf_counter()
discovered: Dict[int, int] = {}

for n in range(1, N + 1):
    
    curr_num, steps = n, 0
    while curr_num != 1:
        if curr_num in discovered:
            steps += discovered[curr_num]
            break

        steps += 1 if curr_num % 2 == 0 else 2
        curr_num = curr_num // 2 if curr_num % 2 == 0 else (curr_num * 3 + 1) // 2
    
    discovered[n] = steps

max_num, max_steps = 1, 0
for n in range(1, N + 1):
    if discovered[n] > max_steps:
        max_steps = discovered[n]
        max_num = n

print("Max steps")
print(f'Max steps: {max_steps} for number {max_num}.')
print(f'Finished in {perf_counter() - start} seconds.')
