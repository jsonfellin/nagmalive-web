<?php 

include 'MailChimp.php';
//include 'ChromePhp.php';

$first_name = $_POST['firstName'];
$email = $_POST['email'];

//ChromePhp::log("Name:" . $first_name);

$MailChimp = new \Drewm\MailChimp('108b3ed0c5638e9004c1d88745a31008-us11');
$result = $MailChimp->call('lists/subscribe', array(
                'id'                => '9749ec34b5',
                'email'             => array('email'=>$email),
                'merge_vars'        => array('FNAME'=>$first_name),
                'double_optin'      => false,
                'update_existing'   => true,
                'send_welcome'      => false,
            ));
//ChromePhp::log($result);

?>