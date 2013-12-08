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

function add_select_color_boxes(gridLayer, colors, count, triangle) {
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

function drawGrid(direction, columns, rows, triangleBase, triangleHeight, pageCenter, counter, default_color, triangle, gridLayer, bind_colors, randomKeys) {

    var newLeft = 0, newTop = 0, startTop = 60, i = 0, j = 0;
    var fillColor = 'white';
    var key = 0;
    var randomCounters = [];

    if (!bind_colors) {
        for (key in randomKeys) {
            randomCounters[i++] = key;
        }
    }


    for (j = 0; j < (columns / 2); j++) {
        for (i = 0; i < rows; i++) {
            if (i === 0) {
                newLeft = (direction === 'right') ? (pageCenter + (triangleHeight / 2)) : (pageCenter - (triangleHeight / 2));
                newTop = ((triangleBase / 2) + startTop);
            }

            fillColor = (randomCounters.indexOf('' + counter + '') !== -1) ? randomKeys[counter] : 'white';
            triangle[counter] = draw_polygon([pageCenter, startTop, pageCenter, (triangleBase + startTop), (pageCenter + (triangleHeight / 2)), ((triangleBase / 2) + startTop)], fillColor, 'lightgray', 1);

            if (bind_colors) {
                bind_color(default_color, triangle[counter], gridLayer);
            }

            gridLayer.add(triangle[counter++]);

            fillColor = (randomCounters.indexOf('' + counter + '') !== -1) ? randomKeys[counter] : 'white';
            triangle[counter] = draw_polygon([pageCenter, startTop, pageCenter, (triangleBase + startTop), (pageCenter - (triangleHeight / 2)), ((triangleBase / 2) + startTop)], fillColor, 'lightgray', 1);

            if (bind_colors) {
                bind_color(default_color, triangle[counter], gridLayer);
            }
            gridLayer.add(triangle[counter++]);
            startTop += triangleBase;
        }
        pageCenter = newLeft;
        rows -= 1;
        startTop = newTop;
    }

    var rightXPos = (direction === 'right') ? (pageCenter - (triangleHeight / 2)) : (pageCenter + (triangleHeight / 2));
    for (i = 0; i < rows; i++) {
        // last column needs to be redefined, hence this code
        triangle[counter] = draw_polygon([pageCenter, startTop, pageCenter, (triangleBase + startTop), rightXPos, ((triangleBase / 2) + startTop)], 'white', 'lightgray', 1);
        if (bind_colors) {
            bind_color(default_color, triangle[counter], gridLayer);
        }

        gridLayer.add(triangle[counter++]);
        startTop += triangleBase;
    }

    return {'gridLayer': gridLayer, 'triangle': triangle, 'counter': counter};
}

function generate_grid_canvas(stage, showColorPicker, default_color, colors, triangleBase, triangleHeight, columns, rows, bind_colors, randomKeys) {    
    var gridLayer = new Kinetic.Layer();

    var counter = 0;
    var triangle = [];
    var pageCenter = (stage.getWidth() / 2);

    var return_details = drawGrid('right', columns, rows, triangleBase, triangleHeight, pageCenter, counter, default_color, triangle, gridLayer, bind_colors, randomKeys);
    return_details = drawGrid('left', columns, rows, triangleBase, triangleHeight, pageCenter, return_details['counter'], default_color, return_details['triangle'], return_details['gridLayer'], bind_colors, randomKeys);

    if (showColorPicker) {
        return_details = add_select_color_boxes(return_details['gridLayer'], colors, 0, return_details['triangle']);        
    }

    stage.add(return_details['gridLayer']);

    return return_details['triangle'];
}