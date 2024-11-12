from typing import Set, Tuple


class Sudoku:
    def __init__(self, file_name):
        self.tab = []
        
        with open(file_name, 'r') as input_file:
            for row in input_file:
                self.tab.append([
                    value if value == '.' else int(value) for value in row.strip().split()
                ])

    def __str__(self):
        final_string = ""

        for i, row in enumerate(self.tab):
            final_string += " ".join([str(val) if isinstance(val, int) else "." for val in row])
            
            if i != len(self.tab) - 1:
                final_string += '\n'

        return final_string

    def __get_row_col_answers(self, row: int, col: int) -> Set[int]:
        possible_answers = set([num for num in range(1, 10)])

        for i in range(len(self.tab)):
            if isinstance(self.tab[row][i], int):
                possible_answers.discard(self.tab[row][i])

            if isinstance(self.tab[i][col], int):
                possible_answers.discard(self.tab[i][col])

        return possible_answers
    
    def __get_top_left_position(self, position: int) -> int:
        return (position // 3) * 3
    
    def __get_3x3_answers(self, row: int, col: int) -> Set[int]:
        possible_answers = set([num for num in range(1, 10)])

        r = self.__get_top_left_position(row)
        c = self.__get_top_left_position(col)

        for i in range(r, r + 3):
            for j in range(c, c + 3):

                if isinstance(self.tab[i][j], int):
                    possible_answers.discard(self.tab[i][j])

        return possible_answers

    def do_step(self):
        result = 0

        for r in range(len(self.tab)):
            for c in range(len(self.tab[0])):

                if isinstance(self.tab[r][c], int):
                    continue

                possible_answers = self.__get_row_col_answers(r, c) & self.__get_3x3_answers(r, c)
                self.tab[r][c] = possible_answers

                if len(possible_answers) == 0:
                    result = None
                
                if len(possible_answers) == 1 and result is not None:
                    result += 1
    
        return result

    def replace(self) -> None:
        for r in range(len(self.tab)):
            for c in range(len(self.tab[0])):

                value = self.tab[r][c]
                if isinstance(value, int):
                    continue

                if len(value) == 1:
                    self.tab[r][c] = value.pop()
                else:
                    self.tab[r][c] = '.'

    def solve(self) -> Tuple[int, int]:
        do_step_result = None
        count = 0

        while True:
            do_step_result = self.do_step()
            self.replace()
            count += 1

            if do_step_result is None or do_step_result == 0:
                break
        
        if do_step_result is None:
            return count, None

        return count, self.empty_positions_count()

    def empty_positions_count(self) -> int:
        count = 0

        for row in self.tab:
            for value in row:
                if value == '.':
                    count += 1

        return count
