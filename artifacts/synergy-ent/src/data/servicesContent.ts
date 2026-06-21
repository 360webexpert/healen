export type ServiceSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type ServiceData = {
  slug: string;
  title: string;
  subtitle: string;
  category: "sleep" | "ent";
  intro: string;
  sections: ServiceSection[];
  whenToSeek: string[];
  ctaHeading?: string;
};

export const servicesContent: ServiceData[] = [
  {
    slug: "sleep-apnea",
    title: "Sleep Apnea",
    subtitle: "Obstructive Sleep Apnea (OSA)",
    category: "sleep",
    intro:
      "Sleep apnea is more than just snoring. It's a condition where your airway repeatedly narrows or closes during sleep — sometimes dozens or hundreds of times a night — preventing your body from getting the rest it needs. Many people don't realize they have it. If you're waking up exhausted, struggling to focus, or your partner keeps nudging you about your breathing at night, sleep apnea could be the reason.",
    sections: [
      {
        heading: "What's Actually Happening",
        body: "During sleep, the muscles in your throat relax. For some people, that relaxation causes the airway to partially or fully collapse. Common contributors include:",
        items: [
          "A deviated septum or enlarged turbinates",
          "Enlarged tonsils or adenoids",
          "Excess soft tissue in the throat or at the base of the tongue",
          "Weight changes or shifts in airway anatomy",
        ],
      },
      {
        heading: "Signs You Might Have Sleep Apnea",
        items: [
          "Loud or persistent snoring",
          "Waking up gasping or feeling like you stopped breathing",
          "Daytime exhaustion — even after a full night's sleep",
          "Morning headaches or brain fog",
          "Mood changes or difficulty concentrating",
          "A bed partner noticing pauses in your breathing",
        ],
      },
      {
        heading: "Why It's Worth Treating",
        body: "Left untreated, OSA doesn't just affect your sleep — it puts real strain on your overall health. It's linked to high blood pressure, heart disease, stroke, diabetes, and an increased risk of accidents from chronic fatigue. The good news: the right treatment can make a significant difference.",
      },
      {
        heading: "How We Diagnose It",
        body: "We start with a detailed look at your airway and medical history. If sleep apnea is likely, we'll recommend a sleep study — often done at home — to measure your breathing patterns, oxygen levels, and sleep stages.",
      },
      {
        heading: "Treatment Options",
        items: [
          "CPAP Therapy — A device that keeps your airway open with gentle air pressure. Highly effective for moderate to severe OSA.",
          "Oral Appliance Therapy — A custom mouthpiece that repositions the jaw and tongue to keep the airway clear.",
          "Nasal Treatment — If a deviated septum or enlarged turbinates are contributing, medical treatment or a minor procedure may help.",
          "Surgery — In some cases, structural issues in the throat or airway are best addressed surgically.",
          "Lifestyle Changes — Weight management and positional adjustments can also meaningfully reduce symptoms.",
        ],
      },
      {
        heading: "Our Approach at Synergy ENT & Wellness",
        body: "We look at the full picture. The airway runs from your nose to your throat, and obstruction can happen anywhere along that path. Rather than defaulting to a single treatment, we evaluate the entire airway to understand what's driving your symptoms — then build a plan around that.",
      },
    ],
    whenToSeek: [
      "You snore most nights",
      "You wake up tired no matter how long you sleep",
      "You experience morning headaches or brain fog",
      "You've been told you stop breathing during sleep",
    ],
  },

  {
    slug: "snoring",
    title: "Snoring",
    subtitle: "When Snoring Is More Than Noise",
    category: "sleep",
    intro:
      "Nearly 40% of adults snore — but that doesn't mean it should be ignored. While occasional snoring is usually harmless, frequent or loud snoring can signal an underlying airway issue, including obstructive sleep apnea. Snoring happens when the airway narrows during sleep and air passing through causes the soft tissues of the throat to vibrate. The real question is: why is your airway narrowing?",
    sections: [
      {
        heading: "Common Causes",
        body: "Snoring can originate from more than one part of the airway, which is why pinpointing the source matters before jumping to treatment. Common contributors include:",
        items: [
          "Nasal obstruction — a deviated septum, enlarged turbinates, chronic congestion, or allergies",
          "Soft palate and throat relaxation — muscles loosen during sleep, narrowing the airway",
          "Tongue position — the tongue can fall back and partially block airflow",
          "Weight changes — extra tissue around the airway can reduce breathing space",
          "Alcohol or sedatives — both relax airway muscles and tend to make snoring worse",
        ],
      },
      {
        heading: "Could It Be Sleep Apnea?",
        body: "Not everyone who snores has sleep apnea — but many people with sleep apnea do snore loudly. It's worth getting checked if your snoring comes with any of these:",
        items: [
          "Pauses in breathing during sleep",
          "Waking up gasping or choking",
          "Daytime fatigue no matter how much you sleep",
          "Morning headaches or brain fog",
          "Trouble concentrating",
          "High blood pressure",
        ],
      },
      {
        heading: "How We Evaluate It",
        body: "We start with a thorough review of your symptoms and a detailed examination of your nose and airway. Since obstruction can occur at the level of the nose, palate, tongue, or throat, we look at the full picture rather than assuming a single cause. If sleep apnea is a concern, we may recommend a home or in-lab sleep study.",
      },
      {
        heading: "Treatment Options",
        body: "Treatment is matched to the cause. Depending on what's driving your snoring, options may include:",
        items: [
          "Improving nasal airflow — allergy treatment, nasal medications, septoplasty, or turbinate reduction",
          "Oral appliance therapy — a custom device that repositions the jaw or tongue",
          "Positional therapy — sometimes sleep position alone plays a meaningful role",
          "Weight management — even modest changes can open up airway space significantly",
          "CPAP therapy — if sleep apnea is confirmed, CPAP is often the most effective option",
          "Minimally invasive procedures — targeted airway procedures can reduce snoring with minimal downtime",
        ],
      },
    ],
    whenToSeek: [
      "Your snoring is loud, frequent, or getting worse",
      "It's disrupting your sleep — or your partner's",
      "You wake up tired or foggy despite a full night's rest",
      "Someone has noticed you stop breathing during sleep",
    ],
  },

  {
    slug: "cpap",
    title: "CPAP Troubleshooting",
    subtitle: "Still Tired Even Though You Use CPAP?",
    category: "sleep",
    intro:
      "CPAP is one of the most effective treatments for sleep apnea — but it doesn't work perfectly for everyone, and using it consistently doesn't always mean you'll wake up feeling rested. If you're doing everything right and still exhausted, you're not imagining it. There's usually a reason, and it's worth finding out what it is.",
    sections: [
      {
        heading: "Why It Might Not Be Working as Well as It Should",
        items: [
          "Your settings may need adjusting — If the pressure is even slightly off, your airway may still be partially collapsing. CPAP machines collect data; a follow-up review can show whether your breathing events are actually being controlled.",
          "Your mask may not be fitting well — A leaking or uncomfortable mask disrupts sleep more than most people realize. The right mask type and fit can make a real difference.",
          "Nasal congestion is getting in the way — CPAP works best when you can breathe comfortably through your nose. A deviated septum, enlarged turbinates, chronic congestion, or allergies can all make CPAP harder to tolerate.",
          "You may not be getting enough sleep overall — CPAP can control your apnea and you can still be tired if you're only getting five or six hours a night.",
          "Another sleep disorder may be involved — Sleep apnea sometimes coexists with periodic limb movement disorder, insomnia, circadian rhythm disruption, or hypersomnia.",
          "A medical factor may be contributing — Thyroid issues, iron deficiency, hormonal changes, depression, anxiety, and certain medications can all cause fatigue that looks like a sleep problem.",
        ],
      },
      {
        heading: "Signs It's Time for a Follow-Up",
        items: [
          "You're using CPAP regularly but still waking up tired",
          "Your mask leaks or causes frequent wake-ups",
          "You're still snoring with the mask on",
          "Fatigue is affecting your focus, mood, or daily life",
        ],
      },
      {
        heading: "What Comes Next",
        body: "Persistent fatigue despite CPAP use is a solvable problem in most cases — it just requires figuring out the right piece that's missing. That might mean adjusting your settings, addressing a nasal issue, screening for another sleep disorder, or looking at your overall health picture. The goal isn't just to treat sleep apnea. It's to help you actually feel rested.",
      },
    ],
    whenToSeek: [
      "You're using CPAP regularly but still waking up tired",
      "Your mask leaks or causes frequent wake-ups",
      "You're still snoring with the mask on",
      "Fatigue is affecting your focus, mood, or daily life",
    ],
  },

  {
    slug: "circadian-rhythm",
    title: "Circadian Rhythm Disorders",
    subtitle: "When Your Internal Clock Doesn't Match Your Life",
    category: "sleep",
    intro:
      "Your body runs on an internal clock — and when that clock falls out of sync with your actual schedule, sleep becomes a constant struggle. This internal clock, known as the circadian rhythm, is driven largely by light exposure. It controls when you feel alert, when you feel sleepy, and a whole range of background functions like hormone release, metabolism, and body temperature.",
    sections: [
      {
        heading: "What Does \u201cOut of Sync\u201d Actually Look Like?",
        items: [
          "Delayed Sleep Phase — You don't feel sleepy until very late at night, but still have to be up early. Chronic sleep deprivation results, not because you can't sleep, but because your body's window for sleep doesn't match your schedule.",
          "Advanced Sleep Phase — You're exhausted by early evening and wide awake in the early morning hours. More common in older adults.",
          "Irregular Sleep-Wake Rhythm — No consistent pattern at all. Sleep happens in fragmented chunks throughout the day and night.",
          "Shift Work Sleep Disorder — When your work schedule runs counter to your body's natural rhythms, staying alert at work and sleeping well at home both become a challenge.",
        ],
      },
      {
        heading: "Common Symptoms",
        items: [
          "Can't fall asleep at a normal hour",
          "Hard to wake up in the morning no matter when you went to bed",
          "Excessive daytime sleepiness",
          "Fatigue even after spending enough time in bed",
          "Trouble concentrating or remembering things",
          "No consistent sleep schedule",
        ],
      },
      {
        heading: "What Causes It?",
        body: "The circadian rhythm is surprisingly sensitive — even small shifts in routine can throw it off. Common contributors include:",
        items: [
          "Genetics (some people are naturally wired toward earlier or later sleep)",
          "Irregular sleep schedules",
          "Late-night screen exposure",
          "Shift work or rotating schedules",
          "Frequent travel across time zones",
        ],
      },
      {
        heading: "Treatment Options",
        body: "The goal is to gradually bring your internal clock back in line with the schedule you actually need to keep:",
        items: [
          "Light therapy — Carefully timed exposure to bright light is one of the most effective tools for shifting the circadian rhythm earlier or later.",
          "Melatonin — When taken at the right time of day (timing matters more than dose), melatonin can help nudge the sleep cycle.",
          "Sleep schedule adjustments — Gradually shifting your bedtime and wake time in small increments can retrain the body's clock.",
          "Light hygiene — Reducing screen exposure in the evening and getting bright light first thing in the morning reinforces healthier sleep timing.",
        ],
      },
    ],
    whenToSeek: [
      "You can't fall asleep until very late — consistently, not just occasionally",
      "You struggle to wake at a normal time despite going to bed at a reasonable hour",
      "You feel persistently tired during the day even when you've had enough time in bed",
      "You work night or rotating shifts and have never quite adjusted",
    ],
  },

  {
    slug: "insomnia",
    title: "Insomnia",
    subtitle: "When Sleep Doesn't Come — or Stay",
    category: "sleep",
    intro:
      "Almost everyone has a bad night of sleep now and then. But when difficulty falling asleep, staying asleep, or waking too early becomes a pattern — one that leaves you dragging through your days — that's insomnia, and it's worth addressing. Up to one in three adults experience it. For some it passes on its own; for others, it becomes chronic and starts affecting energy, focus, mood, and overall health in ways that compound over time.",
    sections: [
      {
        heading: "What It Feels Like",
        body: "Insomnia isn't just one thing. It can show up as:",
        items: [
          "Lying awake for a long time before finally falling asleep",
          "Waking up repeatedly throughout the night",
          "Waking earlier than you want and not being able to get back to sleep",
          "Feeling unrefreshed no matter how long you were in bed",
          "Daytime fatigue, brain fog, or irritability",
          "Trouble concentrating or getting through the day",
        ],
      },
      {
        heading: "What's Usually Behind It",
        body: "Insomnia rarely has a single cause — more often, a few factors are working against you at the same time:",
        items: [
          "Stress and anxiety — A busy or worried mind is one of the most common sleep disruptors.",
          "Sleep habits — Irregular schedules, screens before bed, or stimulating activity late at night can all interfere with the body's natural wind-down process.",
          "Medical conditions — Chronic pain, acid reflux, hormonal shifts, and thyroid issues can all make restful sleep harder to come by.",
          "Other sleep disorders — Insomnia sometimes coexists with sleep apnea, restless legs syndrome, or circadian rhythm disorders.",
        ],
      },
      {
        heading: "Treatment Options",
        items: [
          "Better sleep habits — Small changes to your schedule, environment, and bedtime routine can have a bigger impact than most people expect.",
          "Cognitive Behavioral Therapy for Insomnia (CBT-I) — The gold standard for chronic insomnia. CBT-I identifies and changes the thoughts and behaviors that are keeping you awake. Evidence-based with a strong track record.",
          "Treating underlying conditions — If a medical issue or another sleep disorder is contributing, addressing that directly often improves sleep significantly.",
          "Short-term medication — In some cases, medication can help break the cycle and restore a healthier sleep pattern.",
        ],
      },
    ],
    whenToSeek: [
      "Sleep problems are happening several nights a week",
      "It's been going on for more than a few weeks",
      "Daytime fatigue is affecting your work, relationships, or ability to function",
      "You feel anxious or frustrated about sleep — or dread going to bed",
    ],
  },

  {
    slug: "hypersomnia",
    title: "Hypersomnia & Fatigue",
    subtitle: "When Sleep Never Feels Like Enough",
    category: "sleep",
    intro:
      "Most people feel tired sometimes. But if you're sleeping a full night — or more — and still waking up exhausted, struggling to stay awake during the day, or finding that no amount of sleep ever feels like enough, something more may be going on. Hypersomnia refers to excessive daytime sleepiness or an unusually prolonged need for sleep that isn't explained by poor sleep habits or not getting enough hours.",
    sections: [
      {
        heading: "What It Feels Like",
        items: [
          "Sleeping 9 or more hours and still feeling unrefreshed",
          "Falling asleep unintentionally during the day — at work, while reading, or even mid-conversation",
          "Difficulty waking up in the morning despite adequate sleep",
          "A persistent, heavy feeling of tiredness that doesn't lift",
          "Brain fog, poor concentration, or slowed thinking",
          "Low energy that affects motivation and daily functioning",
        ],
      },
      {
        heading: "What Might Be Causing It",
        items: [
          "An underlying sleep disorder — Sleep apnea is one of the most common causes of daytime fatigue. Other disorders like restless legs syndrome or circadian rhythm disruption can also contribute.",
          "Idiopathic hypersomnia — In some cases, the brain's sleep-wake system doesn't function the way it should, leading to excessive sleepiness even when nighttime sleep appears normal.",
          "Narcolepsy — A neurological condition that affects the brain's ability to regulate sleep and wakefulness.",
          "Medical factors — Thyroid dysfunction, iron deficiency, diabetes, autoimmune conditions, and hormonal imbalances can all cause persistent fatigue.",
          "Mental health — Depression and anxiety are closely linked to both sleep disruption and chronic fatigue.",
          "Medications — Certain prescriptions, including antihistamines, blood pressure medications, and mood stabilizers, can contribute to daytime drowsiness.",
        ],
      },
      {
        heading: "How We Evaluate It",
        body: "We'll start with a detailed conversation about your sleep patterns, daily energy levels, medical history, and any other symptoms. Depending on what we find, next steps may include a sleep study, bloodwork, a review of current medications, or specialized sleep testing if a condition like narcolepsy or idiopathic hypersomnia is suspected.",
      },
      {
        heading: "Treatment Options",
        items: [
          "Treating an underlying sleep disorder — Addressing sleep apnea, restless legs, or circadian issues often resolves fatigue on its own.",
          "Managing medical contributors — Correcting thyroid levels, addressing iron deficiency, or adjusting medications can make a meaningful difference.",
          "Behavioral strategies — Consistent sleep schedules, strategic napping, and light exposure can help regulate the sleep-wake cycle.",
          "Medication — For conditions like narcolepsy or idiopathic hypersomnia, targeted medications can help the brain maintain wakefulness during the day.",
          "Mental health support — When depression or anxiety is part of the picture, addressing that directly often improves both mood and sleep.",
        ],
      },
    ],
    whenToSeek: [
      "You feel excessively tired most days despite sleeping enough",
      "You fall asleep unintentionally during the day",
      "Fatigue is affecting your work, relationships, or ability to function",
      "You've tried improving your sleep habits and nothing has helped",
    ],
  },

  {
    slug: "nasal-obstruction",
    title: "Nasal Obstruction & Congestion",
    subtitle: "When Breathing Through Your Nose Becomes a Struggle",
    category: "ent",
    intro:
      "Breathing through your nose shouldn't be a struggle. When it is, it affects more than just comfort — it can disrupt your sleep, limit your energy during exercise, dull your sense of smell, and even contribute to snoring and sleep apnea. Nasal obstruction is one of the most common reasons people see an ENT, and it's very treatable once we know what's causing it.",
    sections: [
      {
        heading: "What's Blocking Your Airflow?",
        body: "Obstruction usually comes from inflammation or a structural issue — sometimes both. Common culprits include:",
        items: [
          "Deviated septum — the wall between your nostrils is off-center, narrowing one or both sides",
          "Enlarged turbinates — the tissues inside your nose that filter air become swollen and reduce airflow",
          "Nasal polyps — soft growths in the nasal lining that block passages",
          "Allergies or chronic inflammation — ongoing irritation causes the nasal lining to stay swollen",
          "Infections — colds, flu, or sinusitis can cause acute or lingering congestion",
        ],
      },
      {
        heading: "Medical Treatment Options",
        body: "We typically start with the least invasive approach and move from there:",
        items: [
          "Nasal steroid sprays (like Flonase or Nasonex) — reduce inflammation and are a first-line option for allergic or chronic congestion.",
          "Antihistamines — helpful when allergies are a contributing factor.",
          "Saline rinses — simple, effective, and underrated. Regular rinsing reduces swelling and clears irritants naturally.",
          "Decongestants — useful for short-term relief, but not a long-term solution.",
          "Singulair (montelukast) — particularly useful when nasal polyps are involved.",
        ],
      },
      {
        heading: "When Medications Aren't Enough",
        body: "For structural issues — or when symptoms persist despite medical treatment — there are several effective procedures:",
        items: [
          "Vivaer / Rhinaer — minimally invasive, in-office procedures that use gentle radiofrequency energy to open the nasal airway without changing the appearance of your nose.",
          "Septoplasty — straightens a deviated septum. Outpatient procedure, most patients recover within about a week.",
          "Turbinate reduction — reduces the size of swollen turbinate tissue to open up airflow.",
          "Nasal valve surgery — widens the narrowest part of the nasal airway near the front of the nose.",
        ],
      },
    ],
    whenToSeek: [
      "Persistent stuffiness or nasal blockage",
      "Difficulty breathing through your nose during daily activity or sleep",
      "Chronic mouth breathing",
      "Snoring or poor sleep you think may be related to nasal issues",
      "A reduced sense of smell",
    ],
  },

  {
    slug: "sinusitis",
    title: "Chronic Sinusitis",
    subtitle: "Recurring Sinus Infections & Pressure",
    category: "ent",
    intro:
      "Sinusitis is inflammation of the sinus lining — and when it becomes chronic (lasting 12 weeks or more, or recurring frequently), it significantly affects quality of life. Pressure behind the eyes, facial pain, thick drainage, congestion that won't clear, and a reduced sense of smell are all hallmarks of a sinus system that isn't draining properly.",
    sections: [
      {
        heading: "What's Driving It?",
        items: [
          "Anatomical factors — a deviated septum or narrow sinus passages that impair drainage",
          "Nasal polyps — soft growths that block the sinus openings",
          "Allergies — ongoing inflammation that keeps the sinus lining swollen",
          "Recurrent viral or bacterial infections",
          "Biofilm — persistent bacterial communities that are resistant to standard antibiotics",
        ],
      },
      {
        heading: "Common Symptoms",
        items: [
          "Facial pressure or pain, especially around the eyes and cheeks",
          "Thick or discolored nasal discharge",
          "Nasal congestion that doesn't improve",
          "Postnasal drip and chronic throat clearing",
          "Reduced or absent sense of smell",
          "Fatigue — often from poor sleep and chronic inflammation",
        ],
      },
      {
        heading: "How We Evaluate It",
        body: "We start with a detailed history and an in-office nasal endoscopy — a quick, well-tolerated examination that lets us visualize the sinuses directly. If imaging is needed, we'll review CT scans to get a complete picture of your sinus anatomy.",
      },
      {
        heading: "Treatment Options",
        items: [
          "Nasal saline irrigation — a cornerstone of sinus management that helps clear mucus and reduce inflammation.",
          "Nasal steroid sprays — reduce mucosal swelling and improve sinus drainage.",
          "Antibiotics — targeted courses for confirmed bacterial infections.",
          "Allergy management — treating the underlying allergic response when allergies are a driver.",
          "Balloon sinuplasty — a minimally invasive, in-office procedure to open blocked sinus passages.",
          "Functional endoscopic sinus surgery (FESS) — when anatomy or polyps require a more definitive approach.",
        ],
      },
    ],
    whenToSeek: [
      "Sinus symptoms lasting more than 10–12 weeks",
      "Recurrent sinus infections (3 or more per year)",
      "Facial pressure, headaches, or pain that keeps returning",
      "Poor sense of smell that hasn't improved",
      "Sinus symptoms that aren't responding to over-the-counter treatment",
    ],
  },

  {
    slug: "allergies",
    title: "Allergies",
    subtitle: "Environmental & Seasonal Allergy Care",
    category: "ent",
    intro:
      "Sneezing, congestion, a constant drip down the back of your throat, itchy eyes — if these symptoms follow you through certain seasons or never seem to go away at all, allergies are likely playing a role. For an ENT practice, allergies aren't just about sneezing — they're a root cause of many of the breathing, sinus, and sleep issues we treat every day.",
    sections: [
      {
        heading: "What's Actually Happening",
        body: "When your immune system overreacts to something harmless — pollen, dust mites, mold, pet dander — it triggers inflammation in the nasal lining. That inflammation causes swelling, excess mucus, and all the symptoms that come with it. Left unmanaged, allergies can drive chronic sinusitis, worsen nasal obstruction, disrupt sleep, and contribute to persistent throat irritation.",
      },
      {
        heading: "Common Symptoms",
        items: [
          "Nasal congestion or stuffiness",
          "Runny nose or sneezing",
          "Postnasal drip — mucus draining down the back of the throat",
          "Throat clearing, irritation, or a scratchy feeling",
          "Itchy or watery eyes",
          "Reduced sense of smell",
          "Fatigue from poor sleep or chronic inflammation",
          "Symptoms that worsen seasonally or in certain environments",
        ],
      },
      {
        heading: "Environmental vs. Seasonal Allergies",
        body: "Seasonal allergies are triggered by outdoor allergens like tree, grass, and weed pollens — spring, late summer, and fall are the most common windows in New Jersey. Environmental (perennial) allergies are triggered by indoor allergens that are present year-round — dust mites, mold, cockroach, and pet dander. Many people have both.",
      },
      {
        heading: "Treatment Options",
        items: [
          "Avoidance strategies — Once we know your triggers, we can give you practical guidance on reducing exposure.",
          "Nasal steroid sprays — A first-line treatment for allergic inflammation.",
          "Antihistamines — Help reduce the immune response driving your symptoms. Newer options like Zyrtec, Allegra, and Xyzal are effective without heavy sedation.",
          "Saline rinses — Regular rinsing clears allergens and irritants from the nasal passages.",
          "Singulair (montelukast) — Particularly useful when nasal polyps or persistent inflammation are involved.",
          "Allergy immunotherapy — For patients who want long-term relief, immunotherapy gradually desensitizes the immune system to your specific allergens via allergy shots or sublingual drops.",
        ],
      },
    ],
    whenToSeek: [
      "Allergy symptoms are affecting your sleep, energy, or daily comfort",
      "Over-the-counter medications aren't providing enough relief",
      "You have recurring sinus infections you think may be allergy-related",
      "You experience persistent postnasal drip or throat irritation",
      "You've never been tested and aren't sure what you're actually allergic to",
    ],
  },

  {
    slug: "ear-conditions",
    title: "Ear Conditions",
    subtitle: "Ear Infections, Hearing, Tinnitus & Balance",
    category: "ent",
    intro:
      "From earaches and hearing loss to tinnitus and dizziness, ear problems can affect your quality of life in ways that go well beyond discomfort. We provide comprehensive evaluation for both adults and children across the full range of ear conditions.",
    sections: [
      {
        heading: "Earache",
        body: "Ear pain can stem from several sources — sometimes directly in the ear (infection, fluid buildup, or irritation of the ear canal), and other times referred from the jaw, throat, or neck. Common causes include outer ear infections (swimmer's ear), middle ear infections, fluid behind the eardrum, eustachian tube dysfunction, and jaw joint (TMJ) issues. Seek evaluation for: ear pain that is severe or worsening, pain accompanied by fever or drainage, and hearing changes alongside pain.",
      },
      {
        heading: "Eardrum Perforation",
        body: "A hole or tear in the eardrum can affect hearing and leave the middle ear vulnerable to infection. Common causes include middle ear infections, sudden pressure changes (flying, diving), inserting objects into the ear, and trauma. Many small perforations heal on their own; larger or persistent ones may require a procedure to repair the eardrum.",
      },
      {
        heading: "Earwax Removal",
        body: "Earwax buildup can cause muffled hearing, a feeling of fullness, ear discomfort, ringing, and itching. Cotton swabs typically push wax deeper — professional removal is the safest and most effective option. We remove earwax in-office using gentle, targeted techniques that clear the canal without damaging the delicate structures of the ear.",
      },
      {
        heading: "Clogged Ear & Eustachian Tube Dysfunction",
        body: "That muffled, full, or pressurized feeling can signal earwax buildup, fluid behind the eardrum, eustachian tube dysfunction, or allergies and sinus congestion affecting middle ear pressure. If the feeling persists for more than a week or two — or keeps coming back — it's worth getting evaluated.",
      },
      {
        heading: "Ear Tube Placement",
        body: "Ear tubes are a simple, effective solution for ears that aren't draining or ventilating the way they should. They are often recommended when a child has had 3+ ear infections within six months, fluid has been present behind the eardrum for 3 or more months, hearing loss is associated with persistent fluid, or an adult has chronic eustachian tube dysfunction.",
      },
      {
        heading: "Hearing Loss",
        body: "Hearing loss can develop gradually across all ages. Common causes include age-related inner ear changes, noise exposure, earwax impaction, fluid or infection in the middle ear, a perforated eardrum, and certain medications. We offer comprehensive hearing evaluations for adults and children to determine the type, degree, and underlying cause of hearing loss.",
      },
      {
        heading: "Tinnitus (Ringing in the Ear)",
        body: "Tinnitus — the perception of ringing, buzzing, hissing, or clicking when no external sound is present — affects millions of people. It is often associated with noise exposure, hearing loss, earwax buildup, ear or sinus infections, eustachian tube dysfunction, and jaw (TMJ) issues. While there is no universal cure, many patients find meaningful relief through sound therapy, hearing aids, lifestyle adjustments, and treatment of underlying causes.",
      },
      {
        heading: "Dizziness & Balance",
        body: "Dizziness means something different to almost everyone — spinning, lightheadedness, unsteadiness, or a floating sensation are all distinct experiences with different causes. We evaluate BPPV (tiny calcium crystals in the inner ear), vestibular neuritis or labyrinthitis, Meniere's disease, eustachian tube dysfunction, and inner ear pressure issues. Seek emergency evaluation for dizziness that is sudden, severe, or accompanied by vision changes, slurred speech, or weakness.",
      },
    ],
    whenToSeek: [
      "Ear pain that is severe, worsening, or not improving after a few days",
      "Drainage from the ear",
      "Hearing changes or a sudden change in hearing",
      "A ringing or buzzing that won't go away",
      "Dizziness or balance problems, especially with head movement",
      "A feeling of pressure or fullness that persists",
    ],
  },

  {
    slug: "throat-voice",
    title: "Throat & Voice",
    subtitle: "Chronic Cough, Reflux, Swallowing & Throat Symptoms",
    category: "ent",
    intro:
      "Persistent throat symptoms — chronic cough, a lump-in-the-throat sensation, hoarseness, or difficulty swallowing — are some of the most frustrating problems to deal with because they often don't have an obvious explanation. We take the time to look at the full picture and find what's actually driving your symptoms.",
    sections: [
      {
        heading: "Chronic Throat Clearing & Globus Sensation",
        body: "That constant urge to clear your throat — or the feeling that something is stuck even when nothing is there — is almost never a sign of something serious, but it is a signal that the throat is being persistently irritated. Common culprits include: LPR (laryngopharyngeal reflux), postnasal drip, allergies, muscle tension in the throat, and anxiety heightening awareness of normal sensations. Identifying and treating the underlying cause — reflux, allergies, or postnasal drip — often resolves symptoms entirely.",
      },
      {
        heading: "Chronic Cough",
        body: "A cough that has lasted more than eight weeks is considered chronic — and at that point, it's not something to keep waiting out. Common ENT-related causes include LPR (silent reflux), postnasal drip, allergies, chronic sinusitis, and vocal cord irritation or dysfunction. Chronic cough is rarely just one thing — a thorough evaluation helps piece together what's driving it so treatment actually targets the right cause.",
      },
      {
        heading: "Difficulty Swallowing (Dysphagia)",
        body: "If food or liquid feels like it's sticking, going down slowly, or occasionally going the wrong way, that's a symptom that deserves prompt evaluation. Common causes include inflammation or irritation from reflux, tonsil or throat infections, structural narrowing of the esophagus, and muscle coordination issues. Difficulty swallowing should always be evaluated — both to find the cause and to rule out anything that needs prompt attention.",
      },
      {
        heading: "Sore Throat",
        body: "Most sore throats resolve on their own within a week. But when throat pain is severe, keeps coming back, or simply won't go away, it's time to find out what's behind it. Common causes include viral or bacterial infections (strep throat), tonsillitis, acid or silent reflux irritating the back of the throat, postnasal drip, and mouth breathing — particularly during sleep. Recurrent or persistent sore throat is often a sign of an underlying issue — reflux, allergies, or chronic tonsillitis — that won't resolve without treating the root cause.",
      },
    ],
    whenToSeek: [
      "A cough that has persisted for 8 or more weeks",
      "Throat clearing that happens constantly throughout the day",
      "A persistent lump-in-the-throat sensation",
      "Sore throat lasting more than 10 days or recurring frequently",
      "Difficulty swallowing — food or liquid feels like it's sticking",
      "Hoarseness or voice changes lasting more than 2–3 weeks",
    ],
  },

  {
    slug: "pediatric-ent",
    title: "Pediatric ENT",
    subtitle: "Specialized Ear, Nose & Throat Care for Children",
    category: "ent",
    intro:
      "Children aren't just small adults — their ears, nose, and throat needs are unique, and problems in these areas can affect how they breathe, sleep, eat, hear, and develop. At Synergy ENT & Wellness, we provide gentle, thorough evaluations for infants and children with a focus on finding answers and keeping parents informed every step of the way.",
    sections: [
      {
        heading: "Pediatric Airway Evaluation",
        body: "If your child is breathing loudly, mouth breathing constantly, snoring, or seems to struggle with air during everyday activity, an airway evaluation can help identify why. Airway issues in children are easy to overlook — often written off as 'normal kid noises' — but persistent breathing difficulties can affect sleep, growth, and development when left unaddressed.",
        items: [
          "Noisy or labored breathing",
          "Chronic mouth breathing",
          "Snoring or pauses in breathing during sleep",
          "Frequent respiratory infections",
          "Recurrent croup or a history of breathing difficulty as an infant",
        ],
      },
      {
        heading: "Tongue-Tie (Ankyloglossia)",
        body: "Tongue-tie occurs when the strip of tissue connecting the tongue to the floor of the mouth is too short or tight, restricting normal tongue movement. It's present from birth and ranges from mild to significant in how much it limits function.",
        items: [
          "Infants: difficulty latching during breastfeeding, poor weight gain, frustration during feeds",
          "Older children: speech articulation difficulties, trouble moving food around the mouth",
          "In some cases: mouth breathing or sleep-related breathing issues",
        ],
      },
      {
        heading: "Pediatric Sleep Problems",
        body: "Children need quality sleep to grow, learn, and thrive. When sleep is disrupted — by snoring, frequent waking, restless sleep, or difficulty breathing — it can show up during the day as behavioral issues, difficulty focusing, or chronic fatigue. Signs your child's sleep may need evaluation:",
        items: [
          "Loud or frequent snoring",
          "Mouth breathing during sleep",
          "Observed pauses in breathing",
          "Restless sleep or unusual sleeping positions (chin tilted up, neck extended)",
          "Bedwetting beyond typical age",
          "Daytime behavioral changes, hyperactivity, or difficulty concentrating",
          "Excessive sleepiness or difficulty waking in the morning",
        ],
      },
      {
        heading: "Ear Infections & Ear Tubes",
        body: "Recurrent ear infections are one of the most common reasons children see an ENT. When infections are frequent or fluid behind the eardrum persists and affects hearing, ear tubes may be recommended. The procedure is brief and recovery is quick — and most children and parents notice a meaningful difference almost immediately.",
      },
      {
        heading: "Tonsils & Adenoids",
        body: "Enlarged tonsils and adenoids are the most common cause of sleep-disordered breathing in children — and treatment is often highly effective. We'll evaluate whether the size of your child's tonsils and adenoids is contributing to breathing, sleep, or swallowing difficulties before making any recommendations.",
      },
    ],
    whenToSeek: [
      "Your child snores loudly or most nights",
      "You've noticed pauses in your child's breathing during sleep",
      "Your child mouth breathes chronically — during the day or at night",
      "Recurrent ear infections (3 or more in 6 months, or 4 or more in a year)",
      "Difficulty latching, nursing, or speech concerns in infants or young children",
      "Daytime behavioral issues or difficulty focusing that may be related to poor sleep",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesContent.find((s) => s.slug === slug);
}

export const sleepSlugs: Record<string, string> = {
  "Sleep Apnea": "sleep-apnea",
  Snoring: "snoring",
  "CPAP Troubleshooting": "cpap",
  "Circadian Rhythm Disorders": "circadian-rhythm",
  Insomnia: "insomnia",
  "Hypersomnia & Fatigue": "hypersomnia",
};

export const entSlugs: Record<string, string> = {
  "Nasal Obstruction": "nasal-obstruction",
  "Chronic Sinusitis": "sinusitis",
  Allergies: "allergies",
  "Ear Conditions": "ear-conditions",
  "Throat & Voice": "throat-voice",
  "Pediatric ENT": "pediatric-ent",
};
