from PyQt5 import QtWidgets, QtGui, QtCore
import pandas as pd
import utils

class MainWindow(QtWidgets.QMainWindow):
    """Main window for application functions"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.init_ui()
        self.show()

    def init_ui(self):
        """Initialize main window components and layout"""
        self.setWindowTitle("SMART")
        self.checked_rows = set()
        self.widgets_font = QtGui.QFont("Arial", 15)

        # Create main layout
        self.base_widget = QtWidgets.QWidget()
        self.input_formular = QtWidgets.QFormLayout()
        self.base_widget.setLayout(self.input_formular)

        # Set up layout sections
        self.options_row1 = self.__create_hbox_layout()
        self.options_row2 = self.__create_hbox_layout()
        self.options_row3 = self.__create_hbox_layout()
        self.options_row4 = self.__create_hbox_layout()
        self.table_layout = QtWidgets.QVBoxLayout()
        self.input_formular.addRow(self.options_row1)
        self.input_formular.addRow(self.options_row2)
        self.input_formular.addRow(self.options_row3)
        self.input_formular.addRow(self.options_row4)
        self.input_formular.addRow(self.table_layout)

        # Initialize UI components
        self.__init_inputs()
        self.__init_buttons()
        self.__init_checkboxes()
        self.__init_table()

        # Add components to layout
        self.__populate_layouts()

        # Set central widget and connect signals
        self.setCentralWidget(self.base_widget)
        self.__connect_signals()
        self.showMaximized()
        self.show()
        self.load_data()

    def __create_hbox_layout(self):
        return QtWidgets.QHBoxLayout()

    def __init_inputs(self):
        self.product_name = self.__create_input("Názov")
        self.product_number = self.__create_input("Číslo SMART")
        self.profit = self.__create_input("Marža (číslo v %)")
        self.product_material = self.__create_combobox(["Materiál - bez filtru"])
        self.product_treatment = self.__create_combobox(["Úprava - bez filtru"])
        self.product_diameter = self.__create_combobox(["Priemer - bez filtru"])
        self.product_length = self.__create_combobox(["Dĺžka - bez filtru"])
        self.product_standard = self.__create_combobox(["Norma - bez filtru"])
        self.product_class = self.__create_combobox(["Trieda - bez filtru"])
        self.loading_text = QtWidgets.QLabel("")

    def __init_buttons(self):
        self.search_button = self.__create_button("Vyhľadať", "#99ddff")
        self.reset_button = self.__create_button("Resetovať")
        self.open_file_btn = self.__create_button("Znovu načítať dáta")

    def __init_checkboxes(self):
        self.company1_btn = self.__create_checkbox("company1")
        self.company2_btn = self.__create_checkbox("company2")
        self.company3_btn = self.__create_checkbox("company3")
        self.company4_btn = self.__create_checkbox("company4")
        self.company5_btn = self.__create_checkbox("company5")
        self.company6_btn = self.__create_checkbox("company6")
        self.company7_btn = self.__create_checkbox("company7")

    def __init_table(self):
        self.table = QtWidgets.QTableWidget()

    def __create_input(self, placeholder):
        input_field = QtWidgets.QLineEdit()
        input_field.setPlaceholderText(placeholder)
        input_field.setFixedSize(300, 40)
        input_field.setFont(self.widgets_font)
        return input_field

    def __create_combobox(self, items):
        combobox = QtWidgets.QComboBox()
        combobox.setFixedSize(300, 40)
        combobox.setFont(self.widgets_font)
        combobox.addItems(items)
        return combobox

    def __create_button(self, label, color=None):
        button = QtWidgets.QPushButton(label)
        button.setFixedSize(300, 40)
        button.setFont(self.widgets_font)
        if color:
            button.setStyleSheet(f"background-color: {color}")
        return button

    def __create_checkbox(self, label):
        checkbox = QtWidgets.QCheckBox(label)
        checkbox.setFixedSize(100, 50)
        checkbox.setFont(self.widgets_font)
        return checkbox

    def __populate_layouts(self):
        self.options_row1.addWidget(self.product_name)
        self.options_row1.addWidget(self.product_number)
        self.options_row1.addWidget(self.product_material)

        self.options_row2.addWidget(self.product_treatment)
        self.options_row2.addWidget(self.product_diameter)
        self.options_row2.addWidget(self.product_length)

        self.options_row3.addWidget(self.product_standard)
        self.options_row3.addWidget(self.product_class)
        self.options_row3.addWidget(self.profit)
        self.options_row3.addWidget(self.search_button)
        self.options_row3.addWidget(self.loading_text)

        self.options_row4.addWidget(self.company1_btn)
        self.options_row4.addWidget(self.company2_btn)
        self.options_row4.addWidget(self.company3_btn)
        self.options_row4.addWidget(self.company4_btn)
        self.options_row4.addWidget(self.company5_btn)
        self.options_row4.addWidget(self.company6_btn)
        self.options_row4.addWidget(self.company7_btn)
        self.options_row4.addWidget(self.reset_button)
        self.options_row4.addWidget(self.open_file_btn)

        self.table_layout.addWidget(self.table)

    def __connect_signals(self):
        self.search_button.clicked.connect(self.search_products)
        self.reset_button.clicked.connect(self.reset_search)
        self.open_file_btn.clicked.connect(self.load_data)
        self.table.cellClicked.connect(self.cell_clicked)
        self.product_class.activated[str].connect(self.set_products_standards)
        
    def load_data(self):
        try:
            self.loading_text.setText(" Načítavam dáta ...")
            QtWidgets.qApp.processEvents()
            self.df = pd.read_excel(utils.FILE_PATH)
        except:
            self.exception_dialog("Kód chyby: 1 \nSúbor s Excelom sa nenašiel.")


        filters_options = utils.get_filter_values(self.df, self)
        self.product_material.addItems(filters_options["material"])
        self.product_class.addItems(filters_options["class"])
        self.product_diameter.addItems(filters_options["diameter"])
        self.product_length.addItems(filters_options["length"])
        self.product_standard.addItems(filters_options["standard"])
        self.product_treatment.addItems(filters_options["treatment"])
        
        self.loading_text.setText("")
        self.all_prodcut_standards = filters_options["standard"]

    def search_products(self):
        eshops = self.get_checked_eshops()
        headers, data = utils.get_data(self.df, eshops, self.get_filters(), self)

        # Set up table font styles
        self.cell_font = QtGui.QFont("Arial", 11)
        self.cell_font_bold = QtGui.QFont("Arial", 11, QtGui.QFont.Bold)

        # Configure table dimensions and headers
        self.table_rows, self.table_cols = len(data) + len(self.checked_rows), len(headers)
        self.table.setColumnCount(self.table_cols)
        self.table.setHorizontalHeaderLabels([header.capitalize() for header in headers])
        self.table.setRowCount(self.table_rows)

        # Populate table with checked rows
        new_checked_boxes_indices = set()
        for row, checked_row in enumerate(self.checked_rows):
            new_checked_boxes_indices.add(row)
            for col in range(self.table_cols):
                if col == self.table_cols - 1:
                    # Last column is a checkbox
                    self.__add_checkbox(row, col, checked=True)
                else:
                    # Copy item with appropriate font
                    item = self.table.item(checked_row, col)
                    self.__add_table_item(row, col, item.text(), bold=item.font().bold())

        self.checked_rows = new_checked_boxes_indices

        # Populate table with product data
        for row, (name, shops) in enumerate(data.items(), start=len(self.checked_rows)):
            lowest_price = utils.get_lowest_price([shops[shop]["price"] for shop in shops])
            self.__add_table_item(row, 0, name)  # Product name

            for col in range(1, len(headers)):
                if col == len(headers) - 1:
                    self.__add_checkbox(row, col)
                else:
                    shop_price = shops[eshops[col - 1]]["price"]
                    shop_stock = shops[eshops[col - 1]]["stock"]
                    text = f"{shop_price} | {shop_stock}"
                    bold = shop_price == lowest_price
                    self.__add_table_item(row, col, text, bold=bold)

    def __add_table_item(self, row, col, text, bold=False):
        item = QtWidgets.QTableWidgetItem(text)
        item.setTextAlignment(QtCore.Qt.AlignCenter)
        item.setFont(self.cell_font_bold if bold else self.cell_font)
        self.table.setItem(row, col, item)

    def __add_checkbox(self, row, col, checked=False):
        box_item = QtWidgets.QTableWidgetItem()
        box_item.setFlags(QtCore.Qt.ItemIsUserCheckable | QtCore.Qt.ItemIsEnabled)
        box_item.setCheckState(QtCore.Qt.Checked if checked else QtCore.Qt.Unchecked)
        self.table.setItem(row, col, box_item)

    def cell_clicked(self, row, column):
        if column != self.table_cols - 1:
            return
        elif row in self.checked_rows and self.table.item(row, column).checkState() == 0:
            self.checked_rows.remove(row)
        elif self.table.item(row, column).checkState() == 2:
            self.checked_rows.add(row)


    def set_products_standards(self):
        self.product_standard.clear()
        if self.product_class.currentText() != "Trieda - bez filtru":
            self.product_standard.addItem("Norma - bez filtru")
            self.product_standard.addItems(utils.products_standards(self.df, 
                                                                    self.product_class.currentText(),
                                                                    self))
        else:
            self.product_standard.addItem("Norma - bez filtru")
            self.product_standard.addItems(self.all_prodcut_standards)

    def reset_search(self):
        self.checked_rows = set()
        self.table.setRowCount(0)
        
        self.product_name.setText("")
        self.product_number.setText("")
        self.profit.setText("")
        self.product_material.setCurrentIndex(0)
        self.product_treatment.setCurrentIndex(0)
        self.product_diameter.setCurrentIndex(0)
        self.product_length.setCurrentIndex(0)
        self.product_standard.setCurrentIndex(0)
        self.product_class.setCurrentIndex(0)


    def get_checked_eshops(self):
        """Return a list of checked e-shops based on selected checkboxes."""
        eshops = {
            "company1": self.company1_btn,
            "company2": self.company2_btn,
            "company5": self.company5_btn,
            "company3": self.company3_btn,
            "company7": self.company7_btn,
            "company4": self.company4_btn,
            "company6": self.company6_btn
        }
        return [name for name, checkbox in eshops.items() if checkbox.isChecked()]

    def get_filters(self):
        """Return a dictionary of filters based on user input."""
        filter_options = {
            "diameter": (self.product_diameter, "Priemer - bez filtru"),
            "length": (self.product_length, "Dĺžka - bez filtru"),
            "standard": (self.product_standard, "Norma - bez filtru"),
            "treatment": (self.product_treatment, "Úprava - bez filtru"),
            "material": (self.product_material, "Materiál - bez filtru"),
            "class": (self.product_class, "Trieda - bez filtru"),
            "name": (self.product_name, ""),
            "number_smart": (self.product_number, ""),
            "profit": (self.profit, "")
        }

        filters = {}
        for key, (widget, default) in filter_options.items():
            value = widget.currentText() if isinstance(widget, QtWidgets.QComboBox) else widget.text()
            if value != default:
                filters[key] = [value]
        return filters

    def exception_dialog(self, message):
        dialog = QtWidgets.QMessageBox()
        dialog.setWindowTitle("Chyba")
        dialog.setText(message)
        dialog.exec_()

            
    def show_error_dialog(self, message):
        """Show error dialog with a specific message"""
        dialog = QtWidgets.QMessageBox(self)
        dialog.setWindowTitle("Error")
        dialog.setText(message)
        dialog.exec_()
