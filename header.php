<?php
/**
 * Theme header.
 *
 * @package HealenDesign
 */

$defaults = healen_defaults();
$phone = healen_option('healen_phone', $defaults['phone']);
$booking = healen_option('healen_booking_link', ['url' => $defaults['booking_url'], 'title' => 'Book Appointment']);
$portal = healen_option('healen_portal_link', ['url' => $defaults['portal_url'], 'title' => 'Patient Portal']);
$logo = healen_image_value(healen_option('healen_logo_light'), 'logo-white-orig.png');
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class('healen-body'); ?>>
<?php wp_body_open(); ?>
<header class="site-header" data-healen-header>
    <div class="container nav-wrap">
        <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php bloginfo('name'); ?>">
            <img src="<?php echo esc_url($logo); ?>" alt="<?php bloginfo('name'); ?>">
        </a>

        <nav class="primary-nav" aria-label="<?php esc_attr_e('Primary menu', 'healen-design'); ?>">
            <?php
            if (has_nav_menu('primary')) {
                wp_nav_menu([
                    'theme_location' => 'primary',
                    'container' => false,
                    'menu_class' => 'menu-list',
                    'depth' => 2,
                    'fallback_cb' => false,
                ]);
            } else {
                echo '<ul class="menu-list">';
                foreach (healen_default_menu_items() as $item) {
                    printf('<li><a href="%s">%s</a></li>', esc_url($item['url']), esc_html($item['label']));
                }
                echo '</ul>';
            }
            ?>
        </nav>

        <div class="nav-actions">
            <?php healen_render_button($portal, 'Patient Portal', 'btn btn-outline-light', '#'); ?>
            <?php healen_render_button($booking, 'Book Appointment', 'btn btn-accent', $defaults['booking_url']); ?>
        </div>

        <button class="mobile-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-mobile-toggle>
            <span></span><span></span><span></span>
        </button>
    </div>

    <nav id="mobile-menu" class="mobile-menu" aria-label="<?php esc_attr_e('Mobile menu', 'healen-design'); ?>" data-mobile-menu>
        <?php
        if (has_nav_menu('primary')) {
            wp_nav_menu([
                'theme_location' => 'primary',
                'container' => false,
                'menu_class' => 'mobile-menu-list',
                'depth' => 1,
                'fallback_cb' => false,
            ]);
        } else {
            echo '<ul class="mobile-menu-list">';
            foreach (healen_default_menu_items() as $item) {
                printf('<li><a href="%s">%s</a></li>', esc_url($item['url']), esc_html($item['label']));
            }
            echo '</ul>';
        }
        healen_render_button($booking, 'Book Appointment', 'btn btn-accent mobile-booking', $defaults['booking_url']);
        ?>
    </nav>
</header>
<main id="main" class="site-main">
