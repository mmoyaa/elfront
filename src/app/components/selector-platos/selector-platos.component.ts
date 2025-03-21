import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlatosService, Plato } from '../../services/platos.service';
import * as pdfjsLib from 'pdfjs-dist';
import { PdfViewerService } from 'src/app/services/pdf-viewer.service';

// import * as pdfjsLib from 'pdfjs-dist/webpack';

@Component({
  selector: 'app-selector-platos',
  templateUrl: './selector-platos.component.html',
  styleUrls: ['./selector-platos.component.css']
})
export class SelectorPlatosComponent implements OnInit {
  platos: Plato[] = [];
  selectedPlato: Plato | null = null;
  searchTerm: string = '';
  @ViewChild('pdfCanvas') pdfCanvasRef!: ElementRef;
  pdf: any; // Almacenará el documento PDF cargado
  currentPage: number = 1;
  totalPages: number = 0;
  constructor(private platosService: PlatosService, private pdfService: PdfViewerService) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
  }
  ngOnInit() {
    this.platosService.getPlatos().subscribe((data) => {
      this.platos = data;
      console.log(this.platos);
    });
    // (pdfjsLib as any).GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
    // this.loadPdf(this.pdfUrl);
  }

  buscarPlato() {
    const platoEncontrado = this.platos.find(plato =>
      plato.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    
    if (platoEncontrado) {
      this.selectedPlato = platoEncontrado;
    } else {
      this.selectedPlato = null;
      alert('No se encontró el plato.');
    }
  }
  
  seleccionarPlato(event: any) {
    const platoId = event.target.value;
    this.selectedPlato = this.platos.find(plato => plato.id == platoId) || null;
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      
      // Cuando el archivo se haya leído correctamente
      reader.onload = (e: any) => {
        const pdfData = new Uint8Array(e.target.result); // Convertimos el contenido del archivo a un array
        this.loadPdf(pdfData);
      };
      
      // Leer el archivo como array buffer
      reader.readAsArrayBuffer(file);
    } else {
      alert('Por favor, selecciona un archivo PDF válido.');
    }
  }

  // Cargar el PDF desde un archivo
  loadPdf(pdfData: Uint8Array): void {
    pdfjsLib.getDocument(pdfData).promise.then((pdfDoc: any) => {
      this.pdf = pdfDoc; // Guardamos el documento PDF cargado
      this.totalPages = pdfDoc.numPages;
      this.currentPage = 1; // Reseteamos la página actual a 1
      this.renderPage(); // Renderizamos la primera página
    }).catch((error: any) => {
      console.error("Error al cargar el PDF:", error);
    });
  }

  // Renderizar la página actual
  renderPage(): void {
    if (!this.pdf) {
      console.error("PDF no cargado.");
      return;
    }

    const canvas = this.pdfCanvasRef.nativeElement;
    this.pdf.getPage(this.currentPage).then((page: any) => {
      const viewport = page.getViewport({ scale: 1 });
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context!,
        viewport: viewport
      };

      page.render(renderContext).promise.then((): void => {
        console.log("Página renderizada.");
      }).catch((error: Error): void => {
        console.error("Error al renderizar la página:", error);
      });
    });
  }

  // Navegar a la siguiente página
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderPage();
    }
  }

  // Navegar a la página anterior
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPage();
    }
  }
}