<?php
include(__DIR__ . "/Connect.php");


class Model

{
    private $link;
    private $connect;

    function __construct()
    {
        $this->connect = new Connect();
        $this->link = mysqli_connect(
            "localhost", $this->connect->getLogin(), $this->connect->getPassword(), 'houses'
        ) or die("Error connection to mysql");
        mysqli_set_charset($this->link, 'utf8');

    }

    function __destruct()
    {
        mysqli_close($this->link);

    }

    public function getAtm($city, $street = null)
    {
        if ($street != null) {
            $get = "https://api.privatbank.ua/p24api/infrastructure?json&atm&address=" . $street . "&city=" . $city;
        } else {
            $get = "https://api.privatbank.ua/p24api/infrastructure?json&atm&address=&city=" . $city;
        }
        $content = file_get_contents($get);
        $data = json_decode($content, true);
        return json_encode($data['devices'], JSON_UNESCAPED_UNICODE);

    }


    public function getData($table, $column, $value, $fid=NULL, $fidValue = NULL)
    {
        if ($fidValue)
            $query = "Select $column from $table where $column LIKE '%" . $value . "%' and `$fid` = '$fidValue'";
        else

            $query = "Select $column from $table where $column LIKE '%" . $value . "%'";

        $result = mysqli_query($this->link, $query);
        $response = array();
        while ($row = $result->fetch_assoc()) {
            $response[] = $row[$column];
        }
        return json_encode($response, JSON_UNESCAPED_UNICODE);
    }


    public function getId($id, $table, $column, $value)
    {
        $query = "Select $id from $table where $column = '$value'";
        $result = mysqli_query($this->link, $query);
        $response = $result->fetch_row();
        return $response[0];
    }



}