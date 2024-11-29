<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dettagli Post</title>
    <link rel="stylesheet" href="styles/index.css">
</head>
<body>
    

    <div class="primaParte">
                <img id="logo" src="./assets/images/react_logo.png" alt="React logo">
                <div class="titolo">
                    <h1>Blog Personale Matteo Kalcich</h1>
                </div>
    </div>

    <div class="secondaParte">

        <button id="secondaParteBtn" type="button"><a href="./index.php">Torna alla pagina principale</a></button>
        <h3><?php 
        
        if(isset($_GET['idPostVisualizzare'])){

            $c = mysqli_connect('localhost', 'root', '', 'blog_kalcich') or die('Errore di connessione');

            $s = 'SELECT * FROM tPost WHERE idPost='.$_GET['idPostVisualizzare'];

            $r = mysqli_query($c,$s);

            $n = mysqli_num_rows($r);

            while($a = mysqli_fetch_array($r)){

                echo '<div class="postDettagliato">';
            }
        }
        
        
        ?></h3>

    </div>
</body>
</html>