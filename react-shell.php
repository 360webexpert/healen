<?php
/**
 * React application shell.
 *
 * @package HealenDesign
 */

if (!defined('ABSPATH')) {
    exit;
}
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class('healen-react-body'); ?>>
<?php wp_body_open(); ?>
<div id="root"></div>
<?php wp_footer(); ?>
</body>
</html>
