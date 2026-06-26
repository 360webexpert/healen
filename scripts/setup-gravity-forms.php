<?php
/**
 * Create/update the Gravity Forms used by the Healen Design theme.
 *
 * Run with:
 * wp --path=/opt/homebrew/var/www/wp3 eval-file wp-content/themes/Healen-Design/scripts/setup-gravity-forms.php
 *
 * @package HealenDesign
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('GFAPI')) {
    WP_CLI::error('Gravity Forms is not active.');
}

/**
 * Add or update a managed Gravity Form.
 */
function healen_upsert_gravity_form(string $option_name, array $form): int
{
    $existing_id = (int) get_option($option_name, 0);

    if ($existing_id > 0 && GFAPI::get_form($existing_id)) {
        $form['id'] = $existing_id;
        $result = GFAPI::update_form($form);

        if (is_wp_error($result)) {
            WP_CLI::error($result->get_error_message());
        }

        return $existing_id;
    }

    $new_id = GFAPI::add_form($form);

    if (is_wp_error($new_id)) {
        WP_CLI::error($new_id->get_error_message());
    }

    update_option($option_name, (int) $new_id, false);

    return (int) $new_id;
}

$notification_email = get_option('admin_email');
if (function_exists('healen_option')) {
    $theme_email = healen_option('healen_email', '');
    if (is_string($theme_email) && is_email($theme_email)) {
        $notification_email = $theme_email;
    }
}

$base_settings = [
    'is_active' => true,
    'button'    => [
        'type' => 'text',
        'text' => 'Submit',
    ],
    'confirmations' => [
        [
            'id'        => 'default_confirmation',
            'name'      => 'Default Confirmation',
            'isDefault' => true,
            'type'      => 'message',
            'message'   => 'Thank you. A member of our team will contact you shortly.',
        ],
    ],
];

$contact_id = healen_upsert_gravity_form('healen_gravity_contact_form_id', array_merge($base_settings, [
    'title'         => 'Healen Contact Form',
    'description'   => 'Contact form for Synergy ENT & Wellness.',
    'labelPlacement' => 'top_label',
    'button'        => [
        'type' => 'text',
        'text' => 'Send Message',
    ],
    'fields'        => [
        [
            'id'          => 1,
            'type'        => 'text',
            'label'       => 'Full Name',
            'placeholder' => 'Full Name',
            'isRequired'  => true,
            'size'        => 'large',
        ],
        [
            'id'          => 2,
            'type'        => 'email',
            'label'       => 'Email Address',
            'placeholder' => 'Email Address',
            'isRequired'  => true,
            'size'        => 'large',
        ],
        [
            'id'          => 3,
            'type'        => 'phone',
            'label'       => 'Phone Number',
            'placeholder' => 'Phone Number',
            'phoneFormat' => 'standard',
            'size'        => 'large',
        ],
        [
            'id'          => 4,
            'type'        => 'select',
            'label'       => 'Reason for Visit',
            'placeholder' => 'Select a reason...',
            'choices'     => [
                ['text' => 'General Inquiry', 'value' => 'General Inquiry'],
                ['text' => 'Book an Appointment', 'value' => 'Book an Appointment'],
                ['text' => 'Sleep Medicine / Sleep Apnea', 'value' => 'Sleep Medicine / Sleep Apnea'],
                ['text' => 'ENT / Sinus / Allergy', 'value' => 'ENT / Sinus / Allergy'],
                ['text' => 'Insurance Question', 'value' => 'Insurance Question'],
                ['text' => 'Referral', 'value' => 'Referral'],
                ['text' => 'Other', 'value' => 'Other'],
            ],
            'size'        => 'large',
        ],
        [
            'id'          => 5,
            'type'        => 'textarea',
            'label'       => 'Message',
            'placeholder' => 'Message',
            'isRequired'  => true,
            'size'        => 'large',
        ],
    ],
    'notifications' => [
        'admin_notification' => [
            'id'      => 'admin_notification',
            'name'    => 'Admin Notification',
            'event'   => 'form_submission',
            'toType'  => 'email',
            'to'      => $notification_email,
            'subject' => 'New website contact message',
            'message' => '{all_fields}',
        ],
    ],
]));

$new_patient_id = healen_upsert_gravity_form('healen_gravity_new_patient_form_id', array_merge($base_settings, [
    'title'         => 'Healen New Patient Request',
    'description'   => 'New patient request form for Synergy ENT & Wellness.',
    'labelPlacement' => 'top_label',
    'button'        => [
        'type' => 'text',
        'text' => 'Request Appointment',
    ],
    'fields'        => [
        [
            'id'          => 1,
            'type'        => 'text',
            'label'       => 'Full Name',
            'placeholder' => 'Full Name',
            'isRequired'  => true,
            'size'        => 'large',
        ],
        [
            'id'          => 2,
            'type'        => 'email',
            'label'       => 'Email Address',
            'placeholder' => 'Email Address',
            'isRequired'  => true,
            'size'        => 'large',
        ],
        [
            'id'          => 3,
            'type'        => 'phone',
            'label'       => 'Phone Number',
            'placeholder' => 'Phone Number',
            'phoneFormat' => 'standard',
            'isRequired'  => true,
            'size'        => 'large',
        ],
        [
            'id'      => 4,
            'type'    => 'select',
            'label'   => 'Preferred Appointment Type',
            'choices' => [
                ['text' => 'ENT Consultation', 'value' => 'ENT Consultation'],
                ['text' => 'Sleep Medicine Consultation', 'value' => 'Sleep Medicine Consultation'],
                ['text' => 'Sinus / Allergy Evaluation', 'value' => 'Sinus / Allergy Evaluation'],
                ['text' => 'Second Opinion', 'value' => 'Second Opinion'],
                ['text' => 'Not Sure Yet', 'value' => 'Not Sure Yet'],
            ],
            'size'    => 'large',
        ],
        [
            'id'          => 5,
            'type'        => 'textarea',
            'label'       => 'How can we help?',
            'placeholder' => 'Tell us a little about your symptoms or scheduling needs.',
            'size'        => 'large',
        ],
    ],
    'notifications' => [
        'admin_notification' => [
            'id'      => 'admin_notification',
            'name'    => 'Admin Notification',
            'event'   => 'form_submission',
            'toType'  => 'email',
            'to'      => $notification_email,
            'subject' => 'New patient request from website',
            'message' => '{all_fields}',
        ],
    ],
]));

WP_CLI::success(sprintf('Gravity Forms ready. Contact: %d, New Patient: %d', $contact_id, $new_patient_id));
