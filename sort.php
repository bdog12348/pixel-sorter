<?php 
    session_start();
    $session_value = (isset($_SESSION['location']))?$_SESSION['location']:''; 
    $session_value2 = (isset($_SESSION['type']))?$_SESSION['type']:''; 
    $session_value3 = (isset($_SESSION['times']))?$_SESSION['times']:1;
?>

<html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.1/p5.js"></script>
        <script src="sorting.js"></script>
        <link rel="stylesheet" type="text/css" href="style.css">
        <title>Sorted</title>
    </head>
    <body>
        <input type="hidden" id="session_val" style="display:none" value="<?php echo $session_value; ?>"/>
        <input type="hidden" id="session_val2" style="display:none" value="<?php echo $session_value2; ?>"/>
        <input type="hidden" id="session_val3" style="display:none" value="<?php echo $session_value3; ?>"/>
    </body>
</html>