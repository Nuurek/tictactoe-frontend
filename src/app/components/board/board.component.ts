import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
  ElementRef,
  OnChanges,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit
} from '@angular/core';

import { Game } from '../../models/game';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterContentInit, OnChanges {
  @Input()
  game = <Game>undefined;

  @ViewChild('canvas')
  canvasRef: ElementRef;
  context: CanvasRenderingContext2D | any;

  GREY = '#555555';
  CELLS_PER_WIDTH = 3;
  CELLS_PER_HEIGHT = 3;
  GRID_WIDTH_RATIO = 0.02;

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit() {
    this.context = this.canvasRef.nativeElement.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.context) {
      this.drawBoard();
    }
  }

  private drawBoard() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.drawGrid();
  }

  private drawGrid() {
    this.context.fillStyle = this.GREY;
    this.context.fillRect(
      this.canvasWidth / 3 - this.gridWidth / 2,
      0,
      this.gridWidth,
      this.canvasHeight
    );
    this.context.fillRect(
      (2 * this.canvasWidth) / 3 - this.gridWidth / 2,
      0,
      this.gridWidth,
      this.canvasHeight
    );

    this.context.fillRect(
      0,
      this.canvasHeight / 3 - this.gridWidth / 2,
      this.canvasWidth,
      this.gridWidth
    );
    this.context.fillRect(
      0,
      (2 * this.canvasHeight) / 3 - this.gridWidth / 2,
      this.canvasWidth,
      this.gridWidth
    );
  }

  public onCellClick(fieldNumber) {
    console.log(fieldNumber);
  }

  get canvas() {
    return this.context.canvas;
  }

  get canvasWidth() {
    return this.canvas.width;
  }

  get canvasHeight() {
    return this.canvas.height;
  }

  get gridWidth() {
    return this.GRID_WIDTH_RATIO * this.canvasWidth;
  }

  get canvasClientWidth() {
    return this.canvasRef.nativeElement.getBoundingClientRect().width;
  }

  get canvasClientHeight() {
    return this.canvasRef.nativeElement.getBoundingClientRect().height;
  }

  get gridClientWidth() {
    return this.GRID_WIDTH_RATIO * this.canvasClientWidth;
  }

  get cells() {
    const cellWidthRatio =
      (1 - this.GRID_WIDTH_RATIO * (this.CELLS_PER_WIDTH - 1)) /
      this.CELLS_PER_WIDTH;
    const cellWidth = cellWidthRatio * this.canvasClientWidth;

    const cellHeightRatio =
      (1 - this.GRID_WIDTH_RATIO * (this.CELLS_PER_HEIGHT - 1)) /
      this.CELLS_PER_HEIGHT;
    const cellHeight = cellWidthRatio * this.canvasClientHeight;

    const gridWidth = this.gridClientWidth;

    const cells = [];

    for (let row = 0; row < this.CELLS_PER_WIDTH; row++) {
      for (let column = 0; column < this.CELLS_PER_HEIGHT; column++) {
        const left = column * (cellWidth + gridWidth);
        const top = row * (cellHeight + gridWidth);
        const width = cellWidth;
        const height = cellHeight;
        const fieldNumber = row * this.CELLS_PER_WIDTH + column;
        cells.push({
          left,
          top,
          width,
          height,
          fieldNumber
        });
      }
    }

    return cells;
  }
}
