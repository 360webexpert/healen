<?php
/**
 * Shared page hero.
 *
 * @package HealenDesign
 */

$title = $args['title'] ?? get_the_title();
$subtitle = $args['subtitle'] ?? '';
$breadcrumb = $args['breadcrumb'] ?? get_the_title();
?>
<section class="page-hero" style="background-image:url('<?php echo esc_url(healen_image('hero-bg.jpg')); ?>')">
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content">
        <div class="breadcrumb">
            <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
            <span>/</span>
            <span><?php echo esc_html($breadcrumb); ?></span>
        </div>
        <h1><?php echo esc_html($title); ?></h1>
        <?php if ($subtitle) : ?>
            <p><?php echo esc_html($subtitle); ?></p>
        <?php endif; ?>
    </div>
</section>
