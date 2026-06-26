<?php
/**
 * ACF integration.
 *
 * @package HealenDesign
 */

if (!defined('ABSPATH')) {
    exit;
}

add_filter('acf/settings/save_json', 'healen_acf_save_json_path');
function healen_acf_save_json_path(string $path): string
{
    return HEALEN_DIR . '/acf-json';
}

add_filter('acf/settings/load_json', 'healen_acf_load_json_paths');
function healen_acf_load_json_paths(array $paths): array
{
    $paths[] = HEALEN_DIR . '/acf-json';

    return $paths;
}

add_action('acf/init', 'healen_register_acf_options_page');
function healen_register_acf_options_page(): void
{
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title' => 'Healen Theme Settings',
            'menu_title' => 'Healen Settings',
            'menu_slug'  => 'healen-settings',
            'capability' => 'edit_theme_options',
            'redirect'   => false,
        ]);
    }
}

add_filter('acf/load_fields', 'healen_order_service_detail_fields', 20, 2);
function healen_order_service_detail_fields(array $fields, array $parent): array
{
    if (($parent['key'] ?? '') !== 'group_healen_service_detail') {
        return $fields;
    }

    $order = [
        'field_healen_service_tab_hero',
        'field_healen_service_breadcrumb_home_label',
        'field_healen_service_breadcrumb_services_label',
        'field_healen_service_category',
        'field_healen_service_category_label',
        'field_healen_service_subtitle',
        'field_healen_service_intro',
        'field_healen_service_primary_button',
        'field_healen_service_phone',
        'field_healen_service_tab_seek',
        'field_healen_service_when_to_seek_heading',
        'field_healen_service_quick_facts',
        'field_healen_service_quick_note',
        'field_healen_service_tab_progress',
        'field_healen_service_progress_steps',
        'field_healen_service_tab_sections',
        'field_healen_service_sections',
        'field_healen_service_tab_sidebar',
        'field_healen_service_sidebar_heading',
        'field_healen_service_sidebar_text',
        'field_healen_service_sidebar_items',
        'field_healen_service_contact_heading',
        'field_healen_service_contact_button',
        'field_healen_service_tab_evaluation',
        'field_healen_service_seek_eyebrow',
        'field_healen_service_seek_heading',
        'field_healen_service_when_to_seek',
        'field_healen_service_tab_cta',
        'field_healen_service_cta_eyebrow',
        'field_healen_service_cta_heading',
        'field_healen_service_cta_text',
        'field_healen_service_cta_primary_button',
        'field_healen_service_cta_secondary_label',
        'field_healen_service_tab_related',
        'field_healen_service_related_eyebrow',
        'field_healen_service_related_heading',
        'field_healen_service_related_view_all_label',
        'field_healen_service_related_item_label',
        'field_healen_service_related_sleep_label',
        'field_healen_service_related_ent_label',
    ];
    $positions = array_flip($order);

    usort(
        $fields,
        static fn(array $left, array $right): int =>
            ($positions[$left['key']] ?? PHP_INT_MAX) <=> ($positions[$right['key']] ?? PHP_INT_MAX)
    );

    return $fields;
}
