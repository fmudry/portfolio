from typing import List, Tuple


WALL = -1
END_OF_COMMANDS = -1
EDGE = 0

DIRECTIONS = {
    'p': (0, 1),
    'd': (1, 0),
    'l': (0, -1),
    'h': (-1, 0),
}

class Robot:
    def __init__(self, file_name):
        with open(file_name, 'r') as input_file:
            self._robot = None

            lines = [line.strip() for line in input_file.readlines()]
            self.rows, self.cols = [int(num) for num in lines[-1].split()]
            self.board = [[0] * self.cols for _ in range(self.rows)]

            for i in range(len(lines) - 1):
                self.place([int(num) for num in lines[i].split()])

    def __str__(self):
        output = []

        for r in range(self.rows):
            line = []
            for c in range(self.cols):
                pos = self.board[r][c]
                
                if (r, c) == self._robot:
                    line.append(' R')
                elif pos == EDGE:
                    line.append(' .')
                elif pos == WALL:
                    line.append(' #')
                else:
                    num = pos % 100
                    line.append(f' {num}' if num < 10 else f'{num}')
            
            output.append("".join(line))

        return "\n".join(output)

    def get_robot(self):
        return self._robot

    def set_robot(self, position: Tuple[int, int]) -> None:
        if position is None:
            self._robot = None
            return

        r, c = position
        
        self.board[r][c] += 1
        self._robot = position

    robot = property(get_robot, set_robot)

    def place(self, position: Tuple[int, int]) -> None:
        if len(position) == 2:
            r, c = position
            self.board[r][c] = WALL

        elif len(position) == 4:
            r1, r2, c1, c2 = position

            for r in range(r1, r2 + 1):
                for c in range(c1, c2 + 1):
                    self.board[r][c] = WALL

    def __are_correct_coords(self, position: Tuple[int, int]) -> bool:
        r, c = position

        if not (0 <= r < self.rows) or \
                not (0 <= c < self.cols) or \
                self.board[r][c] == WALL:
            return False
        
        return True
    
    def __get_command(self, commands: List[str], i: int) -> Tuple[int, int, int]:
        length = ''
        while i < len(commands):
            val = commands[i]

            if val.isdigit():
                length += val
            elif val in DIRECTIONS:
                length = int(length) if length else 0
                return i + 1, length, val

            i += 1

        return END_OF_COMMANDS, 0, 0

    def move(self, commands: List[str]) -> int:
        i = 0
        jump_count = 0

        while i < len(commands):
            i, length, direction = self.__get_command(commands, i)

            if i == END_OF_COMMANDS:
                break
            
            row_offset, col_offset = DIRECTIONS[direction]
            r, c = self._robot

            new_r = r + length * row_offset + row_offset
            new_c = c + length * col_offset + col_offset

            if not self.__are_correct_coords((new_r, new_c)):
                continue

            self.robot = new_r, new_c
            jump_count += 1

        return jump_count
