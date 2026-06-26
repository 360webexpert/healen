<?php
/**
 * Theme footer.
 *
 * @package HealenDesign
 */

$defaults = healen_defaults();
$phone = healen_option('healen_phone', $defaults['phone']);
$email = healen_option('healen_email', $defaults['email']);
$address = healen_option('healen_address', $defaults['address']);
$footer_text = healen_option('healen_footer_text', $defaults['footer_text']);
$booking = healen_option('healen_booking_link', ['url' => $defaults['booking_url'], 'title' => 'Book Appointment']);
$logo = healen_image_value(healen_option('healen_logo_light'), 'logo-white-orig.png');
?>
</main>
<footer class="site-footer">
    <div class="footer-pattern"></div>
    <div class="container footer-grid">
        <div>
            <img class="footer-logo" src="<?php echo esc_url($logo); ?>" alt="<?php bloginfo('name'); ?>">
            <p><?php echo esc_html($footer_text); ?></p>
        </div>
        <div>
            <h3>Quick Links</h3>
            <?php
            if (has_nav_menu('footer')) {
                wp_nav_menu([
                    'theme_location' => 'footer',
                    'container' => false,
                    'menu_class' => 'footer-menu',
                    'depth' => 1,
                    'fallback_cb' => false,
                ]);
            } else {
                echo '<ul class="footer-menu">';
                foreach (healen_default_menu_items() as $item) {
                    printf('<li><a href="%s">%s</a></li>', esc_url($item['url']), esc_html($item['label']));
                }
                echo '</ul>';
            }
            ?>
        </div>
        <div>
            <h3>Patient Resources</h3>
            <ul class="footer-menu">
                <li><a href="<?php echo esc_url(home_url('/new-patient/')); ?>">New Patient Info</a></li>
                <li><a href="<?php echo esc_url(healen_link_url($booking, $defaults['booking_url'])); ?>">Book Appointment</a></li>
                <li><a href="<?php echo esc_url(home_url('/new-patient/')); ?>">Insurance Info</a></li>
                <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">Contact Us</a></li>
            </ul>
        </div>
        <div>
            <h3>Contact Us</h3>
            <ul class="footer-contact">
                <li><a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a></li>
                <li><a href="<?php echo esc_url(healen_phone_href($phone)); ?>"><?php echo esc_html($phone); ?></a></li>
                <li><?php echo nl2br(esc_html($address)); ?></li>
            </ul>
        </div>
    </div>
    <div class="container footer-bottom">
        <p>&copy; <?php echo esc_html(date_i18n('Y')); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
    </div>
</footer>

<div class="mobile-cta">
    <?php healen_render_button($booking, 'Book Appointment', 'mobile-cta-book', $defaults['booking_url']); ?>
    <a class="mobile-cta-call" href="<?php echo esc_url(healen_phone_href($phone)); ?>">Call Now</a>
</div>
<?php wp_footer(); ?>
</body>
</html>
