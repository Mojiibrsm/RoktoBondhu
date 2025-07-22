

export const divisions = [
    { name: 'ঢাকা' },
    { name: 'চট্টগ্রাম' },
    { name: 'রাজশাহী' },
    { name: 'খুলনা' },
    { name: 'বরিশাল' },
    { name: 'সিলেট' },
    { name: 'রংপুর' },
    { name: 'ময়মনসিংহ' },
];

export const districts: { [key: string]: string[] } = {
    'ঢাকা': ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'নরসিংদী', 'মানিকগঞ্জ', 'মুন্সিগঞ্জ', 'ফরিদপুর', 'গোপালগঞ্জ', 'মাদারীপুর', 'রাজবাড়ী', 'শরীয়তপুর', 'কিশোরগঞ্জ', 'টাঙ্গাইল'],
    'চট্টগ্রাম': ['চট্টগ্রাম', 'কক্সবাজার', 'বান্দরবান', 'রাঙ্গামাটি', 'খাগড়াছড়ি', 'কুমিল্লা', 'ব্রাহ্মণবাড়িয়া', 'চাঁদপুর', 'লক্ষ্মীপুর', 'নোয়াখালী', 'ফেনী'],
    'রাজশাহী': ['রাজশাহী', 'বগুড়া', 'পাবনা', 'সিরাজগঞ্জ', 'নওগাঁ', 'নাটোর', 'চাঁপাইনবাবগঞ্জ', 'জয়পুরহাট'],
    'খুলনা': ['খুলনা', 'যশোর', 'সাতক্ষীরা', 'বাগেরহাট', 'নড়াইল', 'মাগুরা', 'ঝিনাইদহ', 'কুষ্টিয়া', 'চুয়াডাঙ্গা', 'মেহেরপুর'],
    'বরিশাল': ['বরিশাল', 'পটুয়াখালী', 'ভোলা', 'পিরোজপুর', 'বরগুনা', 'ঝালকাঠি'],
    'সিলেট': ['সিলেট', 'সুনামগঞ্জ', 'হবিগঞ্জ', 'মৌলভীবাজার'],
    'রংপুর': ['রংপুর', 'দিনাজপুর', 'গাইবান্ধা', 'কুড়িগ্রাম', 'লালমনিরহাট', 'নীলফামারী', 'পঞ্চগড়', 'ঠাকুরগাঁও'],
    'ময়মনসিংহ': ['ময়মনসিংহ', 'জামালপুর', 'শেরপুর', 'নেত্রকোনা'],
};

export const upazilas: { [key: string]: string[] } = {
    'ঢাকা': ['রমনা', 'মতিঝিল', 'ধানমন্ডি', 'মোহাম্মদপুর', 'উত্তরা', 'গুলশান'],
    'চট্টগ্রাম': ['কোতোয়ালী', 'পাঁচলাইশ', 'ডবলমুরিং', 'চান্দগাঁও', 'হালিশহর', 'খুলশী'],
    'রাজশাহী': ['বোয়ালিয়া', 'শাহমখদুম', 'মতিহার', 'রাজপাড়া'],
    'খুলনা': ['খুলনা সদর', 'সোনাডাঙ্গা', 'দৌলতপুর'],
    'সাতক্ষীরা': ['সাতক্ষীরা সদর', 'আশাশুনি', 'দেবহাটা', 'কলারোয়া', 'কালিগঞ্জ', 'শ্যামনগর', 'তালা'],
    'সিলেট': ['সিলেট সদর', 'দক্ষিণ সুরমা', 'শাহপরাণ'],
    'বরিশাল': ['বরিশাল সদর', 'বন্দর'],
    'রংপুর': ['রংপুর সদর', 'তাজহাট'],
    'ময়মনসিংহ': ['ময়মনসিংহ সদর', 'ত্রিশাল'],
    'গাজীপুর': ['গাজীপুর সদর', 'কালিয়াকৈর', 'কাপাসিয়া', 'শ্রীপুর', 'কালীগঞ্জ'],
    'নারায়ণগঞ্জ': ['নারায়ণগঞ্জ সদর', 'বন্দর', 'রূপগঞ্জ', 'সোনারগাঁও', 'আড়াইহাজার'],
    'কক্সবাজার': ['কক্সবাজার সদর', 'চকরিয়া', 'উখিয়া', 'টেকনাফ', 'মহেশখালী', 'কুতুবদিয়া', 'রামু', 'পেকুয়া'],
    'কুমিল্লা': ['কুমিল্লা সদর', 'লাকসাম', 'দাউদকান্দি', 'চান্দিনা', 'হোমনা', 'মুরাদনগর', 'দেবিদ্বার', 'বুড়িচং'],
    'বগুড়া': ['বগুড়া সদর', 'শাজাহানপুর', 'শেরপুর', 'ধুনট', 'সারিয়াকান্দি', 'গাবতলী', 'সোনাতলা', 'শিবগঞ্জ'],
    'যশোর': ['যশোর সদর', 'শার্শা', 'ঝিকরগাছা', 'চৌগাছা', 'কেশবপুর', 'অভয়নগর', 'মনিরামপুর', 'বাঘারপাড়া'],
};


