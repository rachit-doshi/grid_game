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
        $randomColors = array(258 => 'blue', 228 => 'red', 41 => 'blue', 67 => 'orange', 260 => 'darkblue', 232 => 'yellow', 47 => 'black', 75 => 'black', 
                              73 => 'blue', 71 => 'gray', 69 => 'black', 40 => 'darkgreen', 227 => 'purple', 42 => 'lightgreen', 43 => 'darkblue', 44 => 'darkblue', 45 => 'darkblue', 
                              229 => 'orange', 230 => 'gray', 257 => 'gray', 259 => 'blue', 285 => 'purple', 231 => 'red', 46 => 'red', 286 => 'gray');
        
        ksort($randomColors);
        $lastKey = $firstKey = 0;
        
        foreach($randomColors as $key => $value) {
            $firstKey = $key;
            end($randomColors);
            $lastKey = $key;
        }
        // Donot remove this, as this is the eraser
        $randomColors[] = 'white';

        // Colors should be fetched from randomColors unique colors
        // $colors = array('red', 'yellow', 'blue', 'orange', 'purple', 'black');
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
        <script src="js/common_functions.js"></script>
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
            var leftTriangle = null, rightTriangle = null;

            generate_grid_canvas(leftStage, false, default_color, colors, triangleBase, triangleHeight, columns, rows, false, randomKeys);
            rightTriangle = generate_grid_canvas(rightStage, true, default_color, colors, triangleBase, triangleHeight, columns, rows, true, randomKeys);

            document.getElementById('reset').onclick = function() {
                // Clear right stage and recreate
                rightStage.clear();
                rightTriangle = generate_grid_canvas(rightStage, true, default_color, colors, triangleBase, triangleHeight, columns, rows, true, randomKeys);
            };

            document.getElementById('compare').onclick = function() {
                var count = rightTriangle.length;
                
                var key = 0;
                var matched = true;

                for (key in randomKeys) {
                    if (randomKeys[key] !== rightTriangle[key].getFill()) {
                        matched = false;
                        break;
                    }
                }

                if (matched) {
                    alert('Grids Matched.');
                } else {
                    alert('Grids Not Matching.');
                }
            };
            
            function compare() {
                
            }


        </script>
    </body>

</html>
