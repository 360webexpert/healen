<?php
/**
 * Healen Design theme bootstrap.
 *
 * @package HealenDesign
 */

if (!defined('ABSPATH')) {
    exit;
}

define('HEALEN_VERSION', '1.0.0');
define('HEALEN_DIR', get_template_directory());
define('HEALEN_URI', get_template_directory_uri());

require_once HEALEN_DIR . '/inc/helpers.php';
require_once HEALEN_DIR . '/inc/defaults.php';
require_once HEALEN_DIR . '/inc/acf.php';
require_once HEALEN_DIR . '/inc/setup.php';

add_action('init', 'healen_disable_wp_emoji_images');
function healen_disable_wp_emoji_images(): void
{
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
    add_filter('emoji_svg_url', '__return_false');
}

add_action('wp_head', 'healen_print_favicon', 1);
add_action('admin_head', 'healen_print_favicon', 1);
function healen_print_favicon(): void
{
    $favicon = healen_option('healen_favicon');
    $url = '';

    if (is_array($favicon) && !empty($favicon['url'])) {
        $url = (string) $favicon['url'];
    } elseif (is_numeric($favicon)) {
        $url = (string) wp_get_attachment_image_url((int) $favicon, 'full');
    } elseif (is_string($favicon)) {
        $url = $favicon;
    }

    if ($url === '') {
        return;
    }

    printf('<link rel="icon" href="%s">' . "\n", esc_url($url));
    printf('<link rel="apple-touch-icon" href="%s">' . "\n", esc_url($url));
}

add_action('after_setup_theme', 'healen_theme_setup');
function healen_theme_setup(): void
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);

    register_nav_menus([
        'primary' => __('Primary Menu', 'healen-design'),
        'footer'  => __('Footer Menu', 'healen-design'),
    ]);
}

