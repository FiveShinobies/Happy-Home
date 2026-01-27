// Sample services data
export const servicesData = [
  {
    id: 1,
    name: "Professional House Cleaning",
    category: "Cleaning",
    price: 49,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    provider: "CleanPro Services",
    description: "Comprehensive house cleaning service including all rooms, kitchen, and bathrooms. Our trained professionals use eco-friendly products to ensure a spotless and safe environment for your family.",
    duration: "2-3 hours",
    location: "Citywide",
    popular: true,
    features: [
      "Eco-friendly products",
      "Insured professionals",
      "Same-day available",
      "Deep cleaning option",
      "Satisfaction guaranteed"
    ],
    reviewsList: [
      {
        user: "Sarah M.",
        rating: 5,
        comment: "Excellent service! Very thorough and professional. They cleaned every corner of my house.",
        date: "2 weeks ago"
      },
      {
        user: "John D.",
        rating: 4,
        comment: "Good cleaning service, arrived on time and did a solid job.",
        date: "1 month ago"
      },
      {
        user: "Emily R.",
        rating: 5,
        comment: "Best cleaning service I've used. Will definitely book again!",
        date: "3 weeks ago"
      }
    ]
  },
  {
    id: 2,
    name: "Plumbing Repair & Maintenance",
    category: "Plumbing",
    price: 75,
    rating: 4.9,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
    provider: "QuickFix Plumbers",
    description: "Expert plumbing services for leaks, installations, and repairs. Available for emergency calls 24/7. Our licensed plumbers handle everything from minor fixes to major installations.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: true,
    features: [
      "24/7 Emergency service",
      "Licensed plumbers",
      "1-year warranty",
      "Free estimates",
      "Upfront pricing"
    ],
    reviewsList: [
      {
        user: "Mike R.",
        rating: 5,
        comment: "Fixed my leak quickly and professionally. Great service!",
        date: "1 week ago"
      },
      {
        user: "Lisa K.",
        rating: 5,
        comment: "Very knowledgeable and fair pricing. Highly recommend!",
        date: "3 weeks ago"
      }
    ]
  },
  {
    id: 3,
    name: "Electrical Services",
    category: "Electrical",
    price: 85,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    provider: "BrightSpark Electric",
    description: "Licensed electricians for installations, repairs, and safety inspections. All work guaranteed with proper certification and insurance coverage.",
    duration: "1-3 hours",
    location: "Citywide",
    popular: false,
    features: [
      "Licensed & insured",
      "Safety certified",
      "Free estimates",
      "Same-day service",
      "Code compliant work"
    ],
    reviewsList: [
      {
        user: "Tom B.",
        rating: 5,
        comment: "Professional and efficient service. Fixed all my electrical issues.",
        date: "2 weeks ago"
      },
      {
        user: "Anna S.",
        rating: 4,
        comment: "Good work, a bit pricey but worth it for the quality.",
        date: "1 month ago"
      }
    ]
  },
  {
    id: 4,
    name: "Garden & Lawn Care",
    category: "Gardening",
    price: 55,
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop",
    provider: "GreenThumb Gardeners",
    description: "Complete lawn maintenance including mowing, trimming, and seasonal care. We bring our own equipment and leave your yard looking pristine.",
    duration: "2-4 hours",
    location: "Suburban areas",
    popular: false,
    features: [
      "Weekly plans available",
      "Own equipment",
      "Seasonal packages",
      "Organic options",
      "Cleanup included"
    ],
    reviewsList: [
      {
        user: "Emma W.",
        rating: 5,
        comment: "My lawn has never looked better! Very reliable service.",
        date: "1 month ago"
      },
      {
        user: "David P.",
        rating: 4,
        comment: "Good service, they're always on time and do a thorough job.",
        date: "2 months ago"
      }
    ]
  },
  {
    id: 5,
    name: "Appliance Repair",
    category: "Repair",
    price: 65,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1581092918484-8313e1f9078d?w=400&h=300&fit=crop",
    provider: "ApplianceFix Pro",
    description: "Expert repair services for all major appliances including refrigerators, washers, dryers, and ovens. Fast, reliable service with quality parts.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: true,
    features: [
      "Same-day service",
      "All brands",
      "90-day warranty",
      "Quality parts",
      "Experienced technicians"
    ],
    reviewsList: [
      {
        user: "David L.",
        rating: 5,
        comment: "Fixed my refrigerator quickly! Very professional and knowledgeable.",
        date: "1 week ago"
      },
      {
        user: "Karen M.",
        rating: 5,
        comment: "Great service, my washer works like new now.",
        date: "2 weeks ago"
      }
    ]
  },
  {
    id: 6,
    name: "Painting Services",
    category: "Painting",
    price: 95,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
    provider: "ColorPerfect Painters",
    description: "Professional interior and exterior painting with premium quality paints and finishes. We ensure clean, precise work with minimal disruption.",
    duration: "Full day",
    location: "Citywide",
    popular: false,
    features: [
      "Premium paints",
      "Color consultation",
      "Clean finish",
      "Furniture protection",
      "2-year warranty"
    ],
    reviewsList: [
      {
        user: "Rachel P.",
        rating: 5,
        comment: "Beautiful work, very neat and professional!",
        date: "2 months ago"
      },
      {
        user: "Chris T.",
        rating: 4,
        comment: "Good painters, the color turned out exactly as I wanted.",
        date: "3 months ago"
      }
    ]
  },
  {
    id: 7,
    name: "HVAC Maintenance",
    category: "Repair",
    price: 80,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    provider: "CoolAir HVAC",
    description: "Complete heating and cooling system maintenance, repair, and installation. Keep your home comfortable year-round.",
    duration: "2-3 hours",
    location: "Citywide",
    popular: true,
    features: [
      "Certified technicians",
      "Energy efficiency check",
      "Emergency service",
      "Maintenance plans",
      "Parts warranty"
    ],
    reviewsList: [
      {
        user: "Robert J.",
        rating: 5,
        comment: "Fixed my AC quickly during a heat wave. Lifesavers!",
        date: "1 week ago"
      }
    ]
  },
  {
    id: 8,
    name: "Carpet Cleaning",
    category: "Cleaning",
    price: 60,
    rating: 4.6,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop",
    provider: "FreshCarpet Pros",
    description: "Deep carpet cleaning using professional-grade equipment and eco-friendly solutions. Remove stains, odors, and allergens.",
    duration: "2-3 hours",
    location: "Citywide",
    popular: false,
    features: [
      "Pet stain removal",
      "Eco-friendly products",
      "Fast drying",
      "Odor elimination",
      "Upholstery cleaning"
    ],
    reviewsList: [
      {
        user: "Linda H.",
        rating: 5,
        comment: "My carpets look brand new! Removed all the pet stains.",
        date: "3 weeks ago"
      }
    ]
  },
  {
    id: 9,
    name: "Professional House Cleaning",
    category: "Cleaning",
    price: 49,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    provider: "CleanPro Services",
    description: "Comprehensive house cleaning service including all rooms, kitchen, and bathrooms.",
    duration: "2-3 hours",
    location: "Citywide",
    popular: true,
    features: ["Eco-friendly products", "Insured professionals", "Same-day available"],
    reviewsList: [
      { user: "Sarah M.", rating: 5, comment: "Excellent service!", date: "2 weeks ago" }
    ]
  },
  {
    id: 10,
    name: "Plumbing Repair & Maintenance",
    category: "Plumbing",
    price: 75,
    rating: 4.9,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
    provider: "QuickFix Plumbers",
    description: "Expert plumbing services for leaks, installations, and repairs.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: true,
    features: ["24/7 service", "Licensed plumbers", "1-year warranty"],
    reviewsList: [
      { user: "Mike R.", rating: 5, comment: "Fixed my leak quickly!", date: "1 week ago" }
    ]
  },
  {
    id: 11,
    name: "Electrical Installation",
    category: "Electrical",
    price: 85,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    provider: "BrightSpark Electric",
    description: "Licensed electricians for installations and repairs.",
    duration: "1-3 hours",
    location: "Citywide",
    popular: false,
    features: ["Certified electricians", "Code compliant work", "Free estimates"],
    reviewsList: [
      { user: "Tom B.", rating: 5, comment: "Fixed all my issues.", date: "2 weeks ago" }
    ]
  },
  {
    id: 12,
    name: "Garden & Lawn Care",
    category: "Gardening",
    price: 55,
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop",
    provider: "GreenThumb Gardeners",
    description: "Complete lawn maintenance including mowing and trimming.",
    duration: "2-4 hours",
    location: "Suburban areas",
    popular: false,
    features: ["Weekly plans", "Organic options", "Cleanup included"],
    reviewsList: [
      { user: "Emma W.", rating: 5, comment: "My lawn looks amazing!", date: "1 month ago" }
    ]
  },
  {
    id: 13,
    name: "Appliance Repair",
    category: "Repair",
    price: 65,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1581092918484-8313e1f9078d?w=400&h=300&fit=crop",
    provider: "ApplianceFix Pro",
    description: "Expert repair services for all major appliances.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: true,
    features: ["Same-day service", "All brands", "Quality parts"],
    reviewsList: [
      { user: "Karen M.", rating: 5, comment: "Washer works like new!", date: "2 weeks ago" }
    ]
  },
  // --- ADDITIONAL SERVICES BELOW ---
  {
    id: 14,
    name: "Carpet Cleaning Deluxe",
    category: "Cleaning",
    price: 60,
    rating: 4.5,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop",
    provider: "FreshCarpet Pros",
    description: "Deep carpet cleaning using professional-grade equipment.",
    duration: "2-3 hours",
    location: "Citywide",
    popular: false,
    features: ["Pet stain removal", "Eco-friendly products", "Fast drying"],
    reviewsList: [
      { user: "Linda H.", rating: 5, comment: "Carpets look new!", date: "3 weeks ago" }
    ]
  },
  {
    id: 15,
    name: "Painting Services - Interior",
    category: "Painting",
    price: 95,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
    provider: "ColorPerfect Painters",
    description: "Professional interior painting with premium paints.",
    duration: "Full day",
    location: "Citywide",
    popular: false,
    features: ["Premium paints", "Color consultation", "Clean finish"],
    reviewsList: [
      { user: "Rachel P.", rating: 5, comment: "Beautiful work!", date: "2 months ago" }
    ]
  },
  {
    id: 16,
    name: "HVAC Maintenance",
    category: "Repair",
    price: 80,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    provider: "CoolAir HVAC",
    description: "Heating and cooling system maintenance, repair, and installation.",
    duration: "2-3 hours",
    location: "Citywide",
    popular: true,
    features: ["Energy efficiency check", "Certified technicians", "Warranty included"],
    reviewsList: [
      { user: "Robert J.", rating: 5, comment: "Fixed my AC fast!", date: "1 week ago" }
    ]
  },
  {
    id: 17,
    name: "Home Sanitization Service",
    category: "Cleaning",
    price: 70,
    rating: 4.8,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=400&h=300&fit=crop",
    provider: "SanitiPro",
    description: "Full home sanitization with hospital-grade disinfectants.",
    duration: "2-4 hours",
    location: "Citywide",
    popular: true,
    features: ["Safe for pets", "Non-toxic chemicals", "Quick drying"],
    reviewsList: [
      { user: "Megan K.", rating: 5, comment: "Great for post-COVID cleaning!", date: "1 week ago" }
    ]
  },
  {
    id: 18,
    name: "Furniture Assembly",
    category: "Repair",
    price: 40,
    rating: 4.6,
    reviews: 91,
    image: "https://images.unsplash.com/photo-1603400520065-46b44f5d34f3?w=400&h=300&fit=crop",
    provider: "HandyManX",
    description: "Quick and professional furniture assembly service.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["All types of furniture", "Affordable rates", "Same-day service"],
    reviewsList: [
      { user: "Jeff T.", rating: 4, comment: "Quick and easy setup!", date: "3 days ago" }
    ]
  },
  {
    id: 19,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]     

  },
  {
    id:20,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:21,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:22,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:23,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:24,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },{
    id:25,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:26,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:27,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },

  {
    id:28,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:29,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:30,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:31,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:32,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:33,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:34,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },
  {
    id:35,
    name: "Window Cleaning Service",
    category: "Cleaning",
    price: 50,
    rating: 4.7,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",     
    provider: "ClearView Windows",
    description: "Professional window cleaning for sparkling results.",
    duration: "1-2 hours",
    location: "Citywide",
    popular: false,
    features: ["Streak-free finish", "Interior & exterior", "Affordable pricing"],
    reviewsList: [
      { user: "Samantha L.", rating: 5, comment: "My windows have never looked better!", date: "2 weeks ago" }
    ]  
  },

];

export const categories = [
  "All",
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Gardening",
  "Repair",
  "Painting"
];