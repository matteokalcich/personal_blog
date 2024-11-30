<?php

if (isset($_GET['idPostModificare'])) {

    if (isset($_POST['modificaPost'])) {
        $targetDir = "assets/images/";
        $targetFile = $targetDir . basename($_FILES['immaginePostToInsert']['name']);
        $fileUploaded = false;

        if (!empty($_FILES['immaginePostToInsert']['name']) && move_uploaded_file($_FILES['immaginePostToInsert']['tmp_name'], $targetFile)) {
            $fileUploaded = true;
        }

        $c = mysqli_connect('localhost', 'root', '', 'blog_kalcich') or die('Errore di connessione');

        $updateFields = [];

        if (!empty($_POST['titoloPostToInsert'])) {
            $updateFields[] = 'titoloPost="' . $_POST['titoloPostToInsert'] . '"';
        }
        if (!empty($_POST['descrizionePostToInsert'])) {
            $updateFields[] = 'descrizionePost="' . $_POST['descrizionePostToInsert'] . '"';
        }
        if ($fileUploaded) {
            $updateFields[] = 'pathFotoPost="' . $targetFile . '"';
        }

        if (!empty($updateFields)) {
            $s = 'UPDATE tPost SET ' . implode(', ', $updateFields) . ' WHERE idPost=' . $_GET['idPostModificare'] . ';';

            if (mysqli_query($c, $s)) {
                echo '<h1 style="color: green;">Post modificato con successo!</h1>';
            } else {
                echo '<h1 style="color: red;">Errore nella modifica del post</h1>';
            }
        } else {
            echo '<h1 style="color: orange;">Nessun campo è stato modificato.</h1>';
        }

        mysqli_close($c);


    } else if(isset($_POST['eliminaPost'])){

        $c = mysqli_connect('localhost', 'root', '', 'blog_kalcich') or die('Errore di connessione');

        $s = 'DELETE FROM tPost WHERE idPost='.$_GET['idPostModificare'];

        mysqli_query($c, $s);

    } else if(isset($_POST['Annulla'])){

        header('Location: backoffice.php');
    }
}


?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifica Post</title>
    <link rel="stylesheet" href="styles/index.css">
    <link rel="stylesheet" href="styles/font.css">
    <link rel="stylesheet" href="styles/link.css">
    <link rel="stylesheet" href="styles/nuovoPost.css">
</head>
<body>

    <div class="paginaIntera">

        <div class="introBlog">

            <div class="primaParte">
                <img id="logo" src="./assets/images/react_logo.png" alt="React logo">
                <div class="titolo">
                    <h1>Blog Personale Matteo Kalcich</h1>
                </div>
            </div>

            <div class="welcome">
                <h2>Benvenuto, sei pronto a modificare il post?</h2>
                <a href="./index.php"><button id="logoutBtn" name="logout" type="button">Logout</button></a>

            </div>

        </div>

        <form method="post" enctype="multipart/form-data">
            <input type="text" name="titoloPostToInsert" placeholder="Titolo">
            <textarea name="descrizionePostToInsert" placeholder="Descrizione"></textarea>
            <input type="file" name="immaginePostToInsert">
            <button type="submit" name="Annulla">Annulla Modifiche</button>
            <button type="submit" name="modificaPost">Modifica Post</button>
            <button type="submit" name="eliminaPost">Elimina Post</button>
        </form>


    </div>
    
    


</body>
</html>