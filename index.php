<?php

include(__DIR__ . "/View.php");
include(__DIR__ . "/Model.php");

$view = new View();
$model = new Model();


if(empty($_POST)) {
    $view->makeHead();
    $view->makeForm();
    $view->makeFooter();
}

if (isset($_POST['city']) &&  isset($_POST['street'])) {
    $city = strip_tags($_POST['city']);
    $street = strip_tags($_POST['street']);
    if($street == "Все місто")
        $street = null;
    else
        $street = explode(". ", $street)[1];
    $city = explode(". ", $city)[1];
    if($city == "Київ")
        $city  = "Киів";
    if($city == "Кропивницький")
        $city = "Кіровоград";
    echo $model->getAtm($city, $street);

}

if (isset($_POST['search'])) {
    $search = (int)$_POST['search'];
    $query = strip_tags($_POST['query']);
    $rid = NULL;
    $lid = NULL;
    switch ($search) {
        case 1:
            echo $model->getData('Region', 'region_name', $query);
            break;
        case 2:
            if ($_POST['answer'] != "")
                $rid = $model->getId("id_r", "Region", "region_name", $_POST['answer']);
            echo $model->getData('Locality', 'locality', $query, 'r_id', $rid);
            break;
        case 3:
            if ($_POST['answer'] != "")
                $lid = $model->getId("id_l", "Locality", "locality", $_POST['answer']);
            echo $model->getData('Address', 'street', $query, "l_id", $lid);
            break;
    }
}
