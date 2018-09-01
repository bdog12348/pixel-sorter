<?php
    session_start();

    $filename = $_FILES['file']['name'];
    $selected_val = $_POST['sortingType'];
    $times = $_POST['ammountPerFrame'];

    $location = "upload/".$filename;
    $uploadOk = 1;
    $imageFileType = pathinfo($location, PATHINFO_EXTENSION);

    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif"){
        $uploadOk = 0;
    }

    if($uploadOk == 0){
        echo 0;
    }else{
        if(move_uploaded_file($_FILES['file']['tmp_name'], $location)){
            $_SESSION['location'] = $location;
            $_SESSION['type'] = $selected_val;
            $_SESSION['times'] = $times;
            echo $selected_val;
        }else{
            echo 0;
        }
    }