export const SITE_CONFIG = {
  name: 'Deeper Life Bible Church Lewisville',
  shortName: 'DCLM Lewisville',
  description: 'A Christ-centered church in Lewisville, TX, dedicated to biblical teaching and spiritual growth.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dclmlewisville.org',
  address: '123 Church Street, Lewisville, TX 75067',
  phone: '(123) 456-7890',
  email: 'info@dclmlewisville.org',
  socialMedia: {
    facebook: 'https://facebook.com/dclmlewisville',
    instagram: 'https://instagram.com/dclmlewisville',
    youtube: 'https://youtube.com/@dclmlewisville',
  },
}

export const SERVICE_TIMES = [
  {
    name: 'Sunday Service',
    day: 'Sunday',
    time: '9:30 AM',
    description: 'Main worship service',
  },
  {
    name: 'Bible Study',
    day: 'Tuesday',
    time: '7:00 PM',
    description: 'Systematic and expository study of the Word',
  },
  {
    name: 'Revival Service',
    day: 'Friday',
    time: '7:00 PM',
    description: 'Revival, Prayer, and Evangelism Training',
  },
]

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Ministries', href: '/ministries' },
  { name: 'Sermons', href: '/sermons' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
  { name: 'Give', href: '/give', highlight: true },
]