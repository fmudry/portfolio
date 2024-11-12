import os
from typing import List
import fitz  # pip install pymupdf


def get_pdf_files(directory: str) -> List[str]:
    pdf_files = []

    for filename in os.listdir(directory):
        if filename.endswith(".pdf"):
            pdf_files.append(filename)

    return sorted(pdf_files)

def merge_pdfs(pdf_files: List[str], output_filename: str) -> None:
    pdf_merger = fitz.open()

    for pdf_file in pdf_files:
        file_path = os.path.join(SOURCE_DIR, pdf_file)
        pdf_document = fitz.open(file_path)
        pdf_merger.insert_pdf(pdf_document)

    pdf_merger.save(output_filename)
    pdf_merger.close()


if __name__ == "__main__":
    
    SOURCE_DIR = r".\slides"
    OUTPUT_FILENAME = SOURCE_DIR + r"\joinedAll.pdf"

    pdf_files = get_pdf_files(SOURCE_DIR)

    if not pdf_files:
        print("No PDF files found in the directory.")
    else:
        merge_pdfs(pdf_files, OUTPUT_FILENAME)
        print(f"PDFs merged and saved as '{OUTPUT_FILENAME}'.")
