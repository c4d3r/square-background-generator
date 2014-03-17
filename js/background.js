/**
 * Created by Maxim on 12/03/14.
 */

function Cell(colors, x, y) {

    this.colors2 = ["#D45D5D", "#ED8D3E", "#FF7AC8"];
    this.currentColor = "#000";

    this.x = x;
    this.y = y;


    this.path = new Path.Rectangle(new Point(i * sizeSquare, j * sizeSquare), new Size(sizeSquare, sizeSquare));
    this.copy = path.clone();

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
    this.draw = function() {
        this.copy.fillColor = this.currentColor;
    }
}
Cell.prototype.changeColors = function(colors) {
    this.currentColor = colors[Math.round(Math.random() * (colors.length - 1))];
    this.copy.fillColor = this.currentColor;
}
Cell.prototype.startColorChange = function() {
    var self = this;
    loadingTimer = setInterval(function() { self.changeColors(["#D45D5D", "#ED8D3E", "#FF7AC8"]); }, 100);
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
            this.cells[i][0].draw();
            this.cells[i][0].startColorChange();

            for(var j = 1; j < this.cells[i].length; j++) {

                this.cells[i][j].draw();
                this.cells[i][j].startColorChange();

            }
        }
    }
}


var _document = document;

var canvas = _document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

var wH = window.innerHeight;
var wW = window.innerWidth;
canvas.setAttribute("height", wH);
canvas.setAttribute("width", wW);

console.log(wW);
console.log(wH);

//var colors = ["#915DD4", "#97D45D"];
//var colors2 = ["#5DA4D4", "#D45D5D", "#ED8D3E", "#FF7AC8"];
var colors = ["#97D45D", "#FFF"];
var colors2 = ["#D45D5D", "#ED8D3E", "#FF7AC8"];
var amountHorizontal = 40;

var sizeSquare = wW / amountHorizontal;

// horizontal 1
var objMatrix = new Matrix(amountHorizontal, amountHorizontal);
objMatrix.init();

//fill matrix
for(var i = 0; i < amountHorizontal; i++) {
    //fill vertical for this row
    for(var j = 0; j < amountHorizontal; j++) {
        if(i % 2 == 0 && (i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && (i % 2 == 1 && j % 2 == 1))) {
            objMatrix.addCell(new Cell(colors, i, j));
        } else {
            objMatrix.addCell(new Cell(colors2, i, j));
        }
    }
}
objMatrix.display();