add_action('init', 'healen_register_service_post_type');
function healen_register_service_post_type(): void
{
    register_post_type('healen_service', [
        'labels' => [
            'name' => __('Services', 'healen-design'),
            'singular_name' => __('Service', 'healen-design'),
            'add_new_item' => __('Add New Service', 'healen-design'),
            'edit_item' => __('Edit Service', 'healen-design'),
            'new_item' => __('New Service', 'healen-design'),
            'view_item' => __('View Service', 'healen-design'),
            'search_items' => __('Search Services', 'healen-design'),
            'not_found' => __('No services found', 'healen-design'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-clipboard',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'],
        'has_archive' => false,
        'rewrite' => [
            'slug' => 'services',
            'with_front' => false,
        ],
    ]);
}

add_filter('document_title_parts', 'healen_document_title_parts');
function healen_document_title_parts(array $parts): array
{
    if (!is_page() && !is_singular('healen_service')) {
        return array_map(
            static fn(mixed $part): mixed => is_string($part) ? healen_decode_text(wp_strip_all_tags($part)) : $part,
            $parts
        );
    }

    $page_title = get_the_title(get_queried_object_id());
    if ($page_title !== '') {
        $parts['title'] = healen_decode_text(wp_strip_all_tags($page_title));
    }

    $tagline = get_bloginfo('description', 'display');
    if ($tagline !== '') {
        $parts['tagline'] = healen_decode_text(wp_strip_all_tags($tagline));
        unset($parts['site']);
    }

    return array_map(
        static fn(mixed $part): mixed => is_string($part) ? healen_decode_text(wp_strip_all_tags($part)) : $part,
        $parts
    );
}

add_action('wp_enqueue_scripts', 'healen_enqueue_assets');
function healen_enqueue_assets(): void
{
    $fonts_css_path = HEALEN_DIR . '/assets/css/fonts.css';
    wp_enqueue_style(
        'healen-fonts',
        HEALEN_URI . '/assets/css/fonts.css',
        [],
        file_exists($fonts_css_path) ? (string) filemtime($fonts_css_path) : HEALEN_VERSION
    );

    $manifest_path = HEALEN_DIR . '/assets/react/.vite/manifest.json';
    if (file_exists($manifest_path)) {
        $manifest = json_decode((string) file_get_contents($manifest_path), true);
        $entry = is_array($manifest) ? ($manifest['index.html'] ?? $manifest['src/main.tsx'] ?? null) : null;

        if (is_array($entry)) {
            foreach (($entry['css'] ?? []) as $index => $css_file) {
                wp_enqueue_style(
                    'healen-react-' . $index,
                    HEALEN_URI . '/assets/react/' . $css_file,
                    ['healen-fonts'],
                    HEALEN_VERSION
                );
            }

            if (!empty($entry['file'])) {
                wp_enqueue_script(
                    'healen-react',
                    HEALEN_URI . '/assets/react/' . $entry['file'],
                    [],
                    HEALEN_VERSION,
                    true
                );
                wp_script_add_data('healen-react', 'type', 'module');
            }
        }
    }

    healen_enqueue_gravity_forms();
}

function healen_enqueue_gravity_forms(): void
{
    if (!function_exists('gravity_form_enqueue_scripts')) {
        return;
    }

    $form_ids = [(int) get_option('healen_gravity_contact_form_id', 0)];

    if (class_exists('GFAPI')) {
        $forms = GFAPI::get_forms(true, false, 'title', 'ASC');
        if (is_array($forms)) {
            foreach ($forms as $form) {
                if (!empty($form['id'])) {
                    $form_ids[] = (int) $form['id'];
                }
            }
        }
    }

    foreach (array_unique(array_filter($form_ids)) as $form_id) {
        gravity_form_enqueue_scripts((int) $form_id, true);
    }
}

add_action('wp_head', 'healen_print_acf_extra_css', 99);
function healen_print_acf_extra_css(): void
{
    $css = healen_option('healen_extra_css', '');

    if (!is_string($css) || trim($css) === '') {
        return;
    }

    printf("<style id=\"healen-acf-extra-css\">\n%s\n</style>\n", wp_strip_all_tags($css));
}

add_filter('template_include', 'healen_template_router');
function healen_template_router(string $template): string
{
    if (!is_page()) {
        return $template;
    }

    $slug = get_post_field('post_name', get_queried_object_id());
    $templates = [
        'home'        => 'front-page.php',
        'about'       => 'page-about.php',
        'services'    => 'page-services.php',
        'new-patient' => 'page-new-patient.php',
        'contact'     => 'page-contact.php',
    ];

    if (isset($templates[$slug])) {
        $candidate = HEALEN_DIR . '/' . $templates[$slug];
        if (file_exists($candidate)) {
            return $candidate;
        }
    }

    return $template;
}

add_filter('script_loader_tag', 'healen_module_script_tag', 10, 3);
function healen_module_script_tag(string $tag, string $handle, string $src): string
{
    if ($handle !== 'healen-react') {
        return $tag;
    }

    return sprintf('<script type="module" src="%s" id="%s-js"></script>' . "\n", esc_url($src), esc_attr($handle));
}

add_action('wp_footer', 'healen_print_react_data', 1);
function healen_print_react_data(): void
{
    $defaults = healen_defaults();
    $content = healen_react_content();
    $page_titles = [
        'home' => healen_page_title('home', get_bloginfo('name')),
        'about' => healen_page_title('about', 'About Us'),
        'services' => healen_page_title('services', 'Services'),
        'new-patient' => healen_page_title('new-patient', 'New Patient'),
        'contact' => healen_page_title('contact', 'Contact'),
    ];

    $data = [
        'basePath' => wp_parse_url(home_url('/'), PHP_URL_PATH) ?: '/',
        'homeUrl' => home_url('/'),
        'assetUrl' => HEALEN_URI . '/assets/react/',
        'bookingUrl' => healen_link_url(healen_option('healen_booking_link'), $defaults['booking_url']),
        'portalLink' => healen_link_data(healen_option('healen_portal_link'), 'Patient Portal', $defaults['portal_url']),
        'phone' => healen_option('healen_phone', $defaults['phone']),
        'email' => healen_option('healen_email', $defaults['email']),
        'menu' => healen_react_menu_items('primary'),
        'footer' => healen_react_footer_data(),
        'pageTitles' => $page_titles,
        'siteName' => healen_decode_text(get_bloginfo('name')),
        'siteTagline' => healen_decode_text(get_bloginfo('description')),
        'services' => healen_service_detail_data(),
        'content' => $content,
        'forms' => [
            'contact' => healen_render_gravity_form((int) get_option('healen_gravity_contact_form_id', 0)),
        ],
    ];

    printf(
        '<script id="healen-react-data">window.HealenData = %s;</script>' . "\n",
        wp_json_encode($data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT)
    );
}

function healen_service_detail_data(): array
{
    $query = new WP_Query([
        'post_type' => 'healen_service',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'orderby' => ['menu_order' => 'ASC', 'title' => 'ASC'],
        'no_found_rows' => true,
    ]);

    return array_values(array_map(
        static function (WP_Post $post): array {
            $sections = array_map(
                static fn(array $row): array => [
                    'heading' => healen_decode_text((string) ($row['heading'] ?? '')),
                    'body' => healen_decode_text((string) ($row['body'] ?? '')),
                    'items' => array_map('healen_decode_text', healen_lines($row['items'] ?? '')),
                ],
                healen_repeater_rows(healen_field('service_sections', [], $post->ID))
            );
            $when_to_seek_value = healen_field('service_when_to_seek', [], $post->ID);
            $when_to_seek = is_array($when_to_seek_value)
                ? array_values(array_filter(array_map(
                    static fn(array $row): string => healen_decode_text(trim((string) ($row['item'] ?? ''))),
                    healen_repeater_rows($when_to_seek_value)
                )))
                : array_map('healen_decode_text', healen_lines($when_to_seek_value));
            $quick_facts_value = healen_field('service_quick_facts', [], $post->ID);
            $quick_facts = array_values(array_filter(array_map(
                static fn(array $row): string => healen_decode_text(trim((string) ($row['item'] ?? ''))),
                healen_repeater_rows($quick_facts_value)
            )));
            $decode = static fn(string $field, string $default = ''): string =>
                healen_decode_text((string) healen_field($field, $default, $post->ID));

            return [
                'slug' => $post->post_name,
                'title' => healen_decode_text(get_the_title($post)),
                'subtitle' => $decode('service_subtitle'),
                'category' => (string) healen_field('service_category', 'sleep', $post->ID),
                'categoryLabel' => $decode('service_category_label', healen_field('service_category', 'sleep', $post->ID) === 'sleep' ? 'Sleep Medicine' : 'Otolaryngology (ENT)'),
                'intro' => $decode('service_intro', $post->post_excerpt ?: wp_strip_all_tags($post->post_content)),
                'sections' => $sections,
                'quickFacts' => $quick_facts,
                'whenToSeek' => $when_to_seek,
                'phone' => $decode('service_phone', (string) healen_option('healen_phone', healen_defaults()['phone'])),
                'breadcrumbHomeLabel' => $decode('service_breadcrumb_home_label', 'Home'),
                'breadcrumbServicesLabel' => $decode('service_breadcrumb_services_label', 'Services'),
                'primaryButton' => healen_link_data(healen_field('service_primary_button', null, $post->ID), 'Book a Consultation', healen_link_url(healen_option('healen_booking_link'), healen_defaults()['booking_url'])),
                'whenToSeekHeading' => $decode('service_when_to_seek_heading', 'When to Seek Help'),
                'quickNote' => $decode('service_quick_note', get_bloginfo('name') . ' · Paramus, NJ' . "\n" . 'Accepting new patients'),
                'progressSteps' => array_map('healen_decode_text', healen_lines(healen_field('service_progress_steps', "Comprehensive Evaluation\nEvidence-Based Treatment\nPersonalized Care Plan", $post->ID))),
                'sidebarHeading' => $decode('service_sidebar_heading', 'Our Approach'),
                'sidebarText' => $decode('service_sidebar_text', 'Dr. Scheid takes a full-picture view of the airway — from nose to throat — so nothing gets missed. Every plan is built around your specific situation.'),
                'sidebarItems' => array_map('healen_decode_text', healen_lines(healen_field('service_sidebar_items', "Dual board-certified (ENT + Sleep)\nUnrushed, comprehensive appointments\nAccepting new patients in Paramus, NJ", $post->ID))),
                'contactHeading' => $decode('service_contact_heading', 'Ready to get started?'),
                'contactButton' => healen_link_data(healen_field('service_contact_button', null, $post->ID), 'Book Appointment', healen_link_url(healen_option('healen_booking_link'), healen_defaults()['booking_url'])),
                'seekEyebrow' => $decode('service_seek_eyebrow', 'When to Seek Evaluation'),
                'seekHeading' => $decode('service_seek_heading', 'Consider reaching out if any of these sound familiar'),
                'ctaEyebrow' => $decode('service_cta_eyebrow', get_bloginfo('name') . ' · Paramus, NJ'),
                'ctaHeading' => $decode('service_cta_heading'),
                'ctaText' => $decode('service_cta_text', 'Dr. Scheid takes the time to understand the full picture. Board-certified in both ENT and Sleep Medicine — so you get one focused evaluation, not a referral runaround.'),
                'ctaPrimaryButton' => healen_link_data(healen_field('service_cta_primary_button', null, $post->ID), 'Book an Appointment', healen_link_url(healen_option('healen_booking_link'), healen_defaults()['booking_url'])),
                'ctaSecondaryLabel' => $decode('service_cta_secondary_label', 'Call {phone}'),
                'relatedEyebrow' => $decode('service_related_eyebrow', 'Related'),
                'relatedHeading' => $decode('service_related_heading', 'More {category} Services'),
                'relatedViewAllLabel' => $decode('service_related_view_all_label', 'View All'),
                'relatedItemLabel' => $decode('service_related_item_label', 'Learn More'),
                'relatedSleepLabel' => $decode('service_related_sleep_label', 'Sleep'),
                'relatedEntLabel' => $decode('service_related_ent_label', 'ENT'),
                'permalink' => get_permalink($post),
            ];
        },
        $query->posts
    ));
}

function healen_react_footer_data(): array
{
    $defaults = healen_defaults();
    $site_name = get_bloginfo('name');
    $booking_url = healen_link_url(healen_option('healen_booking_link'), $defaults['booking_url']);

    $resource_rows = healen_repeater_rows(healen_option('healen_footer_resources', []));
    $resources = array_values(array_filter(array_map(
        static function (array $row): ?array {
            $link = $row['link'] ?? null;
            if (!is_array($link) || empty($link['url'])) {
                return null;
            }

            return [
                'label' => (string) ($link['title'] ?? $link['url']),
                'url' => (string) $link['url'],
                'target' => (string) ($link['target'] ?? ''),
            ];
        },
        $resource_rows
    )));

    if (!$resources) {
        $resources = [
            ['label' => 'New Patient Info', 'url' => home_url('/new-patient/'), 'target' => ''],
            ['label' => 'Book Appointment', 'url' => $booking_url, 'target' => '_blank'],
            ['label' => 'Insurance Info', 'url' => home_url('/new-patient/'), 'target' => ''],
            ['label' => 'Contact Us', 'url' => home_url('/contact/'), 'target' => ''],
        ];
    }

    $social_rows = healen_repeater_rows(healen_option('healen_footer_social_links', []));
    $social_links = array_values(array_filter(array_map(
        static function (array $row): ?array {
            if (empty($row['url'])) {
                return null;
            }

            return [
                'label' => (string) ($row['label'] ?? ''),
                'url' => (string) $row['url'],
                'icon' => (string) ($row['icon'] ?? 'globe'),
            ];
        },
        $social_rows
    )));

    if (!$social_links) {
        $email = healen_option('healen_email', $defaults['email']);
        $social_links = [
            ['label' => 'Email', 'url' => 'mailto:' . $email, 'icon' => 'mail'],
        ];
    }

    $copyright = healen_option('healen_footer_copyright', '© {year} {site}. All rights reserved.');
    $copyright = str_replace(
        ['{year}', '{site}'],
        [date_i18n('Y'), $site_name],
        (string) $copyright
    );

    return [
        'logo' => healen_image_value(healen_option('healen_logo_light'), 'logo-white-orig.png'),
        'text' => healen_option('healen_footer_text', $defaults['footer_text']),
        'address' => healen_option('healen_address', $defaults['address']),
        'quickHeading' => healen_option('healen_footer_quick_heading', 'Quick Links'),
        'resourceHeading' => healen_option('healen_footer_resources_heading', 'Patient Resources'),
        'contactHeading' => healen_option('healen_footer_contact_heading', 'Contact Us'),
        'copyright' => $copyright,
        'quickLinks' => healen_react_menu_items('footer'),
        'resources' => $resources,
        'socialLinks' => $social_links,
    ];
}

function healen_react_content(): array
{
    $defaults = healen_defaults();
    $booking_url = healen_link_url(healen_option('healen_booking_link'), $defaults['booking_url']);

    $home = $defaults['home'];
    $about = $defaults['about'];

    return [
        'home' => [
            'heroTitle' => healen_page_field('home', 'home_hero_title', $home['hero_title']),
            'heroIntro' => healen_page_field('home', 'home_hero_intro', $home['hero_intro']),
            'heroBody' => healen_page_field('home', 'home_hero_body', $home['hero_body']),
            'heroImage' => healen_image_value(healen_page_field('home', 'home_hero_image'), 'hero-sleep.png'),
            'heroImageAlt' => healen_page_field('home', 'home_hero_image_alt', 'Restful sleep'),
            'heroButton' => healen_link_data(healen_page_field('home', 'home_hero_button'), 'Schedule a Consultation', $booking_url),
            'credentials' => healen_repeater_rows(healen_page_field('home', 'home_credentials', $home['credentials'])),
            'specialties' => array_map(
                static fn(array $row): array => [
                    'label' => healen_decode_text((string) ($row['label'] ?? '')),
                    'link' => healen_link_data(
                        $row['link'] ?? null,
                        (string) ($row['label'] ?? ''),
                        home_url('/')
                    ),
                ],
                healen_repeater_rows(healen_page_field(
                    'home',
                    'home_specialties',
                    array_map(static fn(string $label): array => [
                        'label' => $label,
                        'link' => [
                            'title' => $label,
                            'url' => home_url('/'),
                            'target' => '',
                        ],
                    ], $home['specialties'])
                ))
            ),
            'practiceHeading' => healen_page_field('home', 'home_practice_heading', 'A Practice Built Around You'),
            'practiceIntro' => healen_page_field('home', 'home_practice_intro', 'Synergy ENT & Wellness is led by Dr. Sara C. Scheid, MD - one of the few physicians in New Jersey board-certified in both Otolaryngology and Sleep Medicine.'),
            'practiceButton' => healen_link_data(healen_page_field('home', 'home_practice_button'), 'Meet Dr. Scheid', home_url('/about/')),
            'aboutEyebrow' => healen_page_field('home', 'home_about_eyebrow', 'Meet Dr. Scheid'),
            'aboutHeading' => healen_page_field('home', 'home_about_heading', $about['title']),
            'aboutImage' => healen_image_value(healen_page_field('home', 'home_about_image'), 'dr-scheid-about.png'),
            'aboutImageAlt' => healen_page_field('home', 'home_about_image_alt', 'Dr. Sara Scheid'),
            'aboutDoctorName' => healen_page_field('home', 'home_about_doctor_name', 'Dr. Sara Scheid'),
            'aboutDoctorTitle' => healen_page_field('home', 'home_about_doctor_title', 'Otolaryngologist & Sleep Specialist'),
            'aboutBody' => healen_text_rows(healen_page_field('home', 'home_about_body', array_map(static fn(string $text): array => ['text' => $text], $about['body']))),
            'aboutButton' => healen_link_data(healen_page_field('home', 'home_about_button'), 'Learn More About Dr. Scheid', home_url('/about/')),
            'aboutOutsideHeading' => healen_page_field('home', 'home_about_outside_heading', 'Outside the Office'),
            'aboutOutsideText' => healen_page_field('home', 'home_about_outside_text', 'Dr. Scheid is happily married and a proud mother of two college-aged children and two dogs. In her free time she enjoys hiking, skiing, reading, and spending time with her family.'),
            'aboutCredentials' => array_map(
                static fn(array $row): array => [
                    'title' => (string) ($row['title'] ?? ''),
                    'items' => healen_lines($row['items'] ?? ''),
                ],
                healen_repeater_rows(healen_page_field('home', 'home_about_credentials', $about['credentials']))
            ),
            'servicesEyebrow' => healen_page_field('home', 'home_services_eyebrow', 'Services'),
            'servicesHeading' => healen_page_field('home', 'home_services_heading', 'How We Can Help'),
            'servicesIntro' => healen_page_field('home', 'home_services_intro', ''),
            'servicesButton' => healen_link_data(healen_page_field('home', 'home_services_button'), 'View All Services', home_url('/services/')),
            'services' => healen_repeater_rows(healen_page_field('home', 'home_services', $home['services'])),
            'callout' => healen_page_field('home', 'home_callout', ''),
            'calloutSubtext' => healen_page_field('home', 'home_callout_subtext', 'A focused ENT/sleep airway evaluation can help connect the dots.'),
            'whyEyebrow' => healen_page_field('home', 'home_why_eyebrow', 'Why Choose Us'),
            'whyHeading' => healen_page_field('home', 'home_why_heading', 'A Different Approach to ENT Care'),
            'whyItems' => healen_repeater_rows(healen_page_field('home', 'home_why_items', [
                ['title' => 'Patient-First Philosophy', 'text' => 'We take a holistic approach, searching for root causes and developing treatment plans tailored to your life.'],
                ['title' => 'Unrushed Appointments', 'text' => 'We moved away from corporate medicine to spend more time with you - listening, explaining, and partnering in your care.'],
                ['title' => 'Dual Board Certification', 'text' => 'Dual expertise in ENT and Sleep Medicine means comprehensive care for interconnected conditions under one roof.'],
            ])),
            'whyPrimaryButton' => healen_link_data(healen_page_field('home', 'home_why_primary_button'), 'Get Started', $booking_url),
            'whySecondaryButton' => healen_link_data(healen_page_field('home', 'home_why_secondary_button'), 'Learn More', home_url('/about/')),
            'testimonialsEyebrow' => healen_page_field('home', 'home_testimonials_eyebrow', 'Testimonials'),
            'testimonialsHeading' => healen_page_field('home', 'home_testimonials_heading', 'What Our Patients Say'),
            'testimonials' => array_map(
                static function (array $row, int $index) use ($home): array {
                    $fallback = $home['testimonials'][$index] ?? [];

                    return [
                        'quote' => (string) ($row['quote'] ?? $fallback['quote'] ?? ''),
                        'name' => (string) ($row['name'] ?? $fallback['name'] ?? ''),
                        'procedure' => (string) ($row['procedure'] ?? $fallback['procedure'] ?? ''),
                        'initials' => (string) ($row['initials'] ?? $fallback['initials'] ?? ''),
                        'color' => (string) ($row['color'] ?? $fallback['color'] ?? '#1D3A5F'),
                    ];
                },
                healen_repeater_rows(healen_page_field('home', 'home_testimonials', $home['testimonials'])),
                array_keys(healen_repeater_rows(healen_page_field('home', 'home_testimonials', $home['testimonials'])))
            ),
            'insuranceEyebrow' => healen_page_field('home', 'home_insurance_eyebrow', 'Insurance'),
            'insuranceHeading' => healen_page_field('home', 'home_insurance_heading', 'We work with most insurance plans.'),
            'insuranceText' => healen_page_field('home', 'home_insurance_text', 'Synergy ENT & Wellness is an out-of-network practice. We are happy to provide documentation to help you submit claims to your insurance carrier for potential reimbursement.'),
            'insuranceContactLink' => healen_link_data(healen_page_field('home', 'home_insurance_contact_link'), 'Questions about coverage? Contact us', home_url('/contact/')),
            'bannerHeading' => healen_page_field('home', 'home_banner_heading', 'Synergy ENT addresses what traditional care overlooks. How you actually feel.'),
            'bannerButton' => healen_link_data(healen_page_field('home', 'home_banner_button'), 'Book my appointment', $booking_url),
            'bannerNote' => healen_page_field('home', 'home_banner_note', 'Now accepting new patients in Paramus, NJ'),
            'locationEyebrow' => healen_page_field('home', 'home_location_eyebrow', 'Visit Us'),
            'locationHeading' => healen_page_field('home', 'home_location_heading', 'Our Location'),
            'locationRegion' => healen_page_field('home', 'home_location_region', 'New Jersey'),
            'locationCity' => healen_page_field('home', 'home_location_city', 'Paramus'),
            'locationState' => healen_page_field('home', 'home_location_state', 'NJ'),
            'locationAddress' => healen_page_field('home', 'home_location_address', $defaults['address']),
            'locationHours' => healen_page_field('home', 'home_location_hours', 'Mon - Fri: 9am - 5pm'),
            'locationMapEmbed' => healen_page_field('home', 'home_location_map_embed', 'https://www.openstreetmap.org/export/embed.html?bbox=-74.1810%2C40.8912%2C-73.9810%2C40.9912&layer=mapnik&marker=40.9512%2C-74.0710'),
            'locationTags' => healen_repeater_rows(healen_page_field('home', 'home_location_tags', [
                ['label' => 'ENT'],
                ['label' => 'Sleep Medicine'],
                ['label' => 'Allergy'],
                ['label' => 'Sinus Care'],
            ])),
            'locationPhoneLabel' => healen_page_field('home', 'home_location_phone_label', 'Phone'),
            'locationDirectionsLabel' => healen_page_field('home', 'home_location_directions_label', 'Directions'),
            'locationCallLabel' => healen_page_field('home', 'home_location_call_label', 'Call Now'),
            'locationBookLabel' => healen_page_field('home', 'home_location_book_label', 'Book Now'),
            'locationDirectionsLink' => healen_link_data(healen_page_field('home', 'home_location_directions_link'), 'Directions', 'https://maps.google.com/?q=' . rawurlencode(str_replace("\n", ' ', healen_page_field('home', 'home_location_address', $defaults['address'])))),
            'locationPhoneLink' => healen_link_data(healen_page_field('home', 'home_location_phone_link'), 'Call Now', healen_phone_href(healen_option('healen_phone', $defaults['phone']))),
            'locationBookLink' => healen_link_data(healen_page_field('home', 'home_location_book_link'), 'Book Now', $booking_url),
            'bookingEyebrow' => healen_page_field('home', 'home_booking_eyebrow', 'Book Appointment'),
            'bookingHeading' => healen_page_field('home', 'home_booking_heading', 'Request an Appointment'),
            'bookingText' => healen_page_field('home', 'home_booking_text', 'Fill out the form and our team will be in touch within one business day to confirm your visit.'),
            'bookingPhoneLabel' => healen_page_field('home', 'home_booking_phone_label', 'Call our office directly'),
            'bookingEmailLabel' => healen_page_field('home', 'home_booking_email_label', 'Email us any time'),
            'bookingAddressLabel' => healen_page_field('home', 'home_booking_address_label', 'Paramus, NJ 07652'),
            'bookingNoticeHeading' => healen_page_field('home', 'home_booking_notice_heading', 'Out-of-network practice'),
            'bookingNoticeText' => healen_page_field('home', 'home_booking_notice_text', 'We do not accept Medicare. Please contact your insurance to ask about out-of-network benefits before your visit.'),
            'bookingFormHeading' => healen_page_field('home', 'home_booking_form_heading', 'Tell us about yourself'),
            'bookingFormShortcodeHtml' => healen_shortcode_html(healen_page_field('home', 'home_booking_form_shortcode', '')),
            'ctaHeading' => healen_page_field('home', 'home_cta_heading', 'Ready to Breathe Better'),
            'ctaHighlight' => healen_page_field('home', 'home_cta_highlight', 'and Sleep Sounder?'),
            'ctaText' => healen_page_field('home', 'home_cta_text', 'New and returning patients are welcome. Reach out today to schedule your appointment with Dr. Scheid at our Paramus, NJ office.'),
            'ctaPrimaryButton' => healen_link_data(healen_page_field('home', 'home_cta_primary_button'), 'Request an Appointment', $booking_url),
            'ctaSecondaryButton' => healen_link_data(healen_page_field('home', 'home_cta_secondary_button'), 'Call Our Office', healen_phone_href(healen_option('healen_phone', $defaults['phone']))),
            'ctaImage' => healen_image_value(healen_page_field('home', 'home_cta_image'), 'hero-sleep.png'),
            'ctaImageAlt' => healen_page_field('home', 'home_cta_image_alt', 'Restful sleep'),
        ],
        'about' => [
            'heroTitle' => healen_page_field('about', 'about_hero_title', 'About Dr. Scheid'),
            'heroSubtitle' => healen_page_field('about', 'about_hero_subtitle', ''),
            'heroBreadcrumb' => healen_page_field('about', 'about_hero_breadcrumb', 'About Us'),
            'bioEyebrow' => healen_page_field('about', 'about_bio_eyebrow', 'Meet the Doctor'),
            'heading' => healen_page_field('about', 'about_heading', $about['title']),
            'doctorImage' => healen_image_value(healen_page_field('about', 'about_doctor_image'), 'dr-scheid-about.png'),
            'doctorImageAlt' => healen_page_field('about', 'about_doctor_image_alt', 'Dr. Sara Scheid'),
            'doctorName' => healen_page_field('about', 'about_doctor_name', 'Dr. Sara Scheid'),
            'doctorTitle' => healen_page_field('about', 'about_doctor_title', 'Otolaryngologist & Sleep Specialist'),
            'doctorBadge' => healen_page_field('about', 'about_doctor_badge', 'Accepting New Patients'),
            'experienceNumber' => healen_page_field('about', 'about_experience_number', '20+'),
            'experienceLabel' => healen_page_field('about', 'about_experience_label', "Years\nExp."),
            'body' => healen_text_rows(healen_page_field('about', 'about_body', array_map(static fn(string $text): array => ['text' => $text], $about['body']))),
            'bioPrimaryButton' => healen_link_data(healen_page_field('about', 'about_bio_primary_button'), 'Book an Appointment', healen_link_url(healen_option('healen_booking_link'), $defaults['booking_url'])),
            'bioSecondaryButton' => healen_link_data(healen_page_field('about', 'about_bio_secondary_button'), 'Contact the Office', home_url('/contact/')),
            'credentials' => array_map(
                static fn(array $row): array => [
                    'title' => (string) ($row['title'] ?? ''),
                    'items' => healen_lines($row['items'] ?? ''),
                ],
                healen_repeater_rows(healen_page_field('about', 'about_credentials', $about['credentials']))
            ),
            'outsideHeading' => healen_page_field('about', 'about_outside_heading', 'Outside the Office'),
            'outsideText' => healen_page_field('about', 'about_outside_text', 'Dr. Scheid is happily married and a proud mother of two college-aged children and two dogs. In her free time she enjoys hiking, skiing, reading, and spending time with her family.'),
            'approachEyebrow' => healen_page_field('about', 'about_approach_eyebrow', 'Our Philosophy'),
            'approachHeading' => healen_page_field('about', 'about_approach_heading', 'The Synergy Difference'),
            'approach' => healen_icon_text_rows(healen_page_field('about', 'about_approach', $about['approach']), $about['approach']),
            'ctaHeading' => healen_page_field('about', 'about_cta_heading', 'Ready to get started?'),
            'ctaText' => healen_page_field('about', 'about_cta_text', 'New patients are welcome. Book an appointment or reach out with any questions.'),
            'ctaPrimaryButton' => healen_link_data(healen_page_field('about', 'about_cta_primary_button'), 'Book an Appointment', healen_link_url(healen_option('healen_booking_link'), $defaults['booking_url'])),
            'ctaSecondaryButton' => healen_link_data(healen_page_field('about', 'about_cta_secondary_button'), 'Contact the Office', home_url('/contact/')),
        ],
        'services' => [
            'heroTitle' => healen_page_field('services', 'services_hero_title', 'Our Services'),
            'heroSubtitle' => healen_page_field('services', 'services_hero_subtitle', 'Comprehensive ENT and sleep medicine care under one roof.'),
            'heroBreadcrumb' => healen_page_field('services', 'services_hero_breadcrumb', 'Services'),
            'sleepEyebrow' => healen_page_field('services', 'services_sleep_eyebrow', 'Sleep Medicine'),
            'sleepHeading' => healen_page_field('services', 'services_sleep_heading', 'Sleep Care Services'),
            'sleepIntro' => healen_page_field('services', 'services_sleep_intro', 'Dr. Scheid is board-certified in sleep medicine with expertise in the full spectrum of sleep disorders - from apnea and snoring to insomnia and circadian disruption.'),
            'sleep' => healen_service_rows(healen_page_field('services', 'services_sleep', $defaults['services_sleep']), 'Learn More', home_url('/contact/'), $defaults['services_sleep']),
            'bannerEyebrow' => healen_page_field('services', 'services_banner_eyebrow', 'Did You Know?'),
            'bannerText' => healen_page_field('services', 'services_banner_text', 'Many sleep problems have a nasal or airway component. Dr. Scheid evaluates both specialties together - so nothing gets missed.'),
            'bannerButton' => healen_link_data(healen_page_field('services', 'services_banner_button'), 'Book a Consultation', healen_link_url(healen_option('healen_booking_link'), $defaults['booking_url'])),
            'entEyebrow' => healen_page_field('services', 'services_ent_eyebrow', 'Otolaryngology'),
            'entHeading' => healen_page_field('services', 'services_ent_heading', 'ENT Services'),
            'entIntro' => healen_page_field('services', 'services_ent_intro', 'From ear infections to nasal surgery, Dr. Scheid provides comprehensive otolaryngology care for adults and children in the Paramus, NJ area.'),
            'ent' => healen_service_rows(healen_page_field('services', 'services_ent', $defaults['services_ent']), 'Learn More', home_url('/contact/'), $defaults['services_ent']),
            'ctaHeading' => healen_page_field('services', 'services_cta_heading', 'Not sure where to start?'),
            'ctaText' => healen_page_field('services', 'services_cta_text', 'Call our office or book a consultation - Dr. Scheid will help determine which evaluation is right for you.'),
            'ctaPrimaryButton' => healen_link_data(healen_page_field('services', 'services_cta_primary_button'), 'Book an Appointment', healen_link_url(healen_option('healen_booking_link'), $defaults['booking_url'])),
            'ctaSecondaryButton' => healen_link_data(healen_page_field('services', 'services_cta_secondary_button'), 'Call ' . healen_option('healen_phone', $defaults['phone']), healen_phone_href(healen_option('healen_phone', $defaults['phone']))),
        ],
        'newPatient' => [
            'heroTitle' => healen_page_field('new-patient', 'new_patient_hero_title', 'New Patient Information'),
            'heroSubtitle' => healen_page_field('new-patient', 'new_patient_hero_subtitle', 'Everything you need to know before your first visit.'),
            'heroBreadcrumb' => healen_page_field('new-patient', 'new_patient_hero_breadcrumb', 'New Patient'),
            'welcomeEyebrow' => healen_page_field('new-patient', 'new_patient_welcome_eyebrow', 'Welcome'),
            'heading' => healen_page_field('new-patient', 'new_patient_heading', "We're excited to welcome you as a new patient."),
            'intro' => healen_page_field('new-patient', 'new_patient_intro', 'Please review the information below to prepare for your first visit. If you have any questions before coming in, our team is happy to help.'),
            'cards' => array_map(
                static function (array $row, int $index) use ($defaults): array {
                    $fallback = $defaults['new_patient_cards'][$index] ?? [];

                    return [
                        'icon' => (string) ($row['icon'] ?? $fallback['icon'] ?? ''),
                        'color' => (string) ($row['color'] ?? $fallback['color'] ?? ''),
                        'title' => (string) ($row['title'] ?? $fallback['title'] ?? ''),
                        'items' => healen_lines($row['items'] ?? $fallback['items'] ?? ''),
                    ];
                },
                healen_repeater_rows(healen_page_field('new-patient', 'new_patient_cards', $defaults['new_patient_cards'])),
                array_keys(healen_repeater_rows(healen_page_field('new-patient', 'new_patient_cards', $defaults['new_patient_cards'])))
            ),
            'hours' => healen_repeater_rows(healen_page_field('new-patient', 'new_patient_hours', $defaults['hours'])),
            'hoursEyebrow' => healen_page_field('new-patient', 'new_patient_hours_eyebrow', 'Hours of Operation'),
            'hoursNote' => healen_page_field('new-patient', 'new_patient_hours_note', 'Closed for lunch Monday - Thursday, 12:00pm - 1:00pm'),
            'insuranceEyebrow' => healen_page_field('new-patient', 'new_patient_insurance_eyebrow', 'Insurance'),
            'insuranceHeading' => healen_page_field('new-patient', 'new_patient_insurance_heading', 'We work with most insurance plans.'),
            'insurance' => healen_page_field('new-patient', 'new_patient_insurance', 'We work with most insurance plans.'),
            'coverageHeading' => healen_page_field('new-patient', 'new_patient_coverage_heading', 'Questions about coverage?'),
            'coverageText' => healen_page_field('new-patient', 'new_patient_coverage_text', "Call us before your appointment and we'll help you understand your out-of-network benefits and what to expect."),
            'coverageButton' => healen_link_data(healen_page_field('new-patient', 'new_patient_coverage_button'), healen_option('healen_phone', $defaults['phone']), healen_phone_href(healen_option('healen_phone', $defaults['phone']))),
            'ctaHeading' => healen_page_field('new-patient', 'new_patient_cta_heading', 'Ready to book your first visit?'),
            'ctaText' => healen_page_field('new-patient', 'new_patient_cta_text', 'Dr. Scheid is currently accepting new patients. We look forward to meeting you.'),
            'ctaPrimaryButton' => healen_link_data(healen_page_field('new-patient', 'new_patient_cta_primary_button'), 'Book an Appointment', healen_link_url(healen_option('healen_booking_link'), $defaults['booking_url'])),
            'ctaSecondaryButton' => healen_link_data(healen_page_field('new-patient', 'new_patient_cta_secondary_button'), 'Contact the Office', home_url('/contact/')),
        ],
        'contact' => [
            'heroTitle' => healen_page_field('contact', 'contact_hero_title', 'Contact Us'),
            'heroSubtitle' => healen_page_field('contact', 'contact_hero_subtitle', 'Our team is ready to help. Reach out with any questions.'),
            'heroBreadcrumb' => healen_page_field('contact', 'contact_hero_breadcrumb', 'Contact Us'),
            'formEyebrow' => healen_page_field('contact', 'contact_form_eyebrow', 'Send a Message'),
            'heading' => healen_page_field('contact', 'contact_heading', 'Get In Touch'),
            'intro' => healen_page_field('contact', 'contact_intro', 'Please use the form below to share your questions or feedback. A member of our team will get back to you promptly.'),
            'formShortcodeHtml' => healen_shortcode_html(healen_page_field('contact', 'contact_form_shortcode', '')),
            'mapEmbed' => healen_page_field('contact', 'contact_map_embed', 'https://maps.google.com/maps?q=37+West+Century+Road+Suite+104+Paramus+NJ+07652&output=embed'),
            'addressLabel' => healen_page_field('contact', 'contact_address_label', 'Post Address'),
            'phoneLabel' => healen_page_field('contact', 'contact_phone_label', 'Contact Phone'),
            'emailLabel' => healen_page_field('contact', 'contact_email_label', 'E-mail Address'),
            'hoursLabel' => healen_page_field('contact', 'contact_hours_label', 'Hours of Operation'),
            'hoursLines' => healen_lines(healen_page_field('contact', 'contact_hours_lines', "Mon: 8:00am - 4:30pm\nTue: 8:00am - 4:30pm\nWed: 8:00am - 4:30pm\nThu: 8:00am - 4:30pm\nFri: 8:00am - 12:00pm\nClosed for lunch M-Thu, 12pm-1pm")),
            'directionsLink' => healen_link_data(healen_page_field('contact', 'contact_directions_link'), 'Get Directions', 'https://maps.google.com/?q=' . rawurlencode(str_replace("\n", ' ', healen_option('healen_address', $defaults['address'])))),
            'phoneLink' => healen_link_data(healen_page_field('contact', 'contact_phone_link'), 'Call Now', healen_phone_href(healen_option('healen_phone', $defaults['phone']))),
            'emailLink' => healen_link_data(healen_page_field('contact', 'contact_email_link'), 'Send Email', 'mailto:' . healen_option('healen_email', $defaults['email'])),
            'ctaEyebrow' => healen_page_field('contact', 'contact_cta_eyebrow', 'Ready to see Dr. Scheid?'),
            'ctaHeading' => healen_page_field('contact', 'contact_cta_heading', 'Book your appointment online - it only takes a minute.'),
            'ctaButton' => healen_link_data(healen_page_field('contact', 'contact_cta_button'), 'Book Online', healen_link_url(healen_option('healen_booking_link'), $defaults['booking_url'])),
        ],
    ];
}

function healen_render_gravity_form(int $form_id): string
{
    if ($form_id <= 0 || !function_exists('gravity_form')) {
        return '';
    }

    $markup = gravity_form($form_id, false, false, false, null, true, 0, false);

    return is_string($markup) ? $markup : '';
}

function healen_react_menu_items(string $location): array
{
    $locations = get_nav_menu_locations();
    $menu_id = $locations[$location] ?? 0;
    $items = $menu_id ? wp_get_nav_menu_items($menu_id) : false;

    if (!$items) {
        return array_map(
            static fn(array $item): array => [
                'label' => $item['label'],
                'url' => $item['url'],
                'target' => '',
            ],
            healen_default_menu_items()
        );
    }

    return array_values(array_map(
        static fn(WP_Post $item): array => [
            'label' => html_entity_decode($item->title, ENT_QUOTES, get_bloginfo('charset')),
            'url' => $item->url,
            'target' => $item->target ?: '',
        ],
        array_filter($items, static fn(WP_Post $item): bool => (int) $item->menu_item_parent === 0)
    ));
}
