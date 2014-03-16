/**
 * Created by Maxim on 12/03/14.
 */
var _document = document;

var canvas = _document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

var wH = window.innerHeight;
var wW = window.innerWidth;
canvas.setAttribute("height", wH);
canvas.setAttribute("width", wW);

console.log(wW);
console.log(wH);

var colors = ["red", "#97D45D"];

var amountHorizontal = 128;

var sizeSquare = wW / amountHorizontal;

// horizontal 1
var objMatrix = new Matrix(amountHorizontal, amountHorizontal);
objMatrix.init();

//fill matrix
for(var i = 0; i < amountHorizontal; i++) {
    //fill vertical for this row
    for(var j = 0; j < amountHorizontal; j++) {
        if(i % 2 == 0 && (i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && (i % 2 == 1 && j % 2 == 1))) {
            objMatrix.addCell(new Cell(colors[0], i, j));
        } else {
            objMatrix.addCell(new Cell(colors[1], i, j));
        }
    }
}
objMatrix.display();

function Cell(color, x, y) {

    this.color = color;
    this.x = x;
    this.y = y;

    this.hasTop = function() {
        return y - 1 >= 0;
    }

    this.hasLeft = function () {
        return x - 1 >= 0;
    }

    this.hasRight = function() {
        return x + 1 < Math.ceil(sizeSquare);
    }

    this.hasBottom = function() {
        return y + 1 < Math.ceil(sizeSquare);
    }
}

function Matrix(rows, cols) {
    this.cols = cols;
    this.rows = rows;
    this.cells = [];

    this.addCell = function(cell) {
        this.cells[cell.x][cell.y] = cell;
    }

    this.count = function() {
        return this.cells.length;
    }

    this.init = function() {
        // Creates all lines:
        for(var i=0; i < rows; i++){

            // Creates an empty line
            this.cells.push([]);

            // Adds cols to the empty line:
            this.cells[i].push( new Array(cols));

            for(var j=0; j < cols; j++){
                // Initializes:
                this.cells[i][j] = 0;
            }
        }
    }

    this.display = function() {
        for(var i = 0; i < this.cells.length; i++)
        {
            var path = new Path.Rectangle(new Point(i * sizeSquare, 0), new Size(sizeSquare, sizeSquare));

            var copy = path.clone();
            copy.fillColor  = this.cells[i][0].color;

            for(var j = 1; j < this.cells[i].length; j++) {

                var pathJ = new Path.Rectangle(new Point(i * sizeSquare, j * sizeSquare), new Size(sizeSquare, sizeSquare));

                var copyJ = pathJ.clone();
                copyJ.fillColor  = this.cells[i][j].color;
            }
        }
    }
}
