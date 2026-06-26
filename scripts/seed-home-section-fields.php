<?php
/**
 * Seed homepage-only ACF section fields without overwriting existing values.
 *
 * Run with:
 * wp --path=/opt/homebrew/var/www/wp3 eval-file wp-content/themes/Healen-Design/scripts/seed-home-section-fields.php
 *
 * @package HealenDesign
 */

if (!defined('ABSPATH')) {
    exit;
}

$home_id = (int) get_option('page_on_front', 0);
if (!$home_id) {
    $home = get_page_by_path('home');
    $home_id = $home instanceof WP_Post ? (int) $home->ID : 0;
}

if (!$home_id) {
    WP_CLI::error('Home page was not found.');
}

$seed = static function (string $field_key, string $field_name, mixed $value) use ($home_id): void {
    $current = function_exists('get_field') ? get_field($field_name, $home_id, false) : get_post_meta($home_id, $field_name, true);

    if ($current !== null && $current !== false && $current !== '' && $current !== []) {
        WP_CLI::log($field_name . ' kept');
        return;
    }

    update_field($field_key, $value, $home_id);
    WP_CLI::log($field_name . ' seeded');
};

$seed('field_healen_home_about_heading', 'home_about_heading', 'Care That Takes You Seriously.');
$seed('field_healen_home_about_body', 'home_about_body', [
    ['text' => 'Dr. Sara Scheid is a board-certified ENT and sleep medicine physician in Paramus, NJ, specializing in thoughtful evaluation of breathing, sleep, and airway-related concerns.'],
    ['text' => 'As both an otolaryngologist and sleep medicine physician, Dr. Scheid evaluates how the nose, throat, airway, sleep quality, allergies, reflux, and inflammation may be connected.'],
    ['text' => 'At Synergy ENT & Wellness, patients receive unrushed, patient-driven care designed to help you breathe better, sleep better, and gain control of your health.'],
]);
$seed('field_healen_home_about_credentials', 'home_about_credentials', [
    [
        'title' => 'Board Certifications',
        'items' => "Diplomate - American Board of Otolaryngology\nDiplomate - American Board of Sleep Medicine\nFellow - American Academy of Pediatrics",
    ],
    [
        'title' => 'Education & Training',
        'items' => "Dartmouth College (Undergraduate)\nRush Medical College, MD - Alpha Omega Alpha\nThomas Jefferson University Hospital\nSt. Christopher's Hospital for Children",
    ],
]);
$seed('field_healen_home_practice_heading', 'home_practice_heading', 'A Practice Built Around You');
$seed('field_healen_home_practice_intro', 'home_practice_intro', 'Synergy ENT & Wellness is led by Dr. Sara C. Scheid, MD - one of the few physicians in New Jersey board-certified in both Otolaryngology and Sleep Medicine.');
$seed('field_healen_home_why_heading', 'home_why_heading', 'A Different Approach to ENT Care');
$seed('field_healen_home_why_items', 'home_why_items', [
    ['title' => 'Patient-First Philosophy', 'text' => 'We take a holistic approach, searching for root causes and developing treatment plans tailored to your life.'],
    ['title' => 'Unrushed Appointments', 'text' => 'We moved away from corporate medicine to spend more time with you - listening, explaining, and partnering in your care.'],
    ['title' => 'Dual Board Certification', 'text' => 'Dual expertise in ENT and Sleep Medicine means comprehensive care for interconnected conditions under one roof.'],
]);
$seed('field_healen_home_insurance_heading', 'home_insurance_heading', 'We work with most insurance plans.');
$seed('field_healen_home_insurance_text', 'home_insurance_text', 'Synergy ENT & Wellness is an out-of-network practice. We are happy to provide documentation to help you submit claims to your insurance carrier for potential reimbursement.');
$seed('field_healen_home_banner_heading', 'home_banner_heading', 'Synergy ENT addresses what traditional care overlooks. How you actually feel.');
$seed('field_healen_home_banner_note', 'home_banner_note', 'Now accepting new patients in Paramus, NJ');
$seed('field_healen_home_location_heading', 'home_location_heading', 'Our Location');
$seed('field_healen_home_location_region', 'home_location_region', 'New Jersey');
$seed('field_healen_home_location_city', 'home_location_city', 'Paramus');
$seed('field_healen_home_location_address', 'home_location_address', "37 West Century Road, Suite 104\nParamus, NJ 07652");
$seed('field_healen_home_location_hours', 'home_location_hours', 'Mon - Fri: 9am - 5pm');
$seed('field_healen_home_location_map_embed', 'home_location_map_embed', 'https://www.openstreetmap.org/export/embed.html?bbox=-74.1810%2C40.8912%2C-73.9810%2C40.9912&layer=mapnik&marker=40.9512%2C-74.0710');
$seed('field_healen_home_location_tags', 'home_location_tags', [
    ['label' => 'ENT'],
    ['label' => 'Sleep Medicine'],
    ['label' => 'Allergy'],
    ['label' => 'Sinus Care'],
]);
$seed('field_healen_home_cta_heading', 'home_cta_heading', 'Ready to Breathe Better');
$seed('field_healen_home_cta_highlight', 'home_cta_highlight', 'and Sleep Sounder?');
$seed('field_healen_home_cta_text', 'home_cta_text', 'New and returning patients are welcome. Reach out today to schedule your appointment with Dr. Scheid at our Paramus, NJ office.');

WP_CLI::success('Homepage section fields are ready.');
