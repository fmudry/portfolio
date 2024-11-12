from random import shuffle, randrange


def pick(prisoner_num: int) -> bool:
    visited = set()
    box_val = prisoner_num

    for _ in range(NUMBER_OF_PRISONERS // 2):
        if board[box_val] == prisoner_num:
            return True

        visited.add(box_val)
        box_val = board[box_val]
        
        if box_val in visited:
            while box_val not in visited:
                box_val = randrange(NUMBER_OF_PRISONERS)

    return False


def simulate() -> bool:
    for prisoner_pos in range(NUMBER_OF_PRISONERS):
        if not pick(prisoner_pos):
            return False
    return True


NUMBER_OF_PRISONERS = 50
NUMBER_OF_ROUNDS = 10_000  # cca 31.70 % success rate with 1_000_000 tries

board = [num for num in range(NUMBER_OF_PRISONERS)]
shuffle(board)

successful_rounds = 0
for _ in range(NUMBER_OF_ROUNDS):
    if simulate():
        successful_rounds += 1
    shuffle(board)
   
print(f'Total success rate is {(successful_rounds / NUMBER_OF_ROUNDS) * 100} %')
