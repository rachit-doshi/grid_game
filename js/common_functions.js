/*
 * @description draws a rectangle using kinetic.rect property of kinetic.js
 * @param {int} xPos: position x of the rectangle to be drawn
 * @param {int} yPos: position y of the rectangle to be drawn
 * @param {int} width: width of the rectangle to be drawn
 * @param {int} height: height of the rectangle to be drawn
 * @param {string} fillColor: color to fill the rectangle with
 * @param {string} borderColor: color of the rectangle border
 * @param {int} borderWidth: width of the specified border for the rectangle
 * @returns {object} rectangle: kinetic.js object of the rectangle
 */
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

/*
 * @description draws triangles
 * @param {array} coOrdinates: [point1 X, point1 Y, point2 X, point2 Y, point3 X, point3 Y]
 * @param {string} fillColor: color to be filled in the triangles
 * @param {string} borderColor: border color of the triangles drawn
 * @param {int} borderWidth: width of the border of the triangle drawn
 * @returns {object} polygon: kinetic.js object of the polygon
 */
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

/*
 * @description binds color to the triangle on click
 * @param {string} color: color to be binded to the triangle on click
 * @param {object} $object: kinetic.polygon object
 * @param {object} gridLayer: kinetic.Layer object
 * @returns {boolean} true
 */
function bind_color(color, $object, gridLayer) {
    $object.on('click', function() {
        this.setFill(color);
        gridLayer.draw();
    });

    return true;
}

/*
 * @description resets the color boxes border
 * @param {object} $object: all rectangles i.e. kinetic.Rect objects
 * @returns {boolean} true
 */
function reset_stroke($object) {
    for (var i = 0; i < $object.length; i++) {
        $object[i].setStroke(($object[i].getFill() === 'white') ? 'black' : $object[i].getFill());
        $object[i].setStrokeWidth(1);
    }

    return true;
}

/*
 * @description binds new color and also binds the triangle click event with the new color
 * @param {string} new_color: has the new color to be binded
 * @param {object} $object: kinetic.polygon object
 * @param {object} gridLayer: kinetic.Layer object
 * @returns {boolean} true
 */
function rebind_new_color(new_color, $object, gridLayer) {
    for (var i = 0; i < $object.length; i++) {
        $object[i].off('click');
        bind_color(new_color, $object[i], gridLayer);
    }

    return true;
}

/*
 * @description adds color boxes to select color and fill that color into triangles
 * @param {object} gridLayer: kinetic.Layer object
 * @param {array} colors: array of colors picker that is to be displayed
 * @param {array} triangle: kinetic.polygon object
 * @returns {array} {gridLayer, rectangle, triangle}
 */
