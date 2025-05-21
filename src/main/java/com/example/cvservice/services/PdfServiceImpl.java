// PdfServiceImpl.java – Design professionnel inspiré de templates modernes
package com.example.cvservice.services;

import com.example.cvservice.dao.entities.Cv;
import com.example.cvservice.dao.entities.Experience;
import com.example.cvservice.dao.entities.Education;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class PdfServiceImpl implements PdfService {

    @Override
    public String generateCvPdf(Cv cv) {
        String dir = "pdfs";
        String fileName = "cv_" + cv.getFullName().toLowerCase()  + ".pdf";
        String filePath = dir + "/" + fileName;

        try {
            File folder = new File(dir);
            if (!folder.exists()) folder.mkdirs();

            PDDocument document = new PDDocument();
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            PDPageContentStream cs = new PDPageContentStream(document, page);
            float margin = 50;
            float y = 770;

            // En-tête moderne coloré
            cs.setNonStrokingColor(44, 62, 80); // gris foncé
            cs.addRect(0, y - 20, PDRectangle.A4.getWidth(), 40);
            cs.fill();

            y -= 10;
            cs.beginText();
            cs.setNonStrokingColor(255, 255, 255);
            cs.setFont(PDType1Font.HELVETICA_BOLD, 18);
            cs.newLineAtOffset(margin, y);
            cs.showText(cv.getFullName() );
            cs.endText();
            y -= 50;

            cs.setNonStrokingColor(0, 0, 0);
            cs.setFont(PDType1Font.HELVETICA, 12);

            y = writeLine(cs, "Email: " + cv.getEmail(), y, margin);
            y = writeLine(cs, "Téléphone: " + cv.getTel(), y, margin);
            y = writeLine(cs, "Genre: " + cv.getGender(), y, margin);
            y = writeLine(cs, "Profession: " + cv.getProfession(), y, margin);
            y = writeLine(cs, "Profil: " + safe(cv.getSummary()), y, margin);

            y = writeSectionTitle(cs, "Compétences", y, margin);
            for (String comp : cv.getSkills()) {
                y = writeBullet(cs, comp, y, margin);
            }

//            y = writeSectionTitle(cs, "Centres d'intérêt", y, margin);
//            for (String interest : cv.getCentreInterets()) {
//                y = writeBullet(cs, interest, y, margin);
//            }

            y = writeSectionTitle(cs, "Expériences Professionnelles", y, margin);
            for (Experience exp : cv.getExperiences()) {
                y = writeBullet(cs, exp.getTitle() + " - " + exp.getCompany() + " (" + exp.getStart_date() + ")", y, margin);
                y = writeIndentedText(cs, safe(exp.getDescription()), y, margin + 10);
            }

            y = writeSectionTitle(cs, "Formations", y, margin);
            for (Education form : cv.getEducations()) {
                y = writeBullet(cs, form.getDegree() + " - " + form.getSchool() + " (" + form.getStart_date() + ")", y, margin);
            }

            cs.close();
            document.save(filePath);
            document.close();

            return filePath;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private String safe(String text) {
        return text == null ? "" : text;
    }

    private float writeLine(PDPageContentStream stream, String text, float y, float margin) throws IOException {
        if (y < 50) return y;
        stream.beginText();
        stream.newLineAtOffset(margin, y);
        stream.showText(text);
        stream.endText();
        return y - 18;
    }

    private float writeSectionTitle(PDPageContentStream stream, String title, float y, float margin) throws IOException {
        if (y < 50) return y;
        stream.setFont(PDType1Font.HELVETICA_BOLD, 14);
        stream.beginText();
        stream.newLineAtOffset(margin, y);
        stream.showText(title);
        stream.endText();
        y -= 6;
        stream.moveTo(margin, y);
        stream.lineTo(PDRectangle.A4.getWidth() - margin, y);
        stream.stroke();
        stream.setFont(PDType1Font.HELVETICA, 12);
        return y - 20;
    }

    private float writeBullet(PDPageContentStream stream, String text, float y, float margin) throws IOException {
        if (y < 50) return y;
        stream.beginText();
        stream.newLineAtOffset(margin + 10, y);
        stream.showText("• " + text);
        stream.endText();
        return y - 16;
    }

    private float writeIndentedText(PDPageContentStream stream, String text, float y, float margin) throws IOException {
        if (y < 50) return y;
        stream.beginText();
        stream.newLineAtOffset(margin, y);
        stream.showText(text);
        stream.endText();
        return y - 16;
    }
}
