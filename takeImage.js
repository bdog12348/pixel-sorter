$(document).ready(function (){
    $("#upload_butt").click(function() {
        var e = document.getElementById("sortingType");
        var strUser = e.options[e.selectedIndex].value;

        var numE = document.getElementById("times");
        var num = numE.value;

        var fd = new FormData();
        var files = $("#file")[0].files[0];
        fd.append('file', files);
        fd.append('sortingType', strUser);
        fd.append('ammountPerFrame', num);

        $.ajax({
            url: 'upload.php',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                if(response != 0){
                    window.location = 'sort.php';
                }else{
                    alert('file not uploaded');
                }
            }
        });
    });
});