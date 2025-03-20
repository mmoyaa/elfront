export class NatescposComponent implements OnInit {
  pdfDoc: any; // Referencia al documento PDF
  currentPage = 1; // Página actual
  scale = 1.3; // Zoom inicial
  @ViewChild('pdfCanvas', { static: false }) pdfCanvas!: ElementRef<HTMLCanvasElement>;

  renderPDF(pdfData: Uint8Array): void {
    pdfjsLib.getDocument(pdfData).promise.then(pdf => {
      console.log('PDF cargado');
      this.pdfDoc = pdf; // Guarda el documento PDF
      this.renderPage(this.currentPage);
    }).catch(error => {
      console.error('Error al cargar el documento PDF: ', error);
    });
  }

  renderPage(pageNum: number): void {
    this.pdfDoc.getPage(pageNum).then(page => {
      if (this.pdfCanvas && this.pdfCanvas.nativeElement) {
        const canvas = this.pdfCanvas.nativeElement;
        const ctx = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: this.scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({ canvasContext: ctx, viewport })
          .then(() => console.log(`Página ${pageNum} renderizada`))
          .catch(error => console.error('Error al renderizar la página:', error));
      }
    }).catch(error => {
      console.error('Error al obtener la página del PDF:', error);
    });
  }

  nextPage(): void {
    if (this.currentPage < this.pdfDoc.numPages) {
      this.currentPage++;
      this.renderPage(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPage(this.currentPage);
    }
  }

  zoomIn(): void {
    this.scale += 0.2;
    this.renderPage(this.currentPage);
  }

  zoomOut(): void {
    if (this.scale > 0.5) {
      this.scale -= 0.2;
      this.renderPage(this.currentPage);
    }
  }
}




enhtml

<div class="toolbar">
  <button (click)="prevPage()">⬅ Anterior</button>
  <span>Página {{ currentPage }} de {{ pdfDoc?.numPages }}</span>
  <button (click)="nextPage()">Siguiente ➡</button>
  <button (click)="zoomIn()">🔍➕ Zoom In</button>
  <button (click)="zoomOut()">🔍➖ Zoom Out</button>
</div>

<canvas #pdfCanvas></canvas>


en css 
.toolbar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
