<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/index.css">
    <link rel="stylesheet" href="styles/font.css">
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
                <button id="loginBtn" type="button">Login</button>
                <!-- Nota: Per il login con PHP, puoi usare if(isset($_POST['loginBtn'])) per controllare l'invio del bottone -->
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

            <div class="ricerca">
                <p id="ricerca" >RICERCA</p>
                <input type="text" name="parolaDaCercare" id="parolaDaCercare">
                <button type="button" name="cerca" id="cercaBtn">CERCA</button>
            </div>

            <div class="filtraAnno">
                
                <button class="allDivFiltraAnno firstLastBtn"><p>PRIMO</p><p>>></p></button>
                
                <button class="allDivFiltraAnno afterFirstBeforeLastBtn"><p>Precedente</p><p>> <?php echo 'es: 2020';?></p></button>
                
                <div class="allDivFiltraAnno annoCorrente">

                    <p><?php echo 'ANNO SCELTO: es: 2021';?></p>

                </div>
                
                <button class="allDivFiltraAnno afterFirstBeforeLastBtn"><p>Successivo</p><p>> <?php echo 'es: 2022';?></p></button>
                
                <button class="allDivFiltraAnno firstLastBtn"><p>PRIMO</p><p>>></p></button>


            </div>

            <div class="post">
                <?php echo '<p>Query e visualizzazione con ciclo for tutti i post</p>';?>
            </div>

        </div>

        <footer>

            <p>Si ecco che adesso è in basso</p>

        </footer>

        
    </div>

    

</body>
</html>
