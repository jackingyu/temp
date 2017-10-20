package com.fmg.conmon.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import be.quodlibet.boxable.BaseTable;
import be.quodlibet.boxable.datatable.DataTable;

public class PDFUtils {

	public static void main(String[] args) {
		

		String filename = "./pdfboxtable.pdf";

		PDDocument doc = new PDDocument();

		PDPage page = new PDPage(PDRectangle.A0);
		doc.addPage(page);

		float margin = 50;
		float yStartNewPage = page.getMediaBox().getHeight() - (2 * margin);
		float tableWidth = page.getMediaBox().getWidth() - (2 *  margin);
		float bottomMargin = 70;
		float yPosition = 750;
		PDFont font = PDType1Font.HELVETICA_BOLD;
	    PDPageContentStream contents;
		
		List<List> data = new ArrayList();
		data.add(Arrays.asList("FMG1", "FMG2", "FMG3", "FMG4", "FMG5"));
		for (int i = 1; i <= 100; i++) {
			 data.add(Arrays.asList("FMG " + i + " EVENT", "Watch List " + i + " MII", "SSS " + i + " fmg33", "Row " + i + " Col Four", "AA " + i + " CONMON"));
		}
		
		BaseTable dataTable;
		try {
			dataTable = new BaseTable(yPosition, yStartNewPage, bottomMargin, tableWidth, margin, doc, page, true, true);
			DataTable t = new DataTable(dataTable, page);
			t.addListToTable(data, DataTable.HASHEADER);
			dataTable.draw();
			doc.save("./hellopdf.pdf");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
