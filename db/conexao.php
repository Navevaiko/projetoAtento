<?php
    function conectar() {
        $con = mysqli_connect("localhost", "root", "", "atento");

        return $con;
    }
?>