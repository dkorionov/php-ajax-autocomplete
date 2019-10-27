<?php


class Connect
{
    private $login;
    private $password;

    function __construct()
    {
        $this->login = "root";
        $this->password = "010498dk";

    }

    public function getLogin()
    {
        return $this->login;
    }

    public function getPassword()
    {
        return $this->password;
    }

}