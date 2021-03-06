<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <style type="text/css">
            *{
                margin:0px;
                padding: 0px;
            }
            .main{
                margin: 0 auto; 
                width: 1200px; 
                height:600px; 
                background: rgba(173, 173, 173, 0.5); 
                -moz-border-radius: 0px 0px 2px 20px;
                -webkit-border-radius: 0px 0px 20px 20px;
                -khtml-border-radius: 0px 0px 20px 20px; 
                border-radius: 0px 0px 20px 20px;			    
            }			
            .header{
                margin: 0 auto;
                width: 1200px;  
                height: 50px;
                background: #0774bd;
                color: #fff;
                padding:0px;
            }
            .title{
                font-family:"Trebuchet MS", Helvetica, sans-serif;
                font-size:15px;
                color: #fff;
                padding: 15px 0px 0px 20px;
            }
            .left{
                float: left; 
                padding:0px;  
                margin: 20px 10px 10px 30px;
                border:1px solid #fff; 
                -moz-border-radius: 20px;    	
                -webkit-border-radius: 20px;
                -khtml-border-radius: 20px; 
                border-radius: 20px;
                background-color:#fff;
            }
            .right{
                float: left; 
                padding:0px;  
                margin: 20px 10px 10px 30px;
                border:1px solid #fff; 
                -moz-border-radius: 20px;    	
                -webkit-border-radius: 20px;
                -khtml-border-radius: 20px; 
                border-radius: 20px;
                background-color:#fff; 
            }
            .button{
                padding:10px; margin:10px;
            }
        </style>
    </head>
    <body class="*">
        <?php
        $orgRows = 15;
        $orgColumns = 20;
        $triangleBase = 25;
        $triangleHeight = 45;
        $containerWidth = 550;
        $containerHeight = 550;
        $randomColors = array(137 => 'blue', 150 => 'red', 163 => 'blue', 164 => 'orange', 177 => 'darkblue', 178 => 'yellow', 191 => 'black', 192 => 'black',
            193 => 'blue', 206 => 'gray', 207 => 'black', 208 => 'darkgreen', 220 => 'purple', 221 => 'lightgreen', 222 => 'darkblue', 223 => 'darkblue', 234 => 'darkblue',
            235 => 'orange', 236 => 'gray', 237 => 'gray', 247 => 'blue', 248 => 'purple', 249 => 'red', 250 => 'red', 251 => 'gray');
        /* $randomColors = array(5 => 'blue', 137 => 'blue', 150 => 'red', 163 => 'blue', 164 => 'orange', 177 => 'darkblue', 178 => 'yellow', 191 => 'black', 192 => 'black',
          193 => 'blue', 206 => 'gray', 207 => 'black', 208 => 'darkgreen', 220 => 'purple', 221 => 'lightgreen', 222 => 'darkblue', 223 => 'darkblue', 234 => 'darkblue',
          235 => 'orange', 236 => 'gray', 237 => 'gray', 247 => 'blue', 248 => 'purple', 249 => 'red', 250 => 'red', 251 => 'gray', 399 => 'yellow',);
          /* $randomColors = array(82 => "blue", 92 => "blue", 93 => "blue", 99 => "red", 101 => "red", 103 => "blue", 104 => "blue", 110 => "red", 113 => "red", 115 => "blue",
          122 => "red", 123 => "red", 124 => "red", 125 => "red", 135 => "red", 136 => "white", 137 => "red", 148 => "red", 149 => "white", 150 => "red", 162 => "red", 163 => "red",
          176 => "red", 177 => "red", 190 => "red", 192 => "red", 205 => "red", 207 => "red", 219 => "red", 220 => "red", 221 => "red", 222 => "red", 233 => "red", 236 => "red",
          238 => "blue", 247 => "red", 249 => "red", 251 => "blue", 252 => "blue", 264 => "blue", 265 => "blue", 277 => "blue", );
          /*$randomColors = array(258 => 'blue', 41 => 'blue', 67 => 'orange', 260 => 'darkblue', 232 => 'yellow', 233 => 'yellow', 47 => 'black', 75 => 'black',
          73 => 'blue', 71 => 'gray', 69 => 'black', 40 => 'darkgreen', 42 => 'lightgreen', 43 => 'darkblue', 44 => 'darkblue', 45 => 'darkblue', 394 => 'yellow'
          );
          $randomColors = array(5 => 'orange', 11 => 'orange', 17 => 'blue', 24 => 'blue', 32 => 'blue', 40 => 'green', 42 => 'black', 44 => 'black', 46 => 'black',
          48 => 'green', 50 => 'black', 52 => 'black', 54 => 'black', 56 => 'black', 58 => 'black', 60 => 'black', 62 => 'black', 64 => 'black',
          66 => 'green', 68 => 'black', 70 => 'black', 72 => 'black', 74 => 'black',
          76 => 'green', 78 => 'black', 80 => 'black', 82 => 'black', 84 => 'black', 86 => 'black', 88 => 'black', 90 => 'black', 92 => 'black', 94 => 'black', 96 => 'black',
          98 => 'green', 100 => 'black', 102 => 'black', 104 => 'black', 106 => 'black', 108 => 'black',
          110 => 'green', 112 => 'black', 114 => 'black', 116 => 'black', 118 => 'black', 120 => 'black',
          122 => 'green', 124 => 'black', 126 => 'black', 128 => 'black', 130 => 'black', 132 => 'black',
          134 => 'green', 136 => 'black', 138 => 'black', 140 => 'black', 142 => 'black', 144 => 'black', 146 => 'black', 148 => 'black', 150 => 'black', 152 => 'black', 154 => 'black', 156 => 'black', 158 => 'black',
          160 => 'green', 162 => 'black', 164 => 'black', 166 => 'black', 168 => 'black', 170 => 'black', 172 => 'black',
          174 => 'green', 176 => 'black', 178 => 'black', 180 => 'black', 182 => 'black', 184 => 'black', 186 => 'black', 188 => 'black', 190 => 'black', 192 => 'black', 194 => 'black', 196 => 'black', 198 => 'black', 200 => 'black', 202 => 'black',
          219 => 'orange', 220 => 'blue');
          $randomColors = array(258 => 'blue', 228 => 'red', 41 => 'blue', 67 => 'orange', 260 => 'darkblue', 232 => 'yellow', 47 => 'black', 75 => 'black',
          73 => 'blue', 71 => 'gray', 69 => 'black', 40 => 'darkgreen', 227 => 'purple', 42 => 'lightgreen', 43 => 'darkblue', 44 => 'darkblue', 45 => 'darkblue',
          229 => 'orange', 230 => 'gray', 257 => 'gray', 259 => 'blue', 285 => 'purple', 231 => 'red', 46 => 'red', 286 => 'gray'); */

        ksort($randomColors);

        // Donot remove this, as this is the eraser
        $randomColors[] = 'white';

        $colors = array_merge(array_unique($randomColors));
        $default_color = $colors[0];
        ?>
        <div class="header"><h2 class="title">Test</h2></div>
        <div class="main">                
            <div id="left" class="left"></div>
            <div id="right" class="right"></div>
        </div>
        <div style="height:20px; margin: 0 auto; width: 1200px; clear:both; text-align:center; padding-top:30px;">
            <input type="button" id="compare" class="button" value="Compare" />
            <input type="button" id="reset" class="button" value="Reset" />
        </div>
        <script src="js/kinetic-v4.7.4.min.js"></script>
        <script src="js/grid_functions.js"></script>
        <script defer="defer">
            var default_color = '<?php echo $default_color; ?>';
            var colors = <?php echo json_encode($colors); ?>;
            var triangleBase = <?php echo $triangleBase; ?>;
            var triangleHeight = <?php echo $triangleHeight; ?>;
            var columns = <?php echo $orgColumns; ?>;
            var rows = <?php echo $orgRows; ?>;
            var canvasWidth = <?php echo $containerWidth; ?>;
            var canvasHeight = <?php echo $containerHeight; ?>;
            var randomKeys = <?php echo json_encode($randomColors); ?>;
            var leftStage = new Kinetic.Stage({container: 'left', width: canvasWidth, height: canvasHeight, id: 'left_1'});
            var rightStage = new Kinetic.Stage({container: 'right', width: canvasWidth, height: canvasHeight, id: 'right_1'});
            var columnKeys = [];
            var columnRowCount = [];

            var leftCanvas = generate_grid_canvas(leftStage, false, default_color, colors, triangleBase, triangleHeight, columns, rows, randomKeys);
            var rightCanvas = generate_grid_canvas(rightStage, true, default_color, colors, triangleBase, triangleHeight, columns, rows, randomKeys);

            document.getElementById('reset').onclick = function() {
                // Clear right stage and recreate
                rightCanvas.clear();
                rightCanvas = generate_grid_canvas(rightStage, true, default_color, colors, triangleBase, triangleHeight, columns, rows, randomKeys);
            };

            document.getElementById('compare').onclick = function() {
                var leftRandomKeysList = getRandomKeysList(leftCanvas);
                var left_distances = generateValues(leftRandomKeysList['randomKeys'], leftCanvas, leftRandomKeysList['firstKey'], leftRandomKeysList['lastKey']);

                var rightRandomKeysList = getRandomKeysList(rightCanvas);
                var right_distances = generateValues(rightRandomKeysList['randomKeys'], rightCanvas, rightRandomKeysList['firstKey'], rightRandomKeysList['lastKey']);
                var returnValue = false;

                // If the first key color matches with both the grids then perform validations for other triangles
                if(leftCanvas[leftRandomKeysList['firstKey']].getFill() === rightCanvas[rightRandomKeysList['firstKey']].getFill()) {
                    returnValue = compareValues(left_distances, right_distances);
                }

                alert((returnValue) ? 'Grids Matched' : 'Grids did not match');
                return true;
            };
        </script>
    </body>

</html>
