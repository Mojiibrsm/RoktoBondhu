export const urgentRequests = [
  {
    id: 1,
    patientName: 'এ. আর. খান',
    bloodType: 'O+',
    location: 'ঢাকা মেডিকেল কলেজ',
    reason: 'দুর্ঘটনার পর জরুরী অস্ত্রোপচারের জন্য প্রয়োজন।',
    postedTime: '২ ঘন্টা আগে',
  },
  {
    id: 2,
    patientName: 'ফাতেমা বেগম',
    bloodType: 'A-',
    location: 'চট্টগ্রাম জেনারেল হাসপাতাল',
    reason: 'থ্যালাসেমিয়ায় আক্রান্ত রোগীর জন্য জরুরি রক্ত সঞ্চালন প্রয়োজন।',
    postedTime: '৫ ঘন্টা আগে',
  },
  {
    id: 3,
    patientName: 'এস. ইসলাম',
    bloodType: 'B+',
    location: 'রাজশাহী মেডিকেল কলেজ',
    reason: 'ডেঙ্গু রোগীর প্লেটলেট সংখ্যা আশঙ্কাজনকভাবে কম।',
    postedTime: '১ দিন আগে',
  },
];

export const topDonors = [
  {
    id: 1,
    name: 'করিম আহমেদ',
    location: 'ঢাকা, বাংলাদেশ',
    bloodType: 'A+',
    donations: 15,
    image: 'https://placehold.co/96x96.png',
  },
  {
    id: 2,
    name: 'জান্নাতুল ফেরদৌস',
    location: 'চট্টগ্রাম, বাংলাদেশ',
    bloodType: 'O+',
    donations: 12,
    image: 'https://placehold.co/96x96.png',
  },
  {
    id: 3,
    name: 'রহিম শেখ',
    location: 'সিলেট, বাংলাদেশ',
    bloodType: 'B-',
    donations: 10,
    image: 'https://placehold.co/96x96.png',
  },
  {
    id: 4,
    name: 'নুসরাত জাহান',
    location: 'খুলনা, বাংলাদেশ',
    bloodType: 'AB+',
    donations: 8,
    image: 'https://placehold.co/96x96.png',
  },
];

export const blogPosts = [
  {
    id: 1,
    slug: 'benefits-of-donating-blood',
    title: 'রক্তদানের আশ্চর্যজনক স্বাস্থ্য উপকারিতা',
    excerpt: 'রক্তদান কেবল জীবন বাঁচায় না, দাতাকেও অনেক স্বাস্থ্য সুবিধা দেয়। হৃদরোগের ঝুঁকি কমানো থেকে শুরু করে বিনামূল্যে স্বাস্থ্য পরীক্ষা পর্যন্ত, জানুন কেন আপনার নিয়মিত রক্তদান করা উচিত।',
    author: 'ডাঃ আনিকা রহমান',
    date: 'জুলাই ১৫, ২০২৪',
    image: 'https://placehold.co/400x225.png',
    aiHint: 'medical health',
    content: '<p>রক্তদানের উপকারিতা সম্পর্কে বিষয়বস্তু...</p>',
  },
  {
    id: 2,
    slug: 'common-myths-about-blood-donation',
    title: 'রক্তদান সম্পর্কে প্রচলিত ভুল ধারণাগুলোর অবসান',
    excerpt: 'অনেক মানুষ প্রচলিত ভুল ধারণা এবং ভুল ধারণার কারণে রক্ত দিতে দ্বিধা বোধ করে। আমরা এখানে তথ্য দিয়ে সেগুলোর অবসান ঘটাতে এবং আরও বেশি মানুষকে এগিয়ে আসতে উৎসাহিত করতে এসেছি।',
    author: 'অ্যাডমিন',
    date: 'জুলাই ১০, ২০২৪',
    image: 'https://placehold.co/400x225.png',
    aiHint: 'blood donation awareness',
    content: '<p>প্রচলিত ভুল ধারণা সম্পর্কে বিষয়বস্তু...</p>',
  },
  {
    id: 3,
    slug: 'who-can-donate-blood',
    title: 'আপনি কি রক্তদানের জন্য যোগ্য? একটি সম্পূর্ণ নির্দেশিকা',
    excerpt: 'রক্তদানের যোগ্যতার মানদণ্ড বোঝা অত্যন্ত গুরুত্বপূর্ণ। এই নির্দেশিকা বয়স, ওজন, স্বাস্থ্য পরিস্থিতি এবং অন্যান্য বিষয়গুলো কভার করে যা আপনাকে দাতা হতে পারবেন কিনা তা নির্ধারণ করতে সহায়তা করবে।',
    author: 'রেড ক্রিসেন্ট সোসাইটি',
    date: 'জুলাই ৫, ২০২৪',
    image: 'https://placehold.co/400x225.png',
    aiHint: 'medical checkup',
    content: '<p>যোগ্যতা সম্পর্কে বিষয়বস্তু...</p>',
  },
  {
    id: 4,
    slug: 'journey-of-donated-blood',
    title: 'এক পাইন্ট রক্তের যাত্রা: দাতা থেকে গ্রহীতা পর্যন্ত',
    excerpt: 'কখনো ভেবে দেখেছেন রক্তদান করার পর আপনার রক্তের কী হয়? এই নিবন্ধটি দানের মুহূর্ত থেকে শুরু করে কোনো রোগীর কাছে পৌঁছানো পর্যন্ত যাত্রা ট্র্যাক করে।',
    author: 'রক্তবন্ধু টিম',
    date: 'জুন ২৮, ২০২৪',
    image: 'https://placehold.co/400x225.png',
    aiHint: 'laboratory science',
    content: '<p>রক্তের যাত্রা সম্পর্কে বিষয়বস্তু...</p>',
  },
];

