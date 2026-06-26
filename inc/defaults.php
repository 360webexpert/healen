<?php
/**
 * Default content used before ACF fields are edited.
 *
 * @package HealenDesign
 */

if (!defined('ABSPATH')) {
    exit;
}

function healen_defaults(): array
{
    $contact_url = function_exists('home_url') ? home_url('/contact/') : '/contact/';

    return [
        'booking_url' => 'https://healow.com',
        'portal_url' => '#',
        'phone' => '(201) 453-4540',
        'email' => 'Info@synergyentwellness.com',
        'address' => "37 West Century Road, Suite 104\nParamus, NJ 07652",
        'footer_text' => 'Board-certified ENT and sleep medicine care - so you can feel like yourself again.',
        'home' => [
            'hero_title' => 'Still congested, snoring, tired, or struggling with CPAP?',
            'hero_intro' => 'Board-certified ENT and sleep medicine care - so you can feel like yourself again.',
            'hero_body' => 'Dr. Sara Scheid is a board-certified sleep medicine and otolaryngology physician helping patients understand why they cannot breathe or sleep well and what to do next.',
            'credentials' => [
                ['title' => 'Board Certified', 'text' => 'Otolaryngologist'],
                ['title' => 'Sleep Medicine', 'text' => 'Certified Specialist'],
                ['title' => '20+ Years', 'text' => 'of Experience'],
                ['title' => 'Accepting', 'text' => 'New Patients'],
            ],
            'specialties' => ['Hearing & Balance', 'Sinusitis & Allergy', 'Nasal Surgery', 'Throat & Voice', 'Sleep & Airway'],
            'services' => [
                ['title' => 'Sleep Apnea, Snoring & CPAP Intolerance', 'text' => 'Evaluation for patients who continue to feel tired, congested, or frustrated despite CPAP or other sleep apnea treatment.'],
                ['title' => 'Nasal Obstruction & Chronic Congestion', 'text' => 'Assessment of nasal blockage, chronic congestion, sinus symptoms, mouth breathing, postnasal drip, allergies, and structural causes of poor nasal breathing.'],
                ['title' => 'ENT/Sleep Airway Evaluation', 'text' => 'A comprehensive look at how the nose, throat, airway, sleep quality, reflux, allergies, and inflammation may be connected.'],
                ['title' => 'Second Opinions', 'text' => 'For patients who have already tried treatment, had testing, or received recommendations but still do not have a clear answer.'],
                ['title' => 'Reflux & Throat Symptoms', 'text' => 'Evaluation of throat clearing, chronic cough, hoarseness, globus sensation, postnasal drip sensation, and reflux-related throat irritation.'],
                ['title' => 'Non-Surgical ENT & Sleep Care', 'text' => 'Thoughtful medical evaluation and management, with referral for surgical opinions when appropriate.'],
            ],
            'testimonials' => [
                ['quote' => 'Dr. Scheid has been an enormous asset to my family for over ten years. Her skill and expertise is unparalleled - she goes above and beyond in every way.', 'name' => 'Long-Term Patient', 'procedure' => 'ENT & Sleep Care', 'initials' => 'LP', 'color' => '#1D3A5F'],
                ['quote' => "She fixed my sinus problem that had been bothering me for years. I can't say enough good things about her and her staff.", 'name' => 'Sinus Patient', 'procedure' => 'Sinus Care', 'initials' => 'SP', 'color' => '#809EB1'],
                ['quote' => 'Dr. Scheid and her team worked so hard to make sure I was taken care of. I will be a patient here for life.', 'name' => 'Satisfied Patient', 'procedure' => 'ENT Care', 'initials' => 'SA', 'color' => '#BBDBED'],
                ['quote' => 'She is everything you want in a doctor. Caring, knowledgeable, and she truly loves what she does.', 'name' => 'Sleep Medicine Patient', 'procedure' => 'Sleep Medicine', 'initials' => 'SM', 'color' => '#2A5080'],
            ],
        ],
        'about' => [
            'title' => 'Care That Takes You Seriously.',
            'body' => [
                'Dr. Sara Scheid is a board-certified ENT and sleep medicine physician in Paramus, NJ, specializing in thoughtful evaluation of breathing, sleep, and airway-related concerns. She helps patients with nasal obstruction, chronic congestion, allergies, snoring, sleep apnea, CPAP intolerance, mouth breathing, throat clearing, reflux-related throat symptoms, and complex ENT/sleep issues that have not improved with standard treatment.',
                'As both an otolaryngologist and sleep medicine physician, Dr. Scheid is able to look beyond a single symptom and evaluate how the nose, throat, airway, sleep quality, allergies, reflux, and inflammation may be connected. Her approach is careful, educational, and personalized, with a focus on helping patients understand their symptoms and make confident decisions about next steps.',
                'At Synergy ENT & Wellness, patients receive unrushed, patient-driven care designed to provide solutions to help you breathe better, sleep better, and gain control of your health.',
            ],
            'credentials' => [
                ['title' => 'Board Certifications', 'items' => "Diplomate - American Board of Otolaryngology\nDiplomate - American Board of Sleep Medicine\nFellow - American Academy of Pediatrics"],
                ['title' => 'Education & Training', 'items' => "Dartmouth College (Undergraduate)\nRush Medical College, MD - Alpha Omega Alpha\nThomas Jefferson University Hospital\nSt. Christopher's Hospital for Children"],
            ],
            'approach' => [
                ['icon' => '🔍', 'title' => 'Root-Cause Focused', 'text' => 'Dr. Scheid evaluates the full picture - how breathing, sleep, allergies, and inflammation interact.'],
                ['icon' => '🕐', 'title' => 'Unrushed Appointments', 'text' => 'Every visit is unhurried by design, with time to explain your concerns and understand your options.'],
                ['icon' => '🤝', 'title' => 'Personalized Plans', 'text' => 'Treatment plans are built around your symptoms, history, and goals.'],
                ['icon' => '🧠', 'title' => 'Dual Specialization', 'text' => 'ENT and sleep medicine expertise in one physician-led practice.'],
            ],
        ],
        'services_sleep' => [
            ['icon' => '🌙', 'title' => 'Sleep Apnea', 'text' => 'Evaluation and treatment for obstructive sleep apnea from diagnosis to therapy selection.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
            ['icon' => '💨', 'title' => 'Snoring', 'text' => 'Comprehensive snoring evaluation to rule out airway problems and sleep-disordered breathing.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
            ['icon' => '⚙️', 'title' => 'CPAP Troubleshooting', 'text' => 'Help optimizing therapy, mask fit, pressure settings, and alternatives.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
            ['icon' => '🕐', 'title' => 'Circadian Rhythm Disorders', 'text' => 'Diagnosis and management of internal clock disruptions.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
            ['icon' => '😴', 'title' => 'Insomnia', 'text' => 'Evidence-based insomnia evaluation with assessment for underlying contributors.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
            ['icon' => '🧠', 'title' => 'Hypersomnia & Fatigue', 'text' => 'Workup for excessive daytime sleepiness and persistent fatigue.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
        ],
        'services_ent' => [
            ['icon' => '👃', 'title' => 'Nasal Obstruction', 'text' => 'Evaluation of blocked breathing due to septum, turbinate, valve, or inflammation problems.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
            ['icon' => '💧', 'title' => 'Chronic Sinusitis', 'text' => 'Workup for recurrent sinus infections, polyps, and pressure.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
            ['icon' => '🌿', 'title' => 'Allergies', 'text' => 'Testing and treatment for environmental and seasonal allergies.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
            ['icon' => '🦻', 'title' => 'Ear Conditions', 'text' => 'Evaluation of infections, hearing loss, tinnitus, dizziness, and Eustachian tube dysfunction.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
            ['icon' => '🗣️', 'title' => 'Throat & Voice', 'text' => 'Assessment of hoarseness, chronic throat clearing, globus, reflux, and voice changes.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
            ['icon' => '👶', 'title' => 'Pediatric ENT', 'text' => 'Pediatric otolaryngology care for ear, tonsil, adenoid, and airway concerns.', 'link' => ['title' => 'Learn More', 'url' => $contact_url, 'target' => '']],
        ],
        'new_patient_cards' => [
            ['icon' => 'file-text', 'color' => '#1D3A5F', 'title' => 'Before Your Appointment', 'items' => "Complete the online registration form\nGather your insurance information\nList all current medications\nNote any allergies you have\nWrite down your symptoms and concerns\nRequest records from prior providers if relevant"],
            ['icon' => 'clipboard', 'color' => '#809EB1', 'title' => 'What to Bring', 'items' => "Valid photo ID (driver's license or passport)\nInsurance cards (all applicable)\nReferral from your primary doctor (if required)\nList of current medications\nPrevious medical records (if available)\nSleep study results (if you have them)"],
            ['icon' => 'shield', 'color' => '#1D3A5F', 'title' => 'Insurance & Billing', 'items' => "We work with most major insurance plans\nSynergy ENT & Wellness is an out-of-network practice\nWe provide documentation to assist with reimbursement\nNo Medicare accepted at this time\nPayment is due at the time of service\nWe can discuss billing questions prior to your visit"],
            ['icon' => 'clock', 'color' => '#809EB1', 'title' => 'Office Policies', 'items' => "Please arrive 15 minutes early for paperwork\nBring a list of all medications and supplements\n24-hour notice required for cancellations\nLate arrivals may need to reschedule\nChildren are welcome - please bring a guardian\nQuestions? Call us at (201) 453-4540"],
        ],
        'hours' => [
            ['day' => 'Monday', 'time' => '8:00am - 4:30pm'],
            ['day' => 'Tuesday', 'time' => '8:00am - 4:30pm'],
            ['day' => 'Wednesday', 'time' => '8:00am - 4:30pm'],
            ['day' => 'Thursday', 'time' => '8:00am - 4:30pm'],
            ['day' => 'Friday', 'time' => '8:00am - 12:00pm'],
            ['day' => 'Saturday', 'time' => 'Closed'],
            ['day' => 'Sunday', 'time' => 'Closed'],
        ],
    ];
}
