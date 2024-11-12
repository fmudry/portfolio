from PyQt5 import QtWidgets

class CheckBoxStyle(QtWidgets.QProxyStyle):
    """Custom style for centered checkboxes"""
    def subElementRect(self, element, option, widget=None):
        rect = super().subElementRect(element, option, widget)
        if element == QtWidgets.QStyle.SE_ItemViewItemCheckIndicator:
            rect.moveCenter(option.rect.center())
        return rect
