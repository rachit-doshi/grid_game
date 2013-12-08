function draw_rectangle(xPos, yPos, width, height, fillColor, borderColor, borderWidth) {
    var rectangle = new Kinetic.Rect({
        x: xPos,
        y: yPos,
        width: width,
        height: height,
        fill: fillColor,
        stroke: borderColor,
        strokeWidth: borderWidth
    });

    return rectangle;
}

function draw_polygon(coOrdinates, fillColor, borderColor, borderWidth) {
    var polygon = new Kinetic.Polygon({
        // left-left, left-top, right-left, right-top, bottom-left, bottom-top
        points: coOrdinates,
        fill: fillColor,
        stroke: borderColor,
        strokeWidth: borderWidth
    });

    return polygon;
}

function bind_color(color, $object, gridLayer) {
    $object.on('click', function() {
        this.setFill(color);
        gridLayer.draw();
        clickedElements[$object.index] = color;
    });
}

function reset_stroke($object) {
    for (var i = 0; i < $object.length; i++) {
        $object[i].setStroke(($object[i].getFill() === 'white') ? 'black' : $object[i].getFill());
        $object[i].setStrokeWidth(1);
    }
}

function rebind_new_color(new_color, $object, gridLayer) {
    for (var i = 0; i < $object.length; i++) {
        $object[i].off('click');
        bind_color(new_color, $object[i], gridLayer);
    }
}

function add_select_color_boxes(gridLayer, colors, triangle) {
    var count = 0;
    var selectColorXPos = 50;
    var rectangle = [];
    // Setting all colours in rectagles so as to select colors to be displayed
    for (var k = 0; k < colors.length; k++) {
        rectangle[count] = draw_rectangle(selectColorXPos, 10, 20, 20, colors[k], (colors[k] === 'white') ? 'black' : colors[k], 1);
        if (k === 0) {
            rectangle[count].setStroke('black');
            rectangle[count].setStrokeWidth(5);
        }
        rectangle[count].on('click', function() {
            // remove stroke for all and add new to current
            reset_stroke(rectangle);
            this.setStroke('black');
            this.setStrokeWidth(5);
            rebind_new_color(this.getFill(), triangle, gridLayer);
            gridLayer.draw();
        });
        selectColorXPos += 30;
        gridLayer.add(rectangle[count++]);
    }

    return {'gridLayer': gridLayer, 'rectangle': rectangle, 'triangle': triangle};
}

function generate_grid_canvas(stage, showColorPicker, default_color, colors, triangleBase, triangleHeight, columns, rows, bind_colors, randomKeys, direction) {
    var gridLayer = new Kinetic.Layer();
//pageCenter, startTop, pageCenter, (triangleBase + startTop), (pageCenter - (triangleHeight / 2)), ((triangleBase / 2) + startTop)
    var counter = 0;
    var triangle = [];
    var fillColor = 'white';
    var startLeft = (stage.getWidth() - (columns * (triangleHeight / 2))) / 2;
    var minRows = ((rows - (columns / 2)) < 0) ? 0 : rows - (columns / 2);
    var startTop = ((triangleBase) / 2) * (rows - minRows) + 100;
    var testTop = 0;
    var i = 0;
    var randomCounters = [];
    var rowsCount = 0;

    if (!bind_colors) {
        for (var key in randomKeys) {
            randomCounters[i++] = key;
        }
    }

    for (var j = 0; j < (columns); j++) {
        columnRowCount[rowsCount++] = minRows;
        testTop = startTop;
        for (var i = 0; i < minRows; i++) {

            fillColor = (randomCounters.indexOf('' + counter + '') !== -1) ? randomKeys[counter] : 'white';
            triangle[counter] = draw_polygon([startLeft, testTop, startLeft, (testTop + triangleBase), (startLeft + (triangleHeight / 2)), (testTop + (triangleBase / 2))], fillColor, 'lightgray', 1);

            if (bind_colors) {
                bind_color(default_color, triangle[counter], gridLayer);
            }

            gridLayer.add(triangle[counter++]);
            testTop += triangleBase;
        }

        startLeft += (triangleHeight / 2);
        startTop = (j < (columns) / 2) ? (startTop - (triangleBase / 2)) : (startTop + (triangleBase / 2));
        minRows = (j < (columns) / 2) ? (minRows + 1) : (minRows - 1);
        columnRowCount[rowsCount++] = minRows;

        testTop = startTop;
        for (var i = 0; i < minRows; i++) {
            fillColor = (randomCounters.indexOf('' + counter + '') !== -1) ? randomKeys[counter] : 'white';
            triangle[counter] = draw_polygon([startLeft, (testTop + triangleBase), startLeft, testTop, (startLeft - ((triangleHeight) / 2)), (testTop + (triangleBase / 2))], fillColor, 'lightgray', 1);

            if (bind_colors) {
                bind_color(default_color, triangle[counter], gridLayer);
            }

            gridLayer.add(triangle[counter++]);
            testTop += triangleBase;
        }

    }

    if (showColorPicker) {
        return_details = add_select_color_boxes(gridLayer, colors, triangle);
        triangle = return_details['triangle'];
        gridLayer = return_details['gridLayer'];
    }

    stage.add(gridLayer);
    return triangle;
}