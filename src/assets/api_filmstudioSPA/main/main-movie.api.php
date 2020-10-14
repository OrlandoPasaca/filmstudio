<?php
header("Access-Control-Allow-Origin:*");
if(isset($_GET["pos"]))
{
$conexion=new PDO("mysql:host=localhost;dbname=hiddenso_filmstudioSPA","hiddenso_opr97","949336111Or");
$conexion->exec("SET CHARACTER SET UTF8");
$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

$consulta="SELECT * from 
          (
                  SELECT peliculas.id_tmdb,peliculas.nombre_pelicula,peliculas.categoria,
                  temporadas.numero_temporada,capitulos.numero_capitulo,peliculas.fecha_estreno from capitulos 
                  RIGHT join temporadas on capitulos.id_temporada=temporadas.id 
                  RIGHT join peliculas on peliculas.id=temporadas.id_pelicula 
                  where peliculas.categoria='pelicula' 
                  order by numero_temporada desc,numero_capitulo desc
           )t 
           GROUP BY nombre_pelicula,numero_temporada order by fecha_estreno DESC
           limit :pos,1";

$res=$conexion->prepare($consulta);
$res->bindValue(":pos",$_GET["pos"],PDO::PARAM_INT);
$res->execute();
$peliculas=new ArrayObject();
while($fila=$res->fetch(PDO::FETCH_ASSOC))
{
    $pelicula=new stdClass();
    $pelicula->id_tmdb=$fila["id_tmdb"];
    $pelicula->nombre_pelicula=$fila["nombre_pelicula"];
    $pelicula->categoria=$fila["categoria"];
    $pelicula->numero_temporada=$fila["numero_temporada"];
    $pelicula->numero_capitulo=$fila["numero_capitulo"];
    $peliculas->append($pelicula);
}
echo json_encode($peliculas);

}
?>