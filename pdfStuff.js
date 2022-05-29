import { jsPDF } from "jspdf";
function timeToMinute(start, end)
{
    start = Math.floor(start / 1000);
    end = Math.floor(end / 1000);

    let startMinutes = 0;
    while (start >= 60)
    {
        start -= 60;
        startMinutes++;
    }
    let startSeconds = start;

    let endMinutes = 0;
    while (end >= 60)
    {
        end -= 60;
        endMinutes++;
    }
    let endSeconds = end;

    return `${startMinutes}:${startSeconds} - ${endMinutes}:${endSeconds}`;
}

export default function generatePDF(chapters, meetingTitle, forOption, fileName) {
    // intialize output pdf
    console.log("Generating meeting summary PDF");
    let doc = new jsPDF({pagesplit: true});
    let height = Math.floor(doc.internal.pageSize.getHeight());

    // generate meeting summary title
    doc.setFont("helvetica", "bold");  
    doc.setTextColor(41, 40, 40);
    doc.setFontSize(18);
    doc.text(`${meetingTitle}: Meeting Summary`, 105, 20, null, null, "center");

    // chapter summaries
    let currentHeight = 30;
    for (const chapter of chapters)
    {
        currentHeight = chapterSummary(doc, chapter, currentHeight);
    }

    // jad do things here*********************************
    if(forOption === "YouTube"){
        doc.save(`${fileName}.pdf`);
    }else if(forOption === "Microsoft Teams"){
        let file = doc.output();
        let fd = new FormData();     
        fd.append(`${fileName}.pdf`,file);
        return fd
    }
}

function chapterSummary(doc, chapter, currentHeight)
{
        // chapter header
        doc.setFontSize(14);
        doc.setTextColor(40, 40, 40);
        doc.setFont("helvetica", "bold");
        doc.text(`${chapter.gist}`, 20, currentHeight);
        currentHeight += 4;

        // chapter timing
        doc.setFontSize(11);
        doc.setTextColor(160, 160, 160);
        doc.setFont("helvetica", "normal");
        doc.text(timeToMinute(chapter.start, chapter.end), 20, currentHeight);
        currentHeight += 7;
    
        // chapter contents
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.setFont("helvetica", "normal");
        doc.text(`${chapter.headline}`, 20, currentHeight);

        // update spacing
        currentHeight += 10;

        return currentHeight;
}