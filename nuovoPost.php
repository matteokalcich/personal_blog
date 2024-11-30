<?php
if (isset($_POST['Invia'])) {
    if (isset($_POST['titoloPostToInsert']) && isset($_POST['descrizionePostToInsert']) && isset($_FILES['immaginePostToInsert'])) {
        $targetDir = "assets/images/";
        $targetFile = $targetDir . basename($_FILES['immaginePostToInsert']['name']);
        
        if (move_uploaded_file($_FILES['immaginePostToInsert']['tmp_name'], $targetFile)) {

            $c = mysqli_connect('localhost', 'root', '', 'blog_kalcich') or die('Errore di connessione: ' . mysqli_connect_error());


            $s = 'INSERT INTO tPost (titoloPost, descrizionePost, dataCreazione, pathFotoPost) 
                  VALUES ("' . $_POST['titoloPostToInsert'] . '", "' . $_POST['descrizionePostToInsert'] . '", NOW(), "' . $targetFile . '");';


            if (mysqli_query($c, $s)) {
                echo '<h1 style="color: green;">Post inserito con successo!</h1>';
            } else {
                echo '<h1 style="color: red;">Errore nell\'inserimento del post: ' . mysqli_error($c) . '</h1>';
            }


            mysqli_close($c);
        } else {
            echo '<h1 style="color: red;">Impossibile trasferire il file</h1>';
        }
    } else {
        echo '<h1 style="color: red;">Dati mancanti!</h1>';
    }
}

if(isset($_POST['Annulla'])){

    header('Location: backoffice.php');
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuovo Post</title>
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
                <h2>Benvenuto, sei pronto a creare un nuovo post?</h2>
                <a href="./index.php"><button id="logoutBtn" name="logout" type="button">Logout</button></a>

            </div>

        </div>

        <form method="post" enctype="multipart/form-data">
            <input type="text" name="titoloPostToInsert" placeholder="Titolo" required>
            <textarea name="descrizionePostToInsert" placeholder="Descrizione" required></textarea>
            <input type="file" name="immaginePostToInsert" required>
            <button type="submit" name="Invia">Inserisci POST</button>
            <button type="submit" name="Annulla">Annulla Inserimento</button>
        </form>


    </div>
    
    


</body>
</html>