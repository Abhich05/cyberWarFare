module.exports = {
  // Promo code configuration
  PROMO_CODE: 'BFSALE25',
  DISCOUNT_PERCENTAGE: 50,

  // JWT configuration
  JWT_EXPIRES_IN: '7d',
  COOKIE_EXPIRES_DAYS: 7,

  // Cookie configuration for cross-origin (Vercel <-> Render)
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Must be true for sameSite: 'none'
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-origin
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },

  // CyberWarFare Labs Channel Info
  CHANNEL_URL: 'https://www.youtube.com/@CyberWarFareLabs',

  // Mock courses data with CyberWarFare Labs videos
  
  MOCK_COURSES: [
    {
      title: 'Cybersecurity Fundamentals',
      description: 'Learn the basics of cybersecurity including threat detection, network security, and best practices for protecting digital assets. Perfect for beginners looking to start their security journey.',
      price: 0,
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      duration: '4 hours',
      instructor: 'CyberWarFare Labs',
      level: 'Beginner',
      modules: 8,
      videoUrl: 'https://www.youtube.com/@CyberWarFareLabs',
      previewVideoId: 'LApSn20_Y2o', 
    },
    {
      title: 'Advanced Penetration Testing',
      description: 'Master ethical hacking techniques including vulnerability assessment, exploitation, and post-exploitation. Hands-on labs with real-world scenarios.',
      price: 199.99,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      duration: '12 hours',
      instructor: 'CyberWarFare Labs',
      level: 'Advanced',
      modules: 15,
      videoUrl: 'https://www.youtube.com/@CyberWarFareLabs',
      previewVideoId: 'RxHENrtbDt8', 
    },
    {
      title: 'Network Security Masterclass',
      description: 'Deep dive into network protocols, firewall configuration, intrusion detection systems, and secure network architecture design.',
      price: 149.99,
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      duration: '8 hours',
      instructor: 'CyberWarFare Labs',
      level: 'Intermediate',
      modules: 12,
      videoUrl: 'https://www.youtube.com/@CyberWarFareLabs',
      previewVideoId: 'bO7kXSU_sxg',
    },
    {
      title: 'Cloud Security Essentials',
      description: 'Secure AWS, Azure, and GCP environments. Learn IAM, encryption, compliance frameworks, and cloud-native security tools.',
      price: 179.99,
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
      duration: '10 hours',
      instructor: 'CyberWarFare Labs',
      level: 'Intermediate',
      modules: 14,
      videoUrl: 'https://www.youtube.com/@CyberWarFareLabs',
      previewVideoId: 'ARefHMpg0QE', 
    },
    {
      title: 'Incident Response & Forensics',
      description: 'Learn to investigate security breaches, collect digital evidence, and implement incident response procedures following industry standards.',
      price: 0,
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400',
      duration: '6 hours',
      instructor: 'CyberWarFare Labs',
      level: 'Intermediate',
      modules: 10,
      videoUrl: 'https://www.youtube.com/@CyberWarFareLabs',
      previewVideoId: 'EamKvfJk_kc', 
    },
  ],
};
