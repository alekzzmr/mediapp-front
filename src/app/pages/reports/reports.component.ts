import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { Chart } from 'chart.js';
import { DomSanitizer } from '@angular/platform-browser';
import { Galleria } from 'primeng/galleria';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [MessageService]
})
export class ReportsComponent implements OnInit {

  pdfSrc: string;
  charType: string;
  chart: any;
  uploadedFiles: any[] = [];
  @ViewChild('uploader') uploader: FileUpload;

  imagenData: any;
  imagenEstado: boolean;

/* Gallery variables */
  images: any[];
  showThumbnails: boolean;
  fullscreen: boolean = false;
  activeIndex: number = 0;
  onFullScreenListener: any;
  @ViewChild('galleria') galleria: Galleria;
  responsiveOptions:any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
/* ||||||||||||||||| */


  dialogPDF: boolean = false;
  constructor(
    private consultaService: ConsultaService,
    private sanitization: DomSanitizer,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.consultaService.leerArchivo().subscribe(data => {
      this.convertir(data);
    });

    this.charType = 'line';
    this.dibujar();

    this.images = [
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria1.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria1s.jpg",
            "alt": "Description for Image 1",
            "title": "Title 1"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria2.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria2s.jpg",
            "alt": "Description for Image 2",
            "title": "Title 2"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria3.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria3s.jpg",
            "alt": "Description for Image 3",
            "title": "Title 3"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria4.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria4s.jpg",
            "alt": "Description for Image 4",
            "title": "Title 4"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria5.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria5s.jpg",
            "alt": "Description for Image 5",
            "title": "Title 5"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria6.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria6s.jpg",
            "alt": "Description for Image 6",
            "title": "Title 6"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria7.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria7s.jpg",
            "alt": "Description for Image 7",
            "title": "Title 7"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria8.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria8s.jpg",
            "alt": "Description for Image 8",
            "title": "Title 8"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria9.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria9s.jpg",
            "alt": "Description for Image 9",
            "title": "Title 9"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria10.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria10s.jpg",
            "alt": "Description for Image 10",
            "title": "Title 10"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria11.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria11s.jpg",
            "alt": "Description for Image 11",
            "title": "Title 11"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria12.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria12s.jpg",
            "alt": "Description for Image 12",
            "title": "Title 12"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria13.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria13s.jpg",
            "alt": "Description for Image 13",
            "title": "Title 13"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria14.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria14s.jpg",
            "alt": "Description for Image 14",
            "title": "Title 14"
        },
        {
            "previewImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria15.jpg",
            "thumbnailImageSrc": "https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria15s.jpg",
            "alt": "Description for Image 15",
            "title": "Title 15"
        }
    ]


  }

  dibujar() {
    this.consultaService.listarResumen().subscribe(data => {
      let cantidades = data.map(x => x.cantidad);
      let fechas = data.map(x => x.fecha);

      //console.log(cantidades);
      //console.log(fechas);

      this.chart = new Chart('canvas', {
        type: this.charType,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Cantidad',
              data: cantidades,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
          }
        }
      });
    });
  }

  onChange() {
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.dibujar();
  }

  generarReporte() {
    this.consultaService.generarReporte().subscribe(data => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        console.log(this.pdfSrc);
      }
      reader.readAsArrayBuffer(data);
    });
    this.dialogPDF = !this.dialogPDF;
  }

  descargarReporte() {
    this.consultaService.generarReporte().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      //console.log(url);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'ReporteConsulta.pdf';
      a.click();
    });
  }

  subirArchivo(event) {
    this.consultaService.guardarArchivo(event.files[0]).subscribe(() => {
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
      this.uploader.clear();
      //this.clearUpload();
    });
  }

  convertir(data: any){
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;
      this.sanar(base64);
    }
  }

  sanar(base64: any){
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado = true;

    console.log(this.imagenData);
  }


  /*  GALLERY METHODS  */
  onThumbnailButtonClick() {
      this.showThumbnails = !this.showThumbnails;
  }

  toggleFullScreen() {
      if (this.fullscreen) {
          this.closePreviewFullScreen();
      }
      else {
          this.openPreviewFullScreen();
      }
  }

  openPreviewFullScreen() {
      let elem = this.galleria.element.nativeElement.querySelector(".p-galleria");
      if (elem.requestFullscreen) {
          elem.requestFullscreen();
      }
      else if (elem['mozRequestFullScreen']) { /* Firefox */
          elem['mozRequestFullScreen']();
      }
      else if (elem['webkitRequestFullscreen']) { /* Chrome, Safari & Opera */
          elem['webkitRequestFullscreen']();
      }
      else if (elem['msRequestFullscreen']) { /* IE/Edge */
          elem['msRequestFullscreen']();
      }
  }

  onFullScreenChange() {
      this.fullscreen = !this.fullscreen;
  }

  closePreviewFullScreen() {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      }
      else if (document['mozCancelFullScreen']) {
          document['mozCancelFullScreen']();
      }
      else if (document['webkitExitFullscreen']) {
          document['webkitExitFullscreen']();
      }
      else if (document['msExitFullscreen']) {
          document['msExitFullscreen']();
      }
  }

  bindDocumentListeners() {
      this.onFullScreenListener = this.onFullScreenChange.bind(this);
      document.addEventListener("fullscreenchange", this.onFullScreenListener);
      document.addEventListener("mozfullscreenchange", this.onFullScreenListener);
      document.addEventListener("webkitfullscreenchange", this.onFullScreenListener);
      document.addEventListener("msfullscreenchange", this.onFullScreenListener);
  }

  unbindDocumentListeners() {
      document.removeEventListener("fullscreenchange", this.onFullScreenListener);
      document.removeEventListener("mozfullscreenchange", this.onFullScreenListener);
      document.removeEventListener("webkitfullscreenchange", this.onFullScreenListener);
      document.removeEventListener("msfullscreenchange", this.onFullScreenListener);
      this.onFullScreenListener = null;
  }

  ngOnDestroy() {
      this.unbindDocumentListeners();
  }

  galleriaClass() {
      return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
      return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
  }

}
