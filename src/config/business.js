// EDIT BUSINESS DETAILS HERE. Leave unknown values as null.
export const business = {
  name: 'Ndlinks Electro Mechanical Engineering Services',
  phoneDisplay: '0803 886 7386',
  phoneTel: '+2348038867386',
  whatsapp: '2348038867386',
  serviceArea: 'Enugu State, Nigeria',
  engineerName: 'Engr. Ndubuisi Agbaraebo Okorie',
  portrait: '/images/brand/engineer.jpg',
  education: 'Electrical Engineering, Institute of Management and Technology (IMT)',
  background: 'Worked under RCC',
  since: 'Involved in the industry since the 1990s',
  role: 'CEO, Ndlinks Electro Mechanical Engineering Services',
  roleSince: 'January 2008 to present',
  duties: [
    'Borehole drilling',
    'Camera and video investigation of faulty boreholes',
    'Fishing of dropped pumps and riser pipes from boreholes',
    'Pump installation and maintenance of water wells',
    'Producer of borehole cameras and DTH hammer rigs in Enugu, Nigeria',
  ],
}
export const waLink = (text) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`
