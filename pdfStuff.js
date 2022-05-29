import { jsPDF } from "jspdf";

export default function generatePDF() {
    console.log("Generating meeting summary PDF");

    var doc = new jsPDF();
    console.log(doc);
    
    doc.text("Hello World!", 1, 3);
    doc.save("test123.pdf");
    console.log("Finished generating meeting summary PDF")
}
