import { Component, OnInit } from '@angular/core';
import { Letter } from '../../../../../models/Letter';
import { ActivatedRoute } from '@angular/router';
import { LetterService } from '../../../../../core/services/letter-service/letter.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-preview-letter',
  standalone: false,
  templateUrl: './preview-letter.component.html',
  styleUrl: './preview-letter.component.css'
})
export class PreviewLetterComponent implements OnInit {


  letterContent: string = '';
  letterObject: string = '';

  letter:Letter = {
    id: '',
    object: '',
    content: '',
    updatedAt: ''
  };

  constructor(private active:ActivatedRoute,private letterservice:LetterService) { }

  ngOnInit(): void {
    const letterId = this.active.snapshot.paramMap.get('id');
    if (letterId) {
      this.letterservice.getLetterById(letterId).subscribe({
        next: (data: any) => {
          this.letter = data;
          this.letterContent = data.content;
          this.letterObject = data.object;
          console.log('Letter loaded successfully:', this.letter);
        },
        error: (err) => {
          console.error('Error loading letter:', err);
        }
      }); 

    } else {
      console.error('No letter ID provided in route parameters');
    }




  }

  // Additional methods to handle letter preview can be added here
  downloadLetter() {
    const blob = new Blob([this.letterContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${this.letterObject}.txt`;
    link.click();
  }
  printLetter() {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Letter</title>
            <style>
              body { font-family: Arial, sans-serif; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <h1>${this.letterObject}</h1>
            <pre>${this.letterContent}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Failed to open print window');
    }
  }
  copyToClipboard() {
    navigator.clipboard.writeText(this.letterContent).then(() => {
      console.log('Letter content copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy letter content: ', err);
    });
  }
  shareLetter() {
    const shareData = {
      title: this.letterObject,
      text: this.letterContent,
      url: window.location.href // You can modify this to share a specific URL
    };
    navigator.share(shareData).then(() => {
      console.log('Letter shared successfully');
    }).catch(err => {
      console.error('Failed to share letter: ', err);
    });
  }
  editLetter() {
    // Logic to navigate to the letter editing page
    // This could involve using Angular's Router to navigate to a specific route
    console.log('Navigating to letter editing page...');
    // Example: this.router.navigate(['/edit-letter', { content: this.letterContent, object: this.letterObject }]);
  }
  deleteLetter() {
    // Logic to delete the letter
    // This could involve calling a service to delete the letter from the backend
    console.log('Deleting letter...');
    // Example: this.letterService.deleteLetter(this.letterId).subscribe(() => {
    //   console.log('Letter deleted successfully');
    // });
  }

  downloadPDF(): void {
    const element = document.getElementById('letter-preview') as HTMLElement;
  
    html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;
  
      const imgProps = {
        width: pageWidth,
        height: (canvas.height * pageWidth) / canvas.width,
      };
  
      // Adjust if height exceeds 1 page (force scale to fit)
      if (imgProps.height > pageHeight) {
        imgProps.height = pageHeight;
      }
  
      pdf.addImage(imgData, 'JPEG', 0, 0, imgProps.width, imgProps.height);
      pdf.save('cv.pdf');
    });
  }
   
}
