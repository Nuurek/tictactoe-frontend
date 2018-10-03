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
  GREEN = '#69f0ae';
  PURPLE = '#9c27b0';
  CELLS_PER_WIDTH = 3;
  CELLS_PER_HEIGHT = 3;
  GRID_WIDTH_RATIO = 0.02;
  CROSS_LINE_WIDTH_RATIO = 0.03;
  CROSS_WIDTH_PERCENTAGE = 0.6;
  CIRCLE_LINE_WIDTH_RATIO = 0.03;
  CIRCLE_WIDTH_PERCENTAGE = 0.7;

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit() {
    this.context = this.canvasRef.nativeElement.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.context) {
      console.log(changes);
      this.drawBoard();
    }
  }

  private drawBoard() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.drawGrid();
    this.drawMarks();
  }

  private drawGrid() {
    this.context.fillStyle = this.GREY;
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    this.cells.map(cell => {
      this.context.clearRect(cell.left, cell.top, cell.width, cell.height);
    });
  }

  private drawMarks() {
    this.cells.map(cell => {
      if (cell.mark) {
        const centerX = cell.left + cell.width / 2;
        const centerY = cell.top + cell.height / 2;
        
        switch (cell.mark) {
          case Field.X: {
            this.context.lineCap = 'round';
            this.context.strokeStyle = this.crossColor;
            this.context.lineWidth = this.crossLineWidth;

            this.context.beginPath();
            this.context.moveTo(
              centerX - cell.width / 2 * this.CROSS_WIDTH_PERCENTAGE,
              centerY - cell.height / 2 * this.CROSS_WIDTH_PERCENTAGE
            );
            this.context.lineTo(
              centerX + cell.width / 2 * this.CROSS_WIDTH_PERCENTAGE,
              centerY + cell.height / 2 * this.CROSS_WIDTH_PERCENTAGE
            );
            this.context.stroke();
            this.context.closePath();

            this.context.beginPath();
            this.context.moveTo(
              centerX + cell.width / 2 * this.CROSS_WIDTH_PERCENTAGE,
              centerY - cell.height / 2 * this.CROSS_WIDTH_PERCENTAGE
            );
            this.context.lineTo(
              centerX - cell.width / 2 * this.CROSS_WIDTH_PERCENTAGE,
              centerY + cell.height / 2 * this.CROSS_WIDTH_PERCENTAGE
            );
            this.context.stroke();
            this.context.closePath();
            break;
          }

          case Field.O: {
            this.context.lineCap = 'round';
            this.context.strokeStyle = this.circleColor;
            this.context.lineWidth = this.circleLineWidth;
            this.context.beginPath();
            this.context.ellipse(
              centerX, centerY, 
              cell.width / 2 * this.CIRCLE_WIDTH_PERCENTAGE, cell.height / 2 * this.CIRCLE_WIDTH_PERCENTAGE, 
              0, 0, 2 * Math.PI
              );
            this.context.stroke();
            this.context.closePath();
            break;
          }
        }
      }
    })
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

  get crossLineWidth() {
    return this.CROSS_LINE_WIDTH_RATIO * this.canvasWidth;
  }
  
  get circleLineWidth() {
    return this.CIRCLE_LINE_WIDTH_RATIO * this.canvasWidth;
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
        const fieldNumber = row * this.CELLS_PER_WIDTH + column;
        cells.push({
          left: column * (cellWidth + gridWidth),
          top: row * (cellHeight + gridWidth),
          width: cellWidth,
          height: cellHeight,
          fieldNumber,
          mark: this.game ? this.game.fields[fieldNumber] : null
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

  get circleColor() {
    return this.game.playerMark ? (this.game.playerMark == Field.O ? this.GREEN : this.PURPLE) : this.GREEN;
  }

  get crossColor() {
    return this.game.playerMark ? (this.game.playerMark == Field.X ? this.GREEN : this.PURPLE) : this.PURPLE;
  }
}
