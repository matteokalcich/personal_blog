<?php
session_start();




if(isset($_GET['user'])){

    

    $_SESSION['user'] = $_GET['user'];
}




?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/index.css">
    <link rel="stylesheet" href="styles/font.css">
    <link rel="stylesheet" href="styles/link.css">
    <link rel="stylesheet" href="styles/backoffice.css">
    <title>Blog Editor</title>

</head>

<body>

    <div class="paginaIntera">

        <!-- Intestazione del blog -->
        <div class="introBlog">
            <div class="primaParte">
                <img id="logo" src="./assets/images/react_logo.png" alt="React logo">
                <div class="titolo">
                    <h1>Blog Personale Matteo Kalcich</h1>
                </div>
            </div>

            <div class="welcome">
                <h2>Benvenuto <?php echo $_SESSION['user']; ?>, sei pronto a modificare il blog?</h2>
                <a href="./index.php"><button id="logoutBtn" name="logout" type="button">Logout</button></a>

            </div>

            <div class="introduzioneMioBlog">
                <a href="./nuovoPost.php"><button type="button"><p>AGGIUNGI NUOVO POST</p></button></a>
            </div>
        </div>

        <!-- Contenuto centrale della pagina -->
        <div class="centroPagina">

            <div class="ricerca">
                <p id="ricerca" >RICERCA</p>
                <input type="text" name="parolaDaCercare" id="parolaDaCercare">
                <button type="button" name="cerca" id="cercaBtn">CERCA</button>
            </div>

            <div class="filtraAnno">
                
                <button class="allDivFiltraAnno firstLastBtn"><p>PRIMO</p><p><<</p></button>
                
                <button class="allDivFiltraAnno afterFirstBeforeLastBtn"><p>Precedente</p><p>< <?php echo 'es: 2020';?></p></button>
                
                <div class="allDivFiltraAnno annoCorrente">

                    <p><?php echo 'ANNO SCELTO: es: 2021';?></p>

                </div>
                
                <button class="allDivFiltraAnno afterFirstBeforeLastBtn"><p>Successivo</p><p><?php echo 'es: 2022';?> ></p></button>
                
                <button class="allDivFiltraAnno firstLastBtn"><p>ULTIMO</p><p>>></p></button>


            </div>

            <a href=""></a>

            <div class="post">
                <?php
                
                $c = mysqli_connect('localhost', 'root', '', 'blog_kalcich') or die('Errore di connessione');

                $s = 'SELECT * FROM tPost';

                $r = mysqli_query($c,$s);

                $n = mysqli_num_rows($r);

                while($a=mysqli_fetch_array($r)) {

                    echo '<div class="postDB">';
                    echo '<div class="postDBleft">';
                    
                    echo '<div class="headerPostDB">';
                    echo '<p>'.$a['dataCreazione'].'</p><h3>'.$a['titoloPost'].'</h3>';
                    echo '</div>';
                    echo '<div class="corpoPostDB">';
                    echo '<a href="dettagliPost.php?idPostVisualizzare='.$a['idPost'].'"><img class="immaginePostDB" src="'.$a['pathFotoPost'].'" alt="Immagine Post">';
                    echo '<p>'.$a['descrizionePost'].'</p>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="postDBright">';
                    echo '<a href="./modificaPost.php?idPostModificare='.$a['idPost'].'"><button type="button"><p>MODIFICA O ELIMINA</p></button></a>';
                    echo '</div>';
                    echo '</div>';

                }
                ?>

            </div>

        </div>

        <footer>

            <p>Si ecco che adesso è in basso</p>

        </footer>

        
    </div>

    

</body>
</html>
