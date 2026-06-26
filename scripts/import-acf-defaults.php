<?php
/**
 * Import Healen static React content into ACF fields.
 *
 * Run with:
 * wp --path=/opt/homebrew/var/www/wp3 eval-file wp-content/themes/Healen-Design/scripts/import-acf-defaults.php
 */

if (!defined('ABSPATH')) {
    fwrite(STDERR, "Run this through WP-CLI.\n");
    exit(1);
}

if (!function_exists('update_field')) {
    fwrite(STDERR, "ACF is not active.\n");
    exit(1);
}

$theme_dir = get_template_directory();
$defaults = function_exists('healen_defaults') ? healen_defaults() : [];

function healen_import_page_id(string $slug): int
{
    $page = get_page_by_path($slug);

    if (!$page instanceof WP_Post) {
        fwrite(STDERR, "Missing page: {$slug}\n");
        exit(1);
    }

    return (int) $page->ID;
}

function healen_import_media(string $file, string $title): int
{
    $source = get_template_directory() . '/assets/images/' . $file;
    if (!file_exists($source)) {
        fwrite(STDERR, "Missing image: {$source}\n");
        exit(1);
    }

    $existing = get_posts([
        'post_type'      => 'attachment',
        'post_status'    => 'inherit',
        'posts_per_page' => 1,
        'fields'         => 'ids',
        'meta_key'       => '_healen_source_image',
        'meta_value'     => $file,
    ]);

    if (!empty($existing)) {
        return (int) $existing[0];
    }

    $upload = wp_upload_bits(basename($file), null, (string) file_get_contents($source));
    if (!empty($upload['error'])) {
        fwrite(STDERR, "Could not upload {$file}: {$upload['error']}\n");
        exit(1);
    }

    $attachment_id = wp_insert_attachment([
        'post_mime_type' => wp_check_filetype($upload['file'])['type'] ?? 'image/png',
        'post_title'     => $title,
        'post_content'   => '',
        'post_status'    => 'inherit',
    ], $upload['file']);

    if (is_wp_error($attachment_id)) {
        fwrite(STDERR, "Could not create attachment for {$file}: {$attachment_id->get_error_message()}\n");
        exit(1);
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    $metadata = wp_generate_attachment_metadata((int) $attachment_id, $upload['file']);
    wp_update_attachment_metadata((int) $attachment_id, $metadata);
    update_post_meta((int) $attachment_id, '_healen_source_image', $file);

    return (int) $attachment_id;
}

function healen_import_update(string $field_key, mixed $value, int|string $post_id): void
{
    update_field($field_key, $value, $post_id);
}

$home_id = healen_import_page_id('home');
$about_id = healen_import_page_id('about');
$services_id = healen_import_page_id('services');
$new_patient_id = healen_import_page_id('new-patient');
$contact_id = healen_import_page_id('contact');

$logo_light = healen_import_media('logo-white-orig.png', 'Synergy ENT Wellness Logo White');
$logo_dark = healen_import_media('logo-dark.png', 'Synergy ENT Wellness Logo Dark');
$hero_sleep = healen_import_media('hero-sleep.png', 'Restful Sleep Hero');
$doctor = healen_import_media('dr-scheid-about.png', 'Dr Sara Scheid');

healen_import_update('field_healen_logo_light', $logo_light, 'option');
healen_import_update('field_healen_logo_dark', $logo_dark, 'option');
healen_import_update('field_healen_phone', $defaults['phone'], 'option');
healen_import_update('field_healen_email', $defaults['email'], 'option');
healen_import_update('field_healen_address', $defaults['address'], 'option');
healen_import_update('field_healen_footer_text', $defaults['footer_text'], 'option');
healen_import_update('field_healen_booking_link', [
    'title'  => 'Book Appointment',
    'url'    => $defaults['booking_url'],
    'target' => '_blank',
], 'option');
healen_import_update('field_healen_portal_link', [
    'title'  => 'Patient Portal',
    'url'    => $defaults['portal_url'],
    'target' => '',
], 'option');

$home = $defaults['home'];
healen_import_update('field_healen_home_hero_title', $home['hero_title'], $home_id);
healen_import_update('field_healen_home_hero_intro', $home['hero_intro'], $home_id);
healen_import_update('field_healen_home_hero_body', $home['hero_body'], $home_id);
healen_import_update('field_healen_home_hero_image', $hero_sleep, $home_id);
healen_import_update('field_healen_home_credentials', $home['credentials'], $home_id);
healen_import_update('field_healen_home_specialties', array_map(
    static fn(string $label): array => ['label' => $label],
    $home['specialties']
), $home_id);
healen_import_update('field_healen_home_services_heading', 'Specialized Care for Every ENT & Sleep Need', $home_id);
healen_import_update('field_healen_home_services_intro', 'From ear infections to obstructive sleep apnea, we treat the full spectrum of ear, nose, throat, and sleep concerns.', $home_id);
healen_import_update('field_healen_home_services', $home['services'], $home_id);
healen_import_update('field_healen_home_callout', 'You may have been told your sleep study is "treated," your sinuses are "fine," or your symptoms are "just allergies" - but you still cannot breathe or sleep well.', $home_id);
healen_import_update('field_healen_home_testimonials', $home['testimonials'], $home_id);
healen_import_update('field_healen_home_about_heading', $defaults['about']['title'], $home_id);
healen_import_update('field_healen_home_about_image', $doctor, $home_id);
healen_import_update('field_healen_home_about_body', array_map(
    static fn(string $text): array => ['text' => $text],
    $defaults['about']['body']
), $home_id);
healen_import_update('field_healen_home_about_credentials', $defaults['about']['credentials'], $home_id);
healen_import_update('field_healen_home_practice_heading', 'A Practice Built Around You', $home_id);
healen_import_update('field_healen_home_practice_intro', 'Synergy ENT & Wellness is led by Dr. Sara C. Scheid, MD - one of the few physicians in New Jersey board-certified in both Otolaryngology and Sleep Medicine.', $home_id);
healen_import_update('field_healen_home_why_heading', 'A Different Approach to ENT Care', $home_id);
healen_import_update('field_healen_home_why_items', [
    ['title' => 'Patient-First Philosophy', 'text' => 'We take a holistic approach, searching for root causes and developing treatment plans tailored to your life.'],
    ['title' => 'Unrushed Appointments', 'text' => 'We moved away from corporate medicine to spend more time with you - listening, explaining, and partnering in your care.'],
    ['title' => 'Dual Board Certification', 'text' => 'Dual expertise in ENT and Sleep Medicine means comprehensive care for interconnected conditions under one roof.'],
], $home_id);
healen_import_update('field_healen_home_insurance_heading', 'We work with most insurance plans.', $home_id);
healen_import_update('field_healen_home_insurance_text', 'Synergy ENT & Wellness is an out-of-network practice. We are happy to provide documentation to help you submit claims to your insurance carrier for potential reimbursement.', $home_id);
healen_import_update('field_healen_home_banner_heading', 'Synergy ENT addresses what traditional care overlooks. How you actually feel.', $home_id);
healen_import_update('field_healen_home_banner_note', 'Now accepting new patients in Paramus, NJ', $home_id);
healen_import_update('field_healen_home_location_heading', 'Our Location', $home_id);
healen_import_update('field_healen_home_location_region', 'New Jersey', $home_id);
healen_import_update('field_healen_home_location_city', 'Paramus', $home_id);
healen_import_update('field_healen_home_location_address', $defaults['address'], $home_id);
healen_import_update('field_healen_home_location_hours', 'Mon - Fri: 9am - 5pm', $home_id);
healen_import_update('field_healen_home_location_map_embed', 'https://www.openstreetmap.org/export/embed.html?bbox=-74.1810%2C40.8912%2C-73.9810%2C40.9912&layer=mapnik&marker=40.9512%2C-74.0710', $home_id);
healen_import_update('field_healen_home_location_tags', [
    ['label' => 'ENT'],
    ['label' => 'Sleep Medicine'],
    ['label' => 'Allergy'],
    ['label' => 'Sinus Care'],
], $home_id);
healen_import_update('field_healen_home_cta_heading', 'Ready to Breathe Better', $home_id);
healen_import_update('field_healen_home_cta_highlight', 'and Sleep Sounder?', $home_id);
healen_import_update('field_healen_home_cta_text', 'New and returning patients are welcome. Reach out today to schedule your appointment with Dr. Scheid at our Paramus, NJ office.', $home_id);

$about = $defaults['about'];
healen_import_update('field_healen_about_heading', $about['title'], $about_id);
healen_import_update('field_healen_about_doctor_image', $doctor, $about_id);
healen_import_update('field_healen_about_doctor_image_alt', 'Dr. Sara Scheid', $about_id);
healen_import_update('field_healen_about_body', array_map(
    static fn(string $text): array => ['text' => $text],
    $about['body']
), $about_id);
healen_import_update('field_healen_about_bio_primary_button', ['title' => 'Book an Appointment', 'url' => $defaults['booking_url'], 'target' => '_blank'], $about_id);
healen_import_update('field_healen_about_bio_secondary_button', ['title' => 'Contact the Office', 'url' => home_url('/contact/'), 'target' => ''], $about_id);
healen_import_update('field_healen_about_credentials', $about['credentials'], $about_id);
healen_import_update('field_healen_about_approach', $about['approach'], $about_id);
healen_import_update('field_healen_about_cta_primary_button', ['title' => 'Book an Appointment', 'url' => $defaults['booking_url'], 'target' => '_blank'], $about_id);
healen_import_update('field_healen_about_cta_secondary_button', ['title' => 'Contact the Office', 'url' => home_url('/contact/'), 'target' => ''], $about_id);

healen_import_update('field_healen_services_sleep_heading', 'Sleep Care Services', $services_id);
healen_import_update('field_healen_services_sleep_intro', 'Dr. Scheid is board-certified in sleep medicine with expertise in the full spectrum of sleep disorders.', $services_id);
healen_import_update('field_healen_services_sleep', $defaults['services_sleep'], $services_id);
healen_import_update('field_healen_services_banner_button', ['title' => 'Book a Consultation', 'url' => $defaults['booking_url'], 'target' => '_blank'], $services_id);
healen_import_update('field_healen_services_ent_heading', 'ENT Services', $services_id);
healen_import_update('field_healen_services_ent_intro', 'From ear infections to nasal surgery, Dr. Scheid provides comprehensive otolaryngology care.', $services_id);
healen_import_update('field_healen_services_ent', $defaults['services_ent'], $services_id);
healen_import_update('field_healen_services_cta_primary_button', ['title' => 'Book an Appointment', 'url' => $defaults['booking_url'], 'target' => '_blank'], $services_id);
healen_import_update('field_healen_services_cta_secondary_button', ['title' => 'Call ' . $defaults['phone'], 'url' => 'tel:' . preg_replace('/[^0-9+]/', '', $defaults['phone']), 'target' => ''], $services_id);

healen_import_update('field_healen_new_patient_heading', "We're excited to welcome you as a new patient.", $new_patient_id);
healen_import_update('field_healen_new_patient_intro', 'Please review the information below to prepare for your first visit. If you have any questions before coming in, our team is happy to help - just give us a call at (201) 453-4540.', $new_patient_id);
healen_import_update('field_healen_new_patient_cards', $defaults['new_patient_cards'], $new_patient_id);
healen_import_update('field_healen_new_patient_hours', $defaults['hours'], $new_patient_id);
healen_import_update('field_healen_new_patient_insurance', 'Synergy ENT & Wellness is an out-of-network practice. We are happy to provide documentation to help you submit claims to your insurance carrier for potential reimbursement. We do not currently accept Medicare.', $new_patient_id);
healen_import_update('field_healen_new_patient_coverage_button', ['title' => $defaults['phone'], 'url' => 'tel:' . preg_replace('/[^0-9+]/', '', $defaults['phone']), 'target' => ''], $new_patient_id);
healen_import_update('field_healen_new_patient_cta_primary_button', ['title' => 'Book an Appointment', 'url' => $defaults['booking_url'], 'target' => '_blank'], $new_patient_id);
healen_import_update('field_healen_new_patient_cta_secondary_button', ['title' => 'Contact the Office', 'url' => home_url('/contact/'), 'target' => ''], $new_patient_id);

healen_import_update('field_healen_contact_heading', 'Get In Touch', $contact_id);
healen_import_update('field_healen_contact_intro', 'Please use the form below to share your questions or feedback. A member of our team will get back to you promptly.', $contact_id);
healen_import_update('field_healen_contact_map_embed', 'https://maps.google.com/maps?q=37+West+Century+Road+Suite+104+Paramus+NJ+07652&output=embed', $contact_id);
healen_import_update('field_healen_contact_directions_link', ['title' => 'Get Directions', 'url' => 'https://maps.google.com/?q=' . rawurlencode(str_replace("\n", ' ', $defaults['address'])), 'target' => '_blank'], $contact_id);
healen_import_update('field_healen_contact_phone_link', ['title' => 'Call Now', 'url' => 'tel:' . preg_replace('/[^0-9+]/', '', $defaults['phone']), 'target' => ''], $contact_id);
healen_import_update('field_healen_contact_email_link', ['title' => 'Send Email', 'url' => 'mailto:' . $defaults['email'], 'target' => ''], $contact_id);
healen_import_update('field_healen_contact_cta_button', ['title' => 'Book Online', 'url' => $defaults['booking_url'], 'target' => '_blank'], $contact_id);

printf(
    "Imported ACF defaults. Pages: home=%d about=%d services=%d new-patient=%d contact=%d. Images: logo_light=%d logo_dark=%d hero=%d doctor=%d\n",
    $home_id,
    $about_id,
    $services_id,
    $new_patient_id,
    $contact_id,
    $logo_light,
    $logo_dark,
    $hero_sleep,
    $doctor
);
