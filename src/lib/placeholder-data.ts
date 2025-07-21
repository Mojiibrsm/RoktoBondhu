export const urgentRequests = [
  {
    id: 1,
    patientName: 'A. R. Khan',
    bloodType: 'O+',
    location: 'Dhaka Medical College',
    reason: 'Emergency surgery required after an accident.',
    postedTime: '2 hours ago',
  },
  {
    id: 2,
    patientName: 'Fatima Begum',
    bloodType: 'A-',
    location: 'Chittagong General Hospital',
    reason: 'Patient suffering from thalassemia, needs urgent transfusion.',
    postedTime: '5 hours ago',
  },
  {
    id: 3,
    patientName: 'S. Islam',
    bloodType: 'B+',
    location: 'Rajshahi Medical College',
    reason: 'Dengue patient with critically low platelet count.',
    postedTime: '1 day ago',
  },
];

export const topDonors = [
  {
    id: 1,
    name: 'Karim Ahmed',
    location: 'Dhaka, Bangladesh',
    bloodType: 'A+',
    donations: 15,
  },
  {
    id: 2,
    name: 'Jannatul Ferdous',
    location: 'Chittagong, Bangladesh',
    bloodType: 'O+',
    donations: 12,
  },
  {
    id: 3,
    name: 'Rahim Sheikh',
    location: 'Sylhet, Bangladesh',
    bloodType: 'B-',
    donations: 10,
  },
  {
    id: 4,
    name: 'Nusrat Jahan',
    location: 'Khulna, Bangladesh',
    bloodType: 'AB+',
    donations: 8,
  },
];

export const blogPosts = [
  {
    id: 1,
    slug: 'benefits-of-donating-blood',
    title: 'The Surprising Health Benefits of Donating Blood',
    excerpt: 'Donating blood not only saves lives but also offers several health benefits for the donor. From reducing the risk of heart disease to getting a free health check-up, learn why you should donate regularly.',
    author: 'Dr. Anika Rahman',
    date: 'July 15, 2024',
    image: 'https://placehold.co/400x225.png',
    aiHint: 'medical health',
    content: '<p>Content about benefits of donating blood...</p>',
  },
  {
    id: 2,
    slug: 'common-myths-about-blood-donation',
    title: 'Debunking Common Myths About Blood Donation',
    excerpt: 'Many people are hesitant to donate blood due to common myths and misconceptions. We are here to debunk them with facts and encourage more people to step forward.',
    author: 'Admin',
    date: 'July 10, 2024',
    image: 'https://placehold.co/400x225.png',
    aiHint: 'blood donation awareness',
    content: '<p>Content about common myths...</p>',
  },
  {
    id: 3,
    slug: 'who-can-donate-blood',
    title: 'Are You Eligible to Donate Blood? A Complete Guide',
    excerpt: 'Understanding the eligibility criteria for blood donation is crucial. This guide covers age, weight, health conditions, and other factors to help you determine if you can be a donor.',
    author: 'Red Crescent Society',
    date: 'July 5, 2024',
    image: 'https://placehold.co/400x225.png',
    aiHint: 'medical checkup',
    content: '<p>Content about eligibility...</p>',
  },
  {
    id: 4,
    slug: 'journey-of-donated-blood',
    title: 'The Journey of a Pint of Blood: From Donor to Recipient',
    excerpt: 'Ever wondered what happens to your blood after you donate it? This article tracks the journey from the moment of donation to the point it reaches a patient in need.',
    author: 'BloodConnect Team',
    date: 'June 28, 2024',
    image: 'https://placehold.co/400x225.png',
    aiHint: 'laboratory science',
    content: '<p>Content about the journey of blood...</p>',
  },
];

export const donors = [
    { id: 1, name: 'Md. Al Amin', bloodType: 'A+', division: 'Dhaka', district: 'Dhaka', upazila: 'Gulshan', available: true },
    { id: 2, name: 'Sumaiya Akter', bloodType: 'O+', division: 'Chittagong', district: 'Chittagong', upazila: 'Panchlaish', available: true },
    { id: 3, name: 'Imran Hossain', bloodType: 'B+', division: 'Dhaka', district: 'Gazipur', upazila: 'Sreepur', available: false },
    { id: 4, name: 'Fatema Tuz Zohra', bloodType: 'AB+', division: 'Sylhet', district: 'Sylhet', upazila: 'Sylhet Sadar', available: true },
    { id: 5, name: 'Rashedul Islam', bloodType: 'A-', division: 'Rajshahi', district: 'Rajshahi', upazila: 'Boalia', available: true },
    { id: 6, name: 'Nusrat Jahan', bloodType: 'O-', division: 'Dhaka', district: 'Dhaka', upazila: 'Dhanmondi', available: true },
    { id: 7, name: 'Kamrul Hasan', bloodType: 'B-', division: 'Khulna', district: 'Khulna', upazila: 'Khulna Sadar', available: false },
    { id: 8, name: 'Tanvir Ahmed', bloodType: 'A+', division: 'Dhaka', district: 'Narayanganj', upazila: 'Narayanganj Sadar', available: true },
];

export const bloodRequests = [
    { id: 1, patientName: 'A. R. Khan', bloodType: 'O+', location: 'Dhaka Medical College', division: 'Dhaka', district: 'Dhaka', upazila: 'Ramna', status: 'Urgent' },
    { id: 2, patientName: 'Fatima Begum', bloodType: 'A-', location: 'Chittagong General Hospital', division: 'Chittagong', district: 'Chittagong', upazila: 'Panchlaish', status: 'Active' },
    { id: 3, patientName: 'S. Islam', bloodType: 'B+', location: 'Rajshahi Medical College', division: 'Rajshahi', district: 'Rajshahi', upazila: 'Boalia', status: 'Urgent' },
    { id: 4, name: 'Baby of Mst. Sharmin', bloodType: 'O+', location: 'Square Hospital, Dhaka', division: 'Dhaka', district: 'Dhaka', upazila: 'Panthapath', status: 'Active' },
];

export const faqData = [
    {
      question: "What are the basic eligibility requirements for donating blood?",
      answer: "Generally, you must be in good health, be at least 17-18 years old (depending on local regulations), weigh at least 50 kg (110 lbs), and not have certain medical conditions or be on specific medications."
    },
    {
      question: "How often can I donate blood?",
      answer: "You can typically donate whole blood every 56 days (8 weeks). For other types of donations, like platelets, the frequency can be higher."
    },
    {
      question: "Is donating blood painful?",
      answer: "You will feel a brief pinch when the needle is inserted, but the donation process itself is not painful. Most donors report feeling fine afterwards."
    },
    {
      question: "How long does the blood donation process take?",
      answer: "The entire process, including registration, a mini-physical, the donation itself, and post-donation refreshments, takes about an hour. The actual blood draw only takes about 8-10 minutes."
    }
  ];
