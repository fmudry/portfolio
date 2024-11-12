from PyQt5 import QtWidgets, QtGui
import utils

class LoginWindow(QtWidgets.QMainWindow):
    """Login window for user authentication"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.logged_in = False
        self.init_ui()
        
    def init_ui(self):
        """Initialize the login window UI components"""
        self.setWindowTitle("Login")
        self.setFixedSize(400, 250)
        
        # Main layout and widgets
        layout = QtWidgets.QVBoxLayout()
        font = QtGui.QFont("Arial", 12)
        
        # Username ComboBox
        self.username_box = QtWidgets.QComboBox()
        self.username_box.addItems(["Select user"] + list(utils.USERS.keys()))
        self.username_box.setFont(font)

        # Password LineEdit
        self.password_box = QtWidgets.QLineEdit()
        self.password_box.setPlaceholderText("Password")
        self.password_box.setEchoMode(QtWidgets.QLineEdit.Password)
        self.password_box.setFont(font)

        # Login Button
        self.login_button = QtWidgets.QPushButton("Login")
        self.login_button.setFont(font)
        self.login_button.clicked.connect(self.login_user)
        
        # Arrange widgets
        layout.addWidget(self.username_box)
        layout.addWidget(self.password_box)
        layout.addWidget(self.login_button)
        
        container = QtWidgets.QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)
        self.show()
        
    def login_user(self):
        """Authenticate user and close login window if successful"""
        username = self.username_box.currentText()
        password = self.password_box.text()
        
        if utils.USERS.get(username) == password:
            self.logged_in = True
            utils.write_user_to_log(username)
            self.close()
        else:
            self.show_error_dialog("Incorrect username or password.")
            
    def show_error_dialog(self, message):
        """Show error dialog with the provided message"""
        dialog = QtWidgets.QMessageBox(self)
        dialog.setWindowTitle("Error")
        dialog.setText(message)
        dialog.exec_()
