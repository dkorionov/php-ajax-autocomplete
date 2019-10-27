<?php


class View
{

    function makeHead()
    {
        include(__DIR__ . "/templates/base_header.html");
    }

    function makeForm() {
        include(__DIR__."/templates/base_form.html");
    }

    function makeFooter() {
        include(__DIR__."/templates/base_footer.html");
    }

}