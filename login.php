<?php
session_start();

$_SESSION['pswAdmin'] = 'admin';
$_SESSION['userAdmin'] = 'admin';



if(isset($_POST['invia'])){

    if($_POST['username'] != '' && $_POST['password'] != ''){

        if($_POST['username'] == $_SESSION['userAdmin'] && $_POST['password'] == $_SESSION['pswAdmin']){

            header("Location: index.php"); 
            exit;
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

        <button name="invia" type="submit">Login</button>

    </form>
</body>
</html>