function add_select_color_boxes(gridLayer, colors, triangle) {
    var count = 0;
    var selectColorXPos = 50;
    var rectangle = [];

    // Setting all colours in rectangles so as to select colors to be displayed
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

/*
 * @description generates the grid canvas that is required to be drawn
 * @param {object} stage: Kinetic.Stage object
 * @param {boolean} showColorPicker: true/false
 * @param {string} default_color: default color to be selected if showColorPicker is set to true
 * @param {array} colors: unique colors to be displayed if showColorPicker is true
 * @param {int} triangleBase: base of the triangle to be drawn
 * @param {int} triangleHeight: height of the triangle to be drawn
 * @param {int} columns: number of columns required
 * @param {int} rows: number of rows required
 * @param {array} randomKeys: keys to be prefilled if showColorPicker is false
 * @returns {Array} triangle: array of Kinetic.polygon
 */
function generate_grid_canvas(stage, showColorPicker, default_color, colors, triangleBase, triangleHeight, columns, rows, randomKeys) {
    var gridLayer = new Kinetic.Layer();
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

    if (!showColorPicker) {
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

            if (showColorPicker) {
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

            if (showColorPicker) {
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

/*
 * @description get all the keys where color is not white and also fetches the first and last of such keys
 * @param {array} triangle: array of kinetic.Polygon objects
 * @returns {array} {randomKeys, firstKey, LastKey}
 */
function getRandomKeysList(triangle) {
    var randomKeys = {};
    var triangleColor = '';
    var firstKey = null;
    var lastKey = null;

    for (var i = 0; i < triangle.length; i++) {
        triangleColor = triangle[i].getFill();

        if (triangle[i].getFill() !== 'white') {
            if (firstKey === null) {
                firstKey = i;
            }

            lastKey = i;
            randomKeys[i] = triangleColor;
        }
    }

    return {'randomKeys': randomKeys, 'firstKey': firstKey, 'lastKey': lastKey};
}

/*
 * @description compare values between the parameters
 * @param {array} left_distances: holds a list of all the distances of the colored triangle object w.r.t its first element form the left canvas
 * @param {array} right_distances: holds a list of all the distances of the colored triangle object w.r.t its first element from the right canvas
 * @returns {Boolean} true if both the arrays matched
 */
function compareValues(left_distances, right_distances) {
    // There are some missing element or additional elements have been drawn
    if (parseInt(left_distances.length) !== parseInt(right_distances.length)) {
        return false;
    }

    var leftKeysLength = parseInt(left_distances.length);
    var returnValue = true;

    for (var i = 0; i < leftKeysLength; i++) {
        if ((left_distances[i]['color'] !== right_distances[i]['color'])
                || (parseInt(left_distances[i]['columnCount']) !== parseInt(right_distances[i]['columnCount']))
                || (parseInt(left_distances[i]['distance']) !== parseInt(right_distances[i]['distance']))) {
            // Some values have mismatched
            returnValue = false;
            break;
        }
    }

    return returnValue;
}

/*
 * @description loops through each key set in random keys so as to find its distance from the firstkey untill the lastKey
 * @param {array} randomKeys: colored keys
 * @param {array} triangle: Kinetic.Polygon Objects
 * @param {int} firstKey: the first most key in the grid
 * @param {int} lastKey: the last key in the grid
 * @returns {Array} distances: array of distances for all the keys present in randomKeys
 */
function generateValues(randomKeys, triangle, firstKey, lastKey) {
    var firstColumn = null;
    var lastColumn = null;
    var counter = -1;
    var totalRows = 0;

    // Gets the first column and the last column
    for (var i = 0; i < columnRowCount.length; i++) {
        counter += (parseInt(columnRowCount[i]));
        if (counter >= firstKey && firstColumn === null) {
            firstColumn = i;
            totalRows = counter;
            continue;
        }

        if (counter >= lastKey && lastColumn === null) {
            lastColumn = i;
        }
    }

    // If first column is an even number, then count should be starting from 1 else 0
    // This is because, if its an even columnNo, then 3 steps further is the firs iteration to be incremented else 4 steps further
    var iterationColumnNo = (firstColumn % 2 === 0) ? 1 : 0;
    var firstKeyNeighbour = firstKey;
    var currentTotalRows = totalRows;
    var key = 0;
    var distances = [];
    var counter = 0;
    var firstKeyNeighbours = {};
    var iterationCount = 4;
    var rws = 0;

    // @NOTE: this scenario fails only if firstKey is 5 and lastKey is 395-399
    for (key in randomKeys) {
        // Ignoring 1st key
        if (parseInt(key) !== parseInt(firstKey)) {
            // If next key lies in the same column as the firstKey
            if (key <= currentTotalRows) {
                distances[counter] = [];
                distances[counter]['distance'] = key - firstKey;
                distances[counter]['columnCount'] = 0;
                distances[counter++]['color'] = triangle[key].getFill();
                // Key lies in next column so iterate to another column
            } else {
                distances[counter] = [];
                // Iterate through all columns untill current key's column is found
                for (var columnNo = firstColumn + 1; columnNo <= lastColumn; columnNo++) {
                    iterationColumnNo++;

                    // add current columns rowCount to currentTotalRows
                    currentTotalRows += parseInt(columnRowCount[columnNo]);
                    rws = (parseInt(columnNo) <= 20) ? (columnNo - 1) : columnNo;
                    // add previous rows column to firstKeyNeighbour to get the next neighbour
                    // But after half the grid is completed we have to take current rows column
                    firstKeyNeighbour += parseInt(columnRowCount[rws]);

                    // now we have to move from up to down by 1 row if iteration column % 4 is 0
                    if (parseInt(iterationColumnNo) % parseInt(iterationCount) === 0) {
                        firstKeyNeighbour += 1;
                    }

                    firstKeyNeighbours[firstKeyNeighbour] = 'black';
                    if (key <= currentTotalRows) {
                        distances[counter]['distance'] = key - firstKeyNeighbour;
                        distances[counter]['columnCount'] = iterationColumnNo;
                        distances[counter++]['color'] = triangle[key].getFill();
                        break;
                    }

                }
            }
        }

        iterationColumnNo = (firstColumn % 2 === 0) ? 1 : 0;
        firstKeyNeighbour = firstKey;
        currentTotalRows = totalRows;
    }

    return distances;
}