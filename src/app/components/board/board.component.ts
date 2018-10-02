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
  AfterContentInit,
  Output,
  EventEmitter
} from '@angular/core';

import { Game, Field } from '../../models/game';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterContentInit, OnChanges {
  @Input()
  game = <Game>undefined;

  @Output()
  fieldClicked = new EventEmitter<number>();

  @ViewChild('canvas')
  canvasRef: ElementRef;
  context: CanvasRenderingContext2D;

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
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    this.cells.map(cell => {
      this.context.clearRect(cell.left, cell.top, cell.width, cell.height);
    });
  }

  public onCellClick(fieldNumber) {
    if (!this.game.fields[fieldNumber]) {
      this.fieldClicked.emit(fieldNumber);
    }
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
    const cellWidth = cellWidthRatio * this.canvasWidth;

    const cellHeightRatio =
      (1 - this.GRID_WIDTH_RATIO * (this.CELLS_PER_HEIGHT - 1)) /
      this.CELLS_PER_HEIGHT;
    const cellHeight = cellHeightRatio * this.canvasHeight;

    const gridWidth = this.gridWidth;

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

  get canvasToClientRatio() {
    return this.canvasWidth / this.canvasClientWidth;
  }

  get clientCells() {
    return this.cells.map(cell => {
      return {
        ...cell,
        left: cell.left / this.canvasToClientRatio,
        top: cell.top / this.canvasToClientRatio,
        width: cell.width / this.canvasToClientRatio,
        height: cell.height / this.canvasToClientRatio
      }
    })
  }

  get opponentMark() {
    return this.game.playerMark == Field.X ? Field.O : Field.X;
  }
}
