<?php
/**
 * One-time theme setup helpers.
 *
 * @package HealenDesign
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('after_switch_theme', 'healen_after_switch_theme');
function healen_after_switch_theme(): void
{
    healen_create_default_pages();
    healen_create_default_menus();
}

function healen_create_default_pages(): void
{
    $pages = [
        'home'        => 'Home',
        'about'       => 'About Us',
        'services'    => 'Services',
        'new-patient' => 'New Patient',
        'contact'     => 'Contact',
    ];

    foreach ($pages as $slug => $title) {
        $existing = get_page_by_path($slug);
        if ($existing instanceof WP_Post) {
            continue;
        }

        wp_insert_post([
            'post_type'    => 'page',
            'post_status'  => 'publish',
            'post_title'   => $title,
            'post_name'    => $slug,
            'post_content' => '',
        ]);
    }

    $home = get_page_by_path('home');
    if ($home instanceof WP_Post) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $home->ID);
    }
}

function healen_create_default_menus(): void
{
    $menu_name = 'Healen Primary';
    $menu = wp_get_nav_menu_object($menu_name);

    if (!$menu) {
        $menu_id = wp_create_nav_menu($menu_name);
        foreach (healen_default_menu_items() as $item) {
            wp_update_nav_menu_item($menu_id, 0, [
                'menu-item-title'  => $item['label'],
                'menu-item-url'    => $item['url'],
                'menu-item-status' => 'publish',
            ]);
        }
    } else {
        $menu_id = (int) $menu->term_id;
    }

    $locations = get_theme_mod('nav_menu_locations', []);
    $locations['primary'] = $menu_id;
    $locations['footer'] = $menu_id;
    set_theme_mod('nav_menu_locations', $locations);
}