export const donors = [
    { id: 1, name: 'মোঃ আল আমিন', bloodType: 'A+', division: 'ঢাকা', district: 'ঢাকা', upazila: 'গুলশান', available: true },
    { id: 2, name: 'সুমাইয়া আক্তার', bloodType: 'O+', division: 'চট্টগ্রাম', district: 'চট্টগ্রাম', upazila: 'পাঁচলাইশ', available: true },
    { id: 3, name: 'ইমরান হোসেন', bloodType: 'B+', division: 'ঢাকা', district: 'গাজীপুর', upazila: 'শ্রীপুর', available: false },
    { id: 4, name: 'ফাতেমা তুজ জোহরা', bloodType: 'AB+', division: 'সিলেট', district: 'সিলেট', upazila: 'সিলেট সদর', available: true },
    { id: 5, name: 'রাশেদুল ইসলাম', bloodType: 'A-', division: 'রাজশাহী', district: 'রাজশাহী', upazila: 'বোয়ালিয়া', available: true },
    { id: 6, name: 'নুসরাত জাহান', bloodType: 'O-', division: 'ঢাকা', district: 'ঢাকা', upazila: 'ধানমন্ডি', available: true },
    { id: 7, name: 'কামরুল হাসান', bloodType: 'B-', division: 'খুলনা', district: 'খুলনা', upazila: 'খুলনা সদর', available: false },
    { id: 8, name: 'তানভীর আহমেদ', bloodType: 'A+', division: 'ঢাকা', district: 'নারায়ণগঞ্জ', upazila: 'নারায়ণগঞ্জ সদর', available: true },
];

export const bloodRequests = [
    { id: 1, patientName: 'এ. আর. খান', bloodType: 'O+', location: 'ঢাকা মেডিকেল কলেজ', division: 'ঢাকা', district: 'ঢাকা', upazila: 'রমনা', status: 'জরুরী' },
    { id: 2, patientName: 'ফাতেমা বেগম', bloodType: 'A-', location: 'চট্টগ্রাম জেনারেল হাসপাতাল', division: 'চট্টগ্রাম', district: 'চট্টগ্রাম', upazila: 'পাঁচলাইশ', status: 'সক্রিয়' },
    { id: 3, patientName: 'এস. ইসলাম', bloodType: 'B+', location: 'রাজশাহী মেডিকেল কলেজ', division: 'রাজশাহী', district: 'রাজশাহী', upazila: 'বোয়ালিয়া', status: 'জরুরী' },
    { id: 4, name: 'মোছাঃ শারমিনের শিশু', bloodType: 'O+', location: 'স্কয়ার হাসপাতাল, ঢাকা', division: 'ঢাকা', district: 'ঢাকা', upazila: 'পান্থপথ', status: 'সক্রিয়' },
];

export const faqData = [
    {
      question: "রক্তদানের জন্য প্রাথমিক যোগ্যতার শর্তাবলী কী কী?",
      answer: "সাধারণত, আপনাকে সুস্বাস্থ্যের অধিকারী হতে হবে, বয়স কমপক্ষে ১৭-১৮ বছর হতে হবে (স্থানীয় নিয়ম অনুযায়ী), ওজন কমপক্ষে ৫০ কেজি (১১০ পাউন্ড) হতে হবে এবং নির্দিষ্ট কিছু মেডিকেল অবস্থা বা নির্দিষ্ট ঔষধ সেবন করা যাবে না।"
    },
    {
      question: "আমি কতদিন পর পর রক্ত দিতে পারব?",
      answer: "আপনি সাধারণত প্রতি ৫৬ দিন (৮ সপ্তাহ) পর পর পুরো রক্ত দান করতে পারেন। অন্যান্য ধরনের দানের ক্ষেত্রে, যেমন প্লেটলেট, এর চেয়ে ঘন ঘন দান করা যেতে পারে।"
    },
    {
      question: "রক্তদান কি বেদনাদায়ক?",
      answer: "সুই ঢোকানোর সময় আপনি একটি সংক্ষিপ্ত চিমটি অনুভব করবেন, কিন্তু দান প্রক্রিয়াটি বেদনাদায়ক নয়। বেশিরভাগ দাতা এর পরে ভালো বোধ করার কথা জানান।"
    },
    {
      question: "রক্তদান প্রক্রিয়াটি কতক্ষণ সময় নেয়?",
      answer: "নিবন্ধন, একটি মিনি-ফিজিক্যাল, আসল দান, এবং দানের পরে বিশ্রাম ও জলখাবার সহ পুরো প্রক্রিয়াটিতে প্রায় এক ঘন্টা সময় লাগে। আসল রক্ত টানতে মাত্র ৮-১০ মিনিট সময় লাগে।"
    }
  ];
