import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfViewerService {

  private pdf: any;
  private currentPage: number = 1;
  private totalPages: number = 0;

  constructor() {
    // Configuración de pdf.js (para asegurar que funcione bien en todos los navegadores)
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
  }

  // Cargar el archivo PDF
  loadPdf(pdfUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      pdfjsLib.getDocument(pdfUrl).promise.then((pdfDoc: any) => {
        this.pdf = pdfDoc;
        this.totalPages = pdfDoc.numPages;
        this.currentPage = 1;
        resolve();
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  // Obtener la página actual
  getCurrentPage() {
    return this.currentPage;
  }

  // Cambiar de página
  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  // Obtener el número total de páginas
  getTotalPages() {
    return this.totalPages;
  }

  // Renderizar la página actual
  renderPage(canvas: HTMLCanvasElement) {
    return this.pdf.getPage(this.currentPage).then((page: any) => {
      const viewport = page.getViewport({ scale: 1 });
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context!,
        viewport: viewport
      };

      return page.render(renderContext).promise;
    });
  }

  // Avanzar una página
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Retroceder una página
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Cambiar zoom
  zoomIn() {
    // Implementar un mecanismo de zoom aquí (puedes modificar el valor de scale).
  }

  zoomOut() {
    // Implementar un mecanismo de zoom aquí (puedes modificar el valor de scale).
  }
}