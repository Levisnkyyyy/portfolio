<?php

$name = '';
$email = '';
$text ='';
if(isset($_POST['name']))
{
    $name = $_POST['name'];
}
if(isset($_POST['email']))
{
    $email = $_POST['email'];
}
if(isset($_POST['text']))
{
    $text = $_POST['text'];
}
$xml=simplexml_load_file("contacts.xml");

if($name != '' || $email != '' || $text != '')
{
    $newmsg = $xml->addChild('msg');
    $newmsg->addChild('name', $name);
    $newmsg->addChild('email', $email);
    $newmsg->addChild('text', $text);
    $newmsg->addChild('datetime', date('d-m-y H:i:s'));
    $xml->asXML("contacts.xml");
    echo 'Thank you!';
} else {
    die("OOPS :(");
}

?>