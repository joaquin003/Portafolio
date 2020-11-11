<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--informacion-->
    <title>Joaquin Uliambre</title>
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="site.webmanifest">
    <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#51c6de">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="theme-color" content="#ffffff">
    <meta name="author" content="Joaquin Uliambre Frutos">
    <meta name="description" content="Joaquin Uliambre es un programador web dispuesto a ayudarte a mejorar tu negocio o empresa">
    <meta name="keywords" content="pagina web paraguay,pagina web,joaquin uliambre,joaquin,pagina web negocio,uliambre">
    <meta property="og:url" content="">
    <meta property="og:image" content="img/logoJU.svg" >
    <!--css-->
    <link rel="stylesheet" href="css/style.css">

</head>
<body>
    <?php
        $modulo = $_REQUEST['m']??"";

        if($modulo==""){
            include_once "proyectos.php";
        }
    ?>
    <script src="https://kit.fontawesome.com/55c5a64615.js" crossorigin="anonymous"></script>
</body>
</html>