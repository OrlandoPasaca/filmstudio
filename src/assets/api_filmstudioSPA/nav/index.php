<?php
header("Access-Control-Allow-Origin:*");
if(isset($_GET["dato"]))
{
$conexion=new PDO("mysql:host=localhost;dbname=hiddenso_filmstudioSPA","hiddenso_opr97","949336111Or");
$conexion->exec("SET CHARACTER SET UTF8");
$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$consulta="SELECT id_tmdb,nombre_pelicula,categoria from peliculas WHERE nombre_pelicula like :dato limit 10";
$respuesta=$conexion->prepare($consulta);
$respuesta->bindValue(":dato","%".$_GET["dato"]."%");
$respuesta->execute();
$peliculas=[];
while($fila=$respuesta->fetch(PDO::FETCH_ASSOC))
{
    $pelicula=new stdClass();
    $pelicula->id_tmdb=$fila["id_tmdb"];
    $pelicula->nombre_pelicula=$fila["nombre_pelicula"];
    $pelicula->categoria=$fila["categoria"];
    array_push($peliculas,$pelicula);
}
echo json_encode($peliculas);
}

?>