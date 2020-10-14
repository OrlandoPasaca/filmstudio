<?php
header("Access-Control-Allow-Origin:*");
if(isset($_GET["pos"]) && isset($_GET["tipo"]))
{
$conexion=new PDO("mysql:host=localhost;dbname=hiddenso_filmstudioSPA","hiddenso_opr97","949336111Or");
$conexion->exec("SET CHARACTER SET UTF8");
$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
if($_GET["tipo"]=="nuevos_capitulos")
{
    $consulta="SELECT peliculas.id_tmdb,peliculas.nombre_pelicula,peliculas.categoria,temporadas.numero_temporada,
                capitulos.numero_capitulo, capitulos.fecha_estreno from capitulos 
                inner join temporadas on capitulos.id_temporada=temporadas.id 
                inner join peliculas on temporadas.id_pelicula=peliculas.id
                WHERE peliculas.categoria='serie' 
                order by capitulos.fecha_estreno DESC,capitulos.numero_capitulo DESC limit :pos,1";
}
elseif($_GET["tipo"]=="estrenos")
{
    $consulta="SELECT peliculas.id_tmdb,peliculas.nombre_pelicula,peliculas.categoria,temporadas.numero_temporada, 
           capitulos.numero_capitulo, peliculas.fecha_estreno from capitulos 
           RIGHT join temporadas on capitulos.id_temporada=temporadas.id 
           RIGHT join peliculas on temporadas.id_pelicula=peliculas.id 
           WHERE peliculas.categoria='pelicula' 
           order by peliculas.fecha_estreno DESC limit :pos,1";
}

elseif($_GET["tipo"]=="recien_agregadas")
{
    $consulta="SELECT * from 
              (select peliculas.id_tmdb,peliculas.nombre_pelicula,peliculas.categoria,temporadas.numero_temporada, 
              capitulos.numero_capitulo,peliculas.fecha_agregada from peliculas 
              LEFT JOIN temporadas on peliculas.id=temporadas.id_pelicula 
              LEFT JOIN capitulos on temporadas.id=capitulos.id_temporada WHERE peliculas.categoria='pelicula' 
              UNION ALL 
              select peliculas.id_tmdb,peliculas.nombre_pelicula,peliculas.categoria,temporadas.numero_temporada, 
              capitulos.numero_capitulo,peliculas.fecha_agregada from peliculas 
              LEFT JOIN temporadas on peliculas.id=temporadas.id_pelicula 
              LEFT JOIN capitulos on temporadas.id=capitulos.id_temporada 
              WHERE peliculas.categoria='serie' 
              ORDER BY fecha_agregada DESC, numero_temporada DESC)t 
              GROUP by nombre_pelicula order by fecha_agregada DESC
              limit :pos,1";
}
elseif($_GET["tipo"]=="recien_agregadas_movies")
{
    $consulta="SELECT peliculas.id_tmdb,peliculas.nombre_pelicula,peliculas.categoria,temporadas.numero_temporada, 
              capitulos.numero_capitulo,peliculas.fecha_agregada from peliculas 
              LEFT JOIN temporadas on peliculas.id=temporadas.id_pelicula 
              LEFT JOIN capitulos on temporadas.id=capitulos.id_temporada WHERE peliculas.categoria='pelicula'  
              order by fecha_agregada DESC
              limit :pos,1";
}
elseif($_GET["tipo"]=="recien_agregadas_series")
{
    $consulta="SELECT * from 
              (select peliculas.id_tmdb,peliculas.nombre_pelicula,peliculas.categoria,temporadas.numero_temporada, 
              capitulos.numero_capitulo,peliculas.fecha_agregada from peliculas 
              LEFT JOIN temporadas on peliculas.id=temporadas.id_pelicula 
              LEFT JOIN capitulos on temporadas.id=capitulos.id_temporada 
              WHERE peliculas.categoria='serie' 
              ORDER BY fecha_agregada DESC, numero_temporada DESC)t 
              GROUP by nombre_pelicula order by fecha_agregada DESC
              limit :pos,1";
}
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
}
?>