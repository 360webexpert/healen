<?php
/**
 * Helper functions.
 *
 * @package HealenDesign
 */

if (!defined('ABSPATH')) {
    exit;
}

function healen_asset(string $path): string
{
    return HEALEN_URI . '/assets/' . ltrim($path, '/');
}

function healen_image(string $file): string
{
    return healen_asset('images/' . ltrim($file, '/'));
}

function healen_field(string $name, mixed $default = null, int|string|null $post_id = null): mixed
{
    if (function_exists('get_field')) {
        $value = get_field($name, $post_id ?: false);

        if ($value !== null && $value !== false && $value !== '') {
            return $value;
        }
    }

    return $default;
}

function healen_option(string $name, mixed $default = null): mixed
{
    return healen_field($name, $default, 'option');
}

function healen_link_url(mixed $link, string $default = '#'): string
{
    if (is_array($link) && !empty($link['url'])) {
        return (string) $link['url'];
    }

    if (is_string($link) && $link !== '') {
        return $link;
    }

    return $default;
}

function healen_link_title(mixed $link, string $default): string
{
    if (is_array($link) && !empty($link['title'])) {
        return healen_decode_text((string) $link['title']);
    }

    return healen_decode_text($default);
}

function healen_decode_text(string $value): string
{
    return html_entity_decode($value, ENT_QUOTES | ENT_HTML5, get_bloginfo('charset') ?: 'UTF-8');
}

function healen_link_target(mixed $link): string
{
    if (is_array($link) && !empty($link['target'])) {
        return (string) $link['target'];
    }

    return '';
}

function healen_link_data(mixed $link, string $default_label, string $default_url = '#', string $default_target = ''): array
{
    return [
        'label' => healen_link_title($link, $default_label),
        'url' => healen_link_url($link, $default_url),
        'target' => healen_link_target($link) ?: $default_target,
    ];
}

function healen_image_value(mixed $image, string $fallback_file): string
{
    if (is_array($image) && !empty($image['url'])) {
        return (string) $image['url'];
    }

    if (is_numeric($image)) {
        $url = wp_get_attachment_image_url((int) $image, 'full');
        if ($url) {
            return $url;
        }
    }

    if (is_string($image) && $image !== '') {
        return $image;
    }

    return healen_image($fallback_file);
}

function healen_phone_href(string $phone): string
{
    return 'tel:' . preg_replace('/[^0-9+]/', '', $phone);
}

function healen_page_id(string $slug): int
{
    $page = get_page_by_path($slug);

    return $page instanceof WP_Post ? (int) $page->ID : 0;
}

function healen_front_page_id(): int
{
    $front_page_id = (int) get_option('page_on_front', 0);

    return $front_page_id > 0 ? $front_page_id : healen_page_id('home');
}

function healen_page_field(string $slug, string $name, mixed $default = null): mixed
{
    $post_id = $slug === 'home' ? healen_front_page_id() : healen_page_id($slug);

    return healen_field($name, $default, $post_id ?: null);
}

function healen_page_title(string $slug, string $fallback): string
{
    $post_id = $slug === 'home' ? healen_front_page_id() : healen_page_id($slug);

    if ($post_id > 0) {
        $title = get_the_title($post_id);
        if ($title !== '') {
            return healen_decode_text(wp_strip_all_tags($title));
        }
    }

    return healen_decode_text($fallback);
}

function healen_text_rows(mixed $rows, string $key = 'text'): array
{
    if (!is_array($rows)) {
        return [];
    }

    return array_values(array_filter(array_map(
        static fn(mixed $row): string => is_array($row) ? trim((string) ($row[$key] ?? '')) : trim((string) $row),
        $rows
    )));
}

function healen_lines(mixed $value): array
{
    if (is_array($value)) {
        return array_values(array_filter(array_map('trim', array_map('strval', $value))));
    }

    return array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', (string) $value) ?: [])));
}

function healen_repeater_rows(mixed $rows): array
{
    return is_array($rows) ? array_values($rows) : [];
}

function healen_service_permalink_by_title(string $title, string $default_url): string
{
    $title = trim($title);
    if ($title === '') {
        return $default_url;
    }

    $post = get_page_by_title($title, OBJECT, 'healen_service');
    if (!$post instanceof WP_Post) {
        return $default_url;
    }

    $permalink = get_permalink($post);

    return $permalink ?: $default_url;
}

function healen_service_rows(mixed $rows, string $default_label, string $default_url, array $fallback_rows = []): array
{
    $normalized_rows = healen_repeater_rows($rows);

    return array_map(
        static function (array $row, int $index) use ($default_label, $default_url, $fallback_rows): array {
            $fallback = $fallback_rows[$index] ?? [];
            $icon = trim((string) ($row['icon'] ?? ''));
            $fallback_link_label = healen_link_title($fallback['link'] ?? null, $default_label);
            $title = (string) ($row['title'] ?? $fallback['title'] ?? '');
            $service_url = healen_service_permalink_by_title($title, $default_url);

            return [
                'icon' => $icon !== '' ? $icon : (string) ($fallback['icon'] ?? ''),
                'title' => $title,
                'text' => (string) ($row['text'] ?? $fallback['text'] ?? ''),
                'link' => healen_link_data($row['link'] ?? null, $fallback_link_label, $service_url),
            ];
        },
        $normalized_rows,
        array_keys($normalized_rows)
    );
}

function healen_icon_text_rows(mixed $rows, array $fallback_rows = []): array
{
    $normalized_rows = healen_repeater_rows($rows);

    return array_map(
        static function (array $row, int $index) use ($fallback_rows): array {
            $fallback = $fallback_rows[$index] ?? [];
            $icon = trim((string) ($row['icon'] ?? ''));

            return [
                'icon' => $icon !== '' ? $icon : (string) ($fallback['icon'] ?? ''),
                'title' => (string) ($row['title'] ?? $fallback['title'] ?? ''),
                'text' => (string) ($row['text'] ?? $fallback['text'] ?? ''),
            ];
        },
        $normalized_rows,
        array_keys($normalized_rows)
    );
}

function healen_shortcode_html(mixed $shortcode): string
{
    $shortcode = trim((string) $shortcode);

    if ($shortcode === '') {
        return '';
    }

    return do_shortcode($shortcode);
}

function healen_render_button(mixed $link, string $default_label, string $class, string $default_url = '#'): void
{
    $url = healen_link_url($link, $default_url);
    $title = healen_link_title($link, $default_label);
    $target = healen_link_target($link);
    $target_attr = $target ? ' target="' . esc_attr($target) . '" rel="noopener noreferrer"' : '';

    printf(
        '<a class="%s" href="%s"%s>%s</a>',
        esc_attr($class),
        esc_url($url),
        $target_attr,
        esc_html($title)
    );
}

function healen_default_menu_items(): array
{
    return [
        ['label' => 'Home', 'url' => home_url('/')],
        ['label' => 'Services', 'url' => home_url('/services/')],
        ['label' => 'Dr. Scheid', 'url' => home_url('/about/')],
        ['label' => 'New Patient', 'url' => home_url('/new-patient/')],
    ];
}
