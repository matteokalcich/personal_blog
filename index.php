<?php
session_start();

if(!isset($_SESSION['annoScelto'])){

    $_SESSION['annoScelto'] = 2024;
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
    <title>Blog</title>

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
                <h2>Ciao, benvenuto nel mio blog personale, spero ti piaccia</h2>
                <a href="./login.php"><button id="loginBtn" name="login" type="button">Login</button></a>

            </div>

            <div class="introduzioneMioBlog">
                <p>
                    Ciao, benvenuto nel mio blog personale, mi presento: mi chiamo Matteo Kalcich, 
                    ho 18 anni e studio informatica. Una cosa che mi piace fare durante il tempo libero 
                    è programmare per conto mio approfondendo aspetti di mio interesse.
                </p>
            </div>
        </div>

        <!-- Contenuto centrale della pagina -->
        <div class="centroPagina">

            <form method="post" class="ricerca">
                <p id="ricerca">RICERCA</p>
                <input type="text" name="parolaDaCercare" id="parolaDaCercare">
                <button type="submit" name="cerca" id="cercaBtn">CERCA</button>
            </form>

            <form method="post" class="filtraAnno">
                
                <button type="submit" name="primoPost" class="allDivFiltraAnno firstLastBtn"><p>PRIMO</p><p><<</p></button>
                
                <button type="submit" name="precedenteAnnoPost" class="allDivFiltraAnno afterFirstBeforeLastBtn"><p>Precedente</p><p>< <?php echo $_SESSION['annoScelto']-1;?></p></button>
                
                <div class="allDivFiltraAnno annoCorrente">

                    <p><?php echo 'ANNO SCELTO: '.$_SESSION['annoScelto'];?></p>

                </div>
                
                <button type="submit" name="successivoAnnoPost" class="allDivFiltraAnno afterFirstBeforeLastBtn"><p>Successivo</p><p><?php echo $_SESSION['annoScelto']+1;?> ></p></button>
                
                <button type="submit" name="ultimoPost" class="allDivFiltraAnno firstLastBtn"><p>ULTIMO</p><p>>></p></button>


            </form>


            <div class="post">
                <?php

                if(isset($_POST['cerca'])){

                    $c = mysqli_connect('localhost', 'root', '', 'blog_kalcich') or die('Errore di connessione');

                    $s = 'SELECT * FROM tPost WHERE descrizionePost LIKE "%'.$_POST['parolaDaCercare'].'%" AND YEAR(dataCreazione) = ' . $_SESSION['annoScelto'] . ';';

                    $r = mysqli_query($c,$s);

                    $n = mysqli_num_rows($r);

                    if($n > 0){

                        while($a=mysqli_fetch_array($r)) {

                            echo '<div class="postDB">';
                            echo '<div class="headerPostDB">';
                            echo '<p>'.$a['dataCreazione'].'</p><h3>'.$a['titoloPost'].'</h3>';
                            echo '</div>';
                            echo '<div class="corpoPostDB">';
                            echo '<a href="dettagliPost.php?idPostVisualizzare='.$a['idPost'].'"><img class="immaginePostDB" src="'.$a['pathFotoPost'].'" alt="Immagine Post">';
                            echo '<p>'.$a['descrizionePost'].'</p>';
                            echo '</div>';
                            echo '</div>';
    
                        }

                    } else{

                        echo '<h1 style="color: red;">Nessun post contiene la stringa inserita</h1>';
                    }

                    

                    
                } else if(isset($_POST['precedenteAnnoPost'])){


                    $_SESSION['annoScelto'] = $_SESSION['annoScelto'] - 1;

                    $c = mysqli_connect('localhost', 'root', '', 'blog_kalcich') or die('Errore di connessione');

                    $s = 'SELECT * FROM tPost WHERE YEAR(dataCreazione) = ' . $_SESSION['annoScelto'] . ';';


                    $r = mysqli_query($c,$s);

                    $n = mysqli_num_rows($r);

                    if($n > 0){

                        while($a=mysqli_fetch_array($r)) {

                            echo '<div class="postDB">';
                            echo '<div class="headerPostDB">';
                            echo '<p>'.$a['dataCreazione'].'</p><h3>'.$a['titoloPost'].'</h3>';
                            echo '</div>';
                            echo '<div class="corpoPostDB">';
                            echo '<a href="dettagliPost.php?idPostVisualizzare='.$a['idPost'].'"><img class="immaginePostDB" src="'.$a['pathFotoPost'].'" alt="Immagine Post">';
                            echo '<p>'.$a['descrizionePost'].'</p>';
                            echo '</div>';
                            echo '</div>';
    
                        }

                    } else{

                        echo '<h1 style="color: red;">Nessun post contiene la stringa inserita</h1>';
                    }


                }

                else if(isset($_POST['successivoAnnoPost'])){


                    $_SESSION['annoScelto'] = $_SESSION['annoScelto'] + 1;

                    $c = mysqli_connect('localhost', 'root', '', 'blog_kalcich') or die('Errore di connessione');

                    $s = 'SELECT * FROM tPost WHERE YEAR(dataCreazione) = ' . $_SESSION['annoScelto'] . ';';


                    $r = mysqli_query($c,$s);

                    $n = mysqli_num_rows($r);

                    if($n > 0){

                        while($a=mysqli_fetch_array($r)) {

                            echo '<div class="postDB">';
                            echo '<div class="headerPostDB">';
                            echo '<p>'.$a['dataCreazione'].'</p><h3>'.$a['titoloPost'].'</h3>';
                            echo '</div>';
                            echo '<div class="corpoPostDB">';
                            echo '<a href="dettagliPost.php?idPostVisualizzare='.$a['idPost'].'"><img class="immaginePostDB" src="'.$a['pathFotoPost'].'" alt="Immagine Post">';
                            echo '<p>'.$a['descrizionePost'].'</p>';
                            echo '</div>';
                            echo '</div>';
    
                        }

                    } else{

                        echo '<h1 style="color: red;">Nessun post contiene la stringa inserita</h1>';
                    }
                
                }
                
                
                else{

                    $c = mysqli_connect('localhost', 'root', '', 'blog_kalcich') or die('Errore di connessione');

                    $s = 'SELECT * FROM tPost;';

                    $r = mysqli_query($c,$s);

                    $n = mysqli_num_rows($r);

                    while($a=mysqli_fetch_array($r)) {

                        echo '<div class="postDB">';
                        echo '<div class="headerPostDB">';
                        echo '<p>'.$a['dataCreazione'].'</p><h3>'.$a['titoloPost'].'</h3>';
                        echo '</div>';
                        echo '<div class="corpoPostDB">';
                        echo '<a href="dettagliPost.php?idPostVisualizzare='.$a['idPost'].'"><img class="immaginePostDB" src="'.$a['pathFotoPost'].'" alt="Immagine Post">';
                        echo '<p>'.$a['descrizionePost'].'</p>';
                        echo '</div>';
                        echo '</div>';

                    }
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
