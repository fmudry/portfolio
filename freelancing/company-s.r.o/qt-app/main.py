import sys
from PyQt5 import QtWidgets
from login_window import LoginWindow
from main_window import MainWindow
from style import CheckBoxStyle


class App(QtWidgets.QApplication):
    """
    Main class to control the application flow
    """
    def __init__(self):
        super(App, self).__init__(sys.argv)
        
        check_box_style = CheckBoxStyle(self.style())
        self.setStyle(check_box_style)
        self.show_login()

    def show_login(self):
        """Display the login window"""
        self.login_window = LoginWindow()
        exit_code = self.exec_()
        
        if exit_code == 0 and self.login_window.logged_in:
            self.show_main_window()
        else:
            sys.exit(exit_code)

    def show_main_window(self):
        """Display the main window"""
        self.main_window = MainWindow()
        sys.exit(self.exec_())


if __name__ == "__main__":
    app = App()