// --- Demo Data for Firestore ---

export const demoData = {
  teamMembers: [
    {
      id: "mujibur-rahman",
      name: "Mujibur Rahman",
      role: "Founder & Director",
      image: "https://placehold.co/128x128.png",
      aiHint: "male portrait",
      bio: "A passionate social entrepreneur dedicated to leveraging technology for humanitarian causes. He envisioned Roktobondhu to bridge the gap between blood donors and recipients in Bangladesh."
    },
    {
      id: "fatima-akter",
      name: "Fatima Akter",
      role: "Lead Developer",
      image: "https://placehold.co/128x128.png",
      aiHint: "female portrait",
      bio: "The brilliant mind behind the Roktobondhu platform. With her expertise in web development, she ensures the application is robust, secure, and user-friendly."
    }
  ],
  testimonials: [
    {
      id: "testimonial-1",
      name: "Laila Ahmed",
      location: "Dhaka",
      quote: "My father needed blood urgently, and Roktobondhu connected us with a donor in just 30 minutes. I am forever grateful for this life-saving platform.",
      image: "https://placehold.co/96x96.png",
      aiHint: "female person"
    },
    {
      id: "testimonial-2",
      name: "Karim Sheikh",
      location: "Chittagong",
      quote: "Being a regular donor, Roktobondhu makes it so easy to find donation requests nearby. It feels great to be part of such an impactful community.",
      image: "https://placehold.co/96x96.png",
      aiHint: "male person"
    },
    {
      id: "testimonial-3",
      name: "Sultana Begum",
      location: "Sylhet",
      quote: "The process was seamless and the support team was very helpful. This platform is a blessing for patients in need of blood.",
      image: "https://placehold.co/96x96.png",
      aiHint: "woman portrait"
    }
  ],
  blogPosts: [
    {
      id: "post-1",
      slug: "the-importance-of-regular-blood-donation",
      title: "The Importance of Regular Blood Donation",
      excerpt: "Regular blood donation is crucial for maintaining a stable blood supply. It not only saves lives but also has several health benefits for the donor. Learn why your contribution matters.",
      author: "Dr. Selina Hayat",
      date: "May 20, 2024",
      image: "https://placehold.co/400x225.png",
      aiHint: "blood donation",
      content: "<p>Regular blood donation is a simple act of kindness that has a profound impact on the community. Each donation can save up to three lives, providing essential blood for surgeries, cancer treatments, chronic illnesses, and traumatic injuries. Beyond the altruistic benefits, donating blood also offers health advantages for the donor. It helps in reducing harmful iron stores, can lower the risk of heart and liver ailments, and even burn a few calories. Moreover, before each donation, you receive a mini-health check-up that includes checking your pulse, blood pressure, body temperature, and hemoglobin levels. This can help in early detection of potential health problems. By becoming a regular donor, you become a silent hero, ensuring that the gift of life is always available to those in need. Join us in this noble cause and make a difference today.</p>"
    },
    {
      id: "post-2",
      slug: "myths-vs-facts-about-blood-donation",
      title: "Myths vs. Facts About Blood Donation",
      excerpt: "There are many misconceptions about blood donation that deter potential donors. Let's debunk some common myths with facts to encourage more people to donate.",
      author: "Roktobondhu Team",
      date: "May 15, 2024",
      image: "https://placehold.co/400x225.png",
      aiHint: "medical science",
       content: "<p>There are many misconceptions surrounding blood donation that can create unnecessary fear and prevent people from donating. Let's clear up some common myths: <br><br><strong>Myth:</strong> Donating blood is painful. <br><strong>Fact:</strong> The only pain you'll feel is a quick pinch from the needle, which lasts only a moment. The rest of the process is comfortable. <br><br><strong>Myth:</strong> I will feel weak after donating. <br><strong>Fact:</strong> Your body replaces the donated blood volume within 48 hours. Most donors feel fine after a short rest and some refreshments. <br><br><strong>Myth:</strong> I can't donate because I have high blood pressure. <br><strong>Fact:</strong> As long as your blood pressure is within acceptable limits (typically below 180/100 mmHg) at the time of donation, you can donate. <br><br>Don't let myths stop you from saving a life. Get the facts and donate blood.</p>"
    },
    {
      id: "post-3",
      slug: "how-your-donation-helps-a-thalassemia-patient",
      title: "How Your Donation Helps a Thalassemia Patient",
      excerpt: "Thalassemia is a genetic blood disorder that requires regular blood transfusions. Your single donation can provide a new lease of life for a thalassemia patient.",
      author: "Community Stories",
      date: "May 10, 2024",
      image: "https://placehold.co/400x225.png",
      aiHint: "child smiling",
      content: "<p>For individuals living with thalassemia, a genetic blood disorder, regular blood transfusions are not just a treatment but a lifeline. These patients cannot produce enough healthy red blood cells, leading to severe anemia and other life-threatening complications. Blood transfusions, typically required every 2 to 4 weeks, provide them with the healthy red blood cells they need to survive and lead a more normal life. Your decision to donate blood directly impacts these patients, giving them the strength to go to school, play with friends, and dream of a future. Each bag of blood you donate is a gift of hope, energy, and life itself to someone battling thalassemia. Your selfless act ensures they can continue their fight and look forward to another day.</p>"
    }
  ],
  faqs: [
      {
        id: "faq-1",
        question: "Who can donate blood?",
        answer: "Most healthy individuals between the ages of 18 and 65 can donate blood. You must weigh at least 50 kg (110 lbs) and be in good general health. Specific eligibility criteria may vary by location."
      },
      {
        id: "faq-2",
        question: "How often can I donate blood?",
        answer: "Typically, you can donate whole blood every 56 days (8 weeks). The interval for other types of donations, like platelets or plasma, can be shorter."
      },
      {
        id: "faq-3",
        question: "Is donating blood safe?",
        answer: "Yes, donating blood is very safe. All needles and blood bags are sterile, used only once, and then discarded. You cannot get any disease from donating blood."
      },
      {
        id: "faq-4",
        question: "How long does the blood donation process take?",
        answer: "The entire process, including registration, a mini-medical check-up, donation, and post-donation refreshments, takes about 45 to 60 minutes. The actual blood donation part only takes about 8-10 minutes."
      }
  ],
  bloodRequests: [
      {
          id: "req-1",
          patientName: "Farid Ahmed",
          bloodType: "O+",
          location: "Dhaka Medical College Hospital",
          division: "ঢাকা",
          district: "ঢাকা",
          upazila: "রমনা",
          status: "জরুরী",
          postedTime: new Date(),
          reason: "Patient undergoing open-heart surgery and requires 2 bags of O+ blood immediately."
      },
      {
          id: "req-2",
          patientName: "Ayesha Siddika",
          bloodType: "A-",
          location: "Chittagong Maa-O-Shishu Hospital",
          division: "চট্টগ্রাম",
          district: "চট্টগ্রাম",
          upazila: "পাঁচলাইশ",
          status: "সক্রিয়",
          postedTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          reason: "Scheduled C-section delivery tomorrow morning. A- blood is needed on standby."
      }
  ]
};
