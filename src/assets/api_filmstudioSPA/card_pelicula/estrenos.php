<?php
header("Access-Control-Allow-Origin:*");

$conexion=new PDO("mysql:host=localhost;dbname=hiddenso_filmstudioSPA","hiddenso_opr97","949336111Or");
$conexion->exec("SET CHARACTER SET UTF8");
$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$consulta="SELECT peliculas.id_tmdb,peliculas.nombre_pelicula,peliculas.categoria,temporadas.numero_temporada, 
           capitulos.numero_capitulo, peliculas.fecha_estreno from capitulos 
           RIGHT join temporadas on capitulos.id_temporada=temporadas.id 
           RIGHT join peliculas on temporadas.id_pelicula=peliculas.id 
           WHERE peliculas.categoria='pelicula' 
           order by peliculas.fecha_estreno DESC limit :pos,1";
$res=$conexion->prepare($consulta);
$res->bindValue(":pos",$_GET["pos"],PDO::PARAM_INT);
$res->execute();
$fila=$res->fetch(PDO::FETCH_ASSOC);
$pelicula=new ArrayObject();
$pelicula->offsetSet('id_tmdb',$fila["id_tmdb"]);
$pelicula->offsetSet('nombre_pelicula',$fila["nombre_pelicula"]);
$pelicula->offsetSet('categoria',$fila["categoria"]);
$pelicula->offsetSet('numero_temporada',$fila["numero_temporada"]);
$pelicula->offsetSet('numero_capitulo',$fila["numero_capitulo"]);
$pelicula->offsetSet('fecha_estreno',$fila["fecha_estreno"]);
echo json_encode($pelicula);
?>