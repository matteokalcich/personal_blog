<?php

if(isset($_GET['idPostVisualizzare'])){

    $c = mysqli_connect('localhost', 'root', '', 'blog_kalcich') or die('Errore di connessione');

    $s = 'SELECT * FROM tPost WHERE idPost='.$_GET['idPostVisualizzare'];

    $r = mysqli_query($c,$s);

    $a = mysqli_fetch_array($r);

    $titoloPost = $a['titoloPost'];
    $dataCreazione = $a['dataCreazione'];
    $pathFotoPost = $a['pathFotoPost'];
    $descrizionePost = $a['descrizionePost'];

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dettagli Post</title>
    <link rel="stylesheet" href="styles/index.css">
    <link rel="stylesheet" href="styles/link.css">
    <link rel="stylesheet" href="styles/dettagliPost.css">
</head>
<body>

    <div class="paginaIntera">

        <div class="primaParte">
                    <img id="logo" src="./assets/images/react_logo.png" alt="React logo">
                    <div class="titolo">
                        <h1>Blog Personale Matteo Kalcich</h1>
                    </div>
        </div>

        <div class="secondaParte">

            <div class="secondaParte_superiore">

                <a href="./index.php"><button id="secondaParteBtn" type="button">Torna alla pagina principale</button></a>

                <?php 


                echo '<h3>'.$titoloPost.'</h3>';
                echo '<p>'.$dataCreazione.'</p>';
                echo '<a href="./login.php"><button id="loginBtn" name="login" type="button">Login</button></a>';

                ?>


            </div>

            <div class="secondaParte_centrale">

                <div class="secondaParte_div1"></div>

                <div class="secondaParte_immagine">


                    <?php

                    echo '<img class="immagineDettagliPostDB" src="'.$pathFotoPost.'" alt="Immagine Post">';

                    echo '<p>'.$descrizionePost.'</p>';

                    ?>

                </div>

                <div class="secondaParte_div3"></div>

                
            </div>

            

        </div>
    </div>
    

    


</body>
</html>