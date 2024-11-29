<?php
session_start();


if(isset($_POST['invia'])){

    $c = mysqli_connect('localhost', 'root', '', 'blog_kalcich') or die('Errore di connessione');

                $s = 'SELECT * FROM tUtente';

                $r = mysqli_query($c,$s);

                $n = mysqli_num_rows($r);

                if($n == 0){


                    return;
                }

                while($a=mysqli_fetch_array($r)) {

                    if($_POST['username'] != '' && $_POST['password'] != ''){

                        if($_POST['username'] == $a['userName'] && $_POST['password'] == $a['passw']){
                
                            header("Location: index.php"); 
                            exit;
                        }
                    }
                }
}



?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="styles/index.css">
    <link rel="stylesheet" href="styles/login.css">
</head>
<body>
    
    <div class="primaParte">
                <img id="logo" src="./assets/images/react_logo.png" alt="React logo">
                <div class="titolo">
                    <h1>Blog Personale Matteo Kalcich</h1>
                </div>
    </div>

    <div class="welcome">
        
        <h5>Ciao, per accedere alle funzionalità avanzate effettua il login</h5>
      
    </div>


    <form action="" method="post">

        <input type="text" name="username" placeholder="username" val="">

        <input type="password" name="password" placeholder="password" val="">

        <input type="text" name="valore" val="">

        <button name="invia" type="submit">Login</button>

    </form>
</body>
</html>