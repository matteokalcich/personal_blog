<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="" method="post" enctype="multipart/form-data">

        <input type="file" name="file">
        <input type="submit" name="Invia" value="Invia">
    </form>
    <?php


        if(isset($_POST['Invia'])){

            print_r($_FILES);

            if(move_uploaded_file($_FILES['file']['tmp_name'], "assets/images/".$_FILES['file']['name'])){

                echo '<h1>Trasferito</h1>';
            }
        }


    ?>
</body>
</html>