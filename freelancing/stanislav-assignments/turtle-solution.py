import tkinter

UP = 0
LEFT = 1
DOWN = 2
RIGHT = 3

COEFICIENTS = {
    UP:    (0, -1),
    LEFT:  (-1, 0),
    DOWN:  (0, 1),
    RIGHT: (1, 0),
}

class Spirals:

    def __init__(self, can: tkinter.Canvas, x, y) -> None:
        self.can: tkinter.Canvas = can
        self.x = x
        self.y = y

    def get_input(self):
        try:
            values = [int(value) for value in input('Enter values (line length, increment, length sum, separated by a space): ').split()]
            self.line_length = values[0]
            self.increment = values[1]
            self.length_sum = values[2]
            return True
        except ValueError:
            print('Invalid arguments.')
            return False
        
    def draw_line(self):
        length = min(self.line_length, self.length_sum - self.length_count)
        x_coef, y_coef = COEFICIENTS[self.orientation]
        x2, y2 = self.x + x_coef * length, self.y + y_coef * length

        self.can.create_line(self.x, self.y, x2, y2)

        self.length_count += length
        self.line_length += self.increment
        self.x, self. y = x2, y2
        self.orientation = (self.orientation + 1) % 4

    def run(self):
        if not self.get_input():
            return
        
        self.length_count = 0
        self.orientation = UP
        while self.length_count < self.length_sum:
            self.draw_line()

        print('Finished.')

can = tkinter.Canvas(width=800, height=800)
can.pack()

s = Spirals(can, 400, 400)
s.run()

can.mainloop()
