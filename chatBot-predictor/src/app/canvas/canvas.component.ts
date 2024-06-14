import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit{
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  public isEraser = false; // Add a flag for eraser mode
  private eraserSize = 10; // Eraser size, you can adjust it

  ngAfterViewInit() {
    const canvasEl = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    if (context) {
      this.ctx = context;
      this.fillCanvasWithWhite();
    } else {
      throw new Error('Failed to get 2D context');
    }
  }

  fillCanvasWithWhite() {
    this.ctx.fillStyle = '#FFFFFF'; // Set the background color to white
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // Fill the canvas with white
  }

  toggleEraser() {
    this.isEraser = !this.isEraser;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.drawing) {
      if (this.isEraser) {
        this.ctx.strokeStyle = '#FFFFFF'; // Assuming white is the background color
        this.ctx.lineWidth = this.eraserSize;
      } else {
        this.ctx.strokeStyle = '#000000'; // Drawing color
        this.ctx.lineWidth = 2; // Drawing line width
      }
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.drawing = false;
    this.ctx.closePath();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.drawing = false;
    this.ctx.closePath();
  }

  saveAsPng() {
    // Redraw the canvas with a white background before saving
    this.redrawCanvasWithBackground(() => {
      const canvasEl = this.canvas.nativeElement;
      const image = canvasEl.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'canvas.png';
      link.click();
    });
  }

  async copyToClipboard() {
    // Redraw the canvas with a white background before copying
    this.redrawCanvasWithBackground(() => {
      const canvasEl = this.canvas.nativeElement;
      canvasEl.toBlob(async (blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          alert('Canvas copied to clipboard!');
        } else {
          alert('Failed to copy canvas to clipboard.');
        }
      });
    });
  }

  private redrawCanvasWithBackground(callback: () => void) {
    // Create a temporary canvas to redraw the content with a white background
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      tempCanvas.width = this.canvas.nativeElement.width;
      tempCanvas.height = this.canvas.nativeElement.height;
      tempCtx.fillStyle = '#FFFFFF'; // Set background to white
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height); // Fill the temporary canvas with white
      tempCtx.drawImage(this.canvas.nativeElement, 0, 0); // Draw the current canvas content onto the temporary canvas
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // Clear the original canvas
      this.ctx.drawImage(tempCanvas, 0, 0); // Draw the combined content back to the original canvas
      callback();
    }
  }
}
