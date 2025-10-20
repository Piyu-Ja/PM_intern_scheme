"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Calendar, CalendarDays, User, Briefcase, GraduationCap, Target, MapPin, Clock, DollarSign, Building, Users, CheckCircle } from 'lucide-react';
import Navbar from '../components/navbar';


export default function InternshipDashboard() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    educationLevel: '',
    fieldOfStudy: '',
    university: '',
    duration: '',
    startDate: '',
    workMode: '',
    preferredLocation: '',
    industryInterests: [],
    rolePreference: '',
    workEnvironment: '',
    learningGoals: '',
    hardSkills: [],
    softSkills: [],
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [appliedInternships, setAppliedInternships] = useState([]);

  // Mock data for recommended internships
   const recommendedInternships = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      workMode: 'Hybrid',
      duration: '3 months',
      stipend: '$2,000/month',
      industry: 'Tech',
      description: 'Join our dynamic frontend team to build cutting-edge web applications using React, TypeScript, and modern web technologies. You\'ll work on real projects that impact thousands of users.',
      requirements: ['Currently pursuing Computer Science or related field', 'Basic knowledge of HTML, CSS, JavaScript', 'Familiarity with React.js', 'Strong problem-solving skills'],
      responsibilities: ['Develop responsive web interfaces', 'Collaborate with design and backend teams', 'Write clean, maintainable code', 'Participate in code reviews', 'Learn from senior developers'],
      skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
      applicationDeadline: '2024-01-15',
      startDate: '2024-02-01',
      companySize: '100-500 employees',
      companyType: 'Startup',
      mentorship: true,
      certificate: true
    },
    {
      id: '2',
      title: 'UX/UI Design Intern',
      company: 'Creative Studios',
      location: 'Remote',
      workMode: 'Remote',
      duration: '6 months',
      stipend: '$1,500/month',
      industry: 'Design',
      description: 'Work alongside experienced designers to create intuitive and beautiful user experiences for mobile and web applications. Perfect opportunity to build your design portfolio.',
      requirements: ['Portfolio showcasing design work', 'Proficiency in Figma or Adobe Creative Suite', 'Understanding of UX principles', 'Currently enrolled in Design or related program'],
      responsibilities: ['Create wireframes and prototypes', 'Conduct user research', 'Design user interfaces', 'Collaborate with development teams', 'Present design concepts to stakeholders'],
      skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Visual Design'],
      applicationDeadline: '2024-01-20',
      startDate: '2024-02-15',
      companySize: '20-50 employees',
      companyType: 'Design Agency',
      mentorship: true,
      certificate: true
    },
    {
      id: '3',
      title: 'Data Analytics Intern',
      company: 'DataInsights Inc',
      location: 'New York, NY',
      workMode: 'On-site',
      duration: '4 months',
      stipend: '$2,500/month',
      industry: 'Finance',
      description: 'Dive into the world of data science and analytics. Work with large datasets to extract meaningful insights that drive business decisions in the financial sector.',
      requirements: ['Strong foundation in statistics and mathematics', 'Experience with Python or R', 'Knowledge of SQL', 'Currently pursuing degree in Data Science, Statistics, or related field'],
      responsibilities: ['Analyze complex datasets', 'Create data visualizations', 'Build predictive models', 'Present findings to management', 'Collaborate with cross-functional teams'],
      skills: ['Python', 'SQL', 'Excel', 'Tableau', 'Statistics'],
      applicationDeadline: '2024-01-10',
      startDate: '2024-01-25',
      companySize: '500+ employees',
      companyType: 'MNC',
      mentorship: true,
      certificate: false
    },
    {
      id: '4',
      title: 'Digital Marketing Intern',
      company: 'Growth Marketing Co',
      location: 'Austin, TX',
      workMode: 'Hybrid',
      duration: '3 months',
      stipend: '$1,800/month',
      industry: 'Marketing',
      description: 'Learn digital marketing strategies across multiple channels including social media, email marketing, and content creation. Gain hands-on experience with marketing tools and analytics.',
      requirements: ['Strong written communication skills', 'Social media savvy', 'Basic understanding of marketing principles', 'Currently studying Marketing, Communications, or Business'],
      responsibilities: ['Manage social media accounts', 'Create marketing content', 'Analyze campaign performance', 'Assist with email marketing campaigns', 'Research market trends'],
      skills: ['Content Creation', 'Social Media Marketing', 'Google Analytics', 'Email Marketing', 'SEO'],
      applicationDeadline: '2024-01-25',
      startDate: '2024-03-01',
      companySize: '50-100 employees',
      companyType: 'Marketing Agency',
      mentorship: true,
      certificate: true
    },
    {
      id: '5',
      title: 'Research Assistant Intern',
      company: 'Innovation Research Lab',
      location: 'Boston, MA',
      workMode: 'On-site',
      duration: '6 months',
      stipend: '$1,200/month',
      industry: 'Research',
      description: 'Support groundbreaking research in artificial intelligence and machine learning. Work with PhD researchers and contribute to published papers in top-tier conferences.',
      requirements: ['Strong academic background in Computer Science or related field', 'Knowledge of machine learning concepts', 'Programming experience in Python', 'Research experience preferred'],
      responsibilities: ['Conduct literature reviews', 'Implement research algorithms', 'Analyze experimental results', 'Assist in writing research papers', 'Present findings at lab meetings'],
      skills: ['Python', 'Machine Learning', 'Research Methodology', 'Technical Writing', 'Data Analysis'],
      applicationDeadline: '2024-02-01',
      startDate: '2024-03-15',
      companySize: '10-20 employees',
      companyType: 'Research Lab',
      mentorship: true,
      certificate: false
    },
    {
      id: '6',
      title: 'Product Management Intern',
      company: 'InnovateTech',
      location: 'Seattle, WA',
      workMode: 'Hybrid',
      duration: '4 months',
      stipend: '$2,200/month',
      industry: 'Tech',
      description: 'Learn product management fundamentals while working on real product features. Collaborate with engineering, design, and business teams to ship products that users love.',
      requirements: ['Strong analytical and problem-solving skills', 'Excellent communication abilities', 'Interest in technology and product development', 'Currently studying Business, Engineering, or related field'],
      responsibilities: ['Gather and analyze user feedback', 'Write product requirements', 'Coordinate with development teams', 'Track product metrics', 'Assist in product strategy planning'],
      skills: ['Product Strategy', 'User Research', 'Data Analysis', 'Project Management', 'Communication'],
      applicationDeadline: '2024-01-18',
      startDate: '2024-02-10',
      companySize: '200-500 employees',
      companyType: 'Tech Company',
      mentorship: true,
      certificate: true
    }
  ];

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Handle form submission here
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br pt-25  from-orange-50 to-white p-4">
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2 text-gray-800">Internship Application Dashboard</h1>
          <p className="text-gray-600">Complete your profile to find the perfect internship opportunity</p>
        </div>

        <Card className="shadow-lg border-orange-200">
          {/* Card header */}
          <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Briefcase className="h-6 w-6" />
              Your Internship Profile
            </CardTitle>
            <CardDescription className="text-orange-700">
              Tell us about yourself and your internship preferences
            </CardDescription>
          </CardHeader>
          
          {/* Card */}
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-orange-100">
                <TabsTrigger value="personal" className="flex items-center focus:text-white text-black gap-1 md:gap-2 data-[state=active]:bg-orange-400 text-sm md:text-base">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Personal</span>
                  <span className="sm:hidden">Info</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-1 md:gap-2  focus:text-white text-black data-[state=active]:bg-orange-400 text-sm md:text-base">
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden sm:inline">Preferences</span>
                  <span className="sm:hidden">Prefs</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-1 md:gap-2  focus:text-white text-black data-[state=active]:bg-orange-400 text-sm md:text-base">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Education</span>
                  <span className="sm:hidden">Edu</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-1 md:gap-2  focus:text-white text-black data-[state=active]:bg-orange-400 text-sm md:text-base">
                  <Target className="h-4 w-4" />
                  <span className="hidden sm:inline">Skills & Goals</span>
                  <span className="sm:hidden">Skills</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal Section */}
              <TabsContent value="personal" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Current Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* Preference section */}
              <TabsContent value="preferences" className="space-y-6 text-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Preferred Internship Duration *</Label>
                    <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-months">2 months</SelectItem>
                        <SelectItem value="3-months">3 months</SelectItem>
                        <SelectItem value="6-months">6 months</SelectItem>
                        <SelectItem value="12-months">12 months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Available Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Preferred Work Mode *</Label>
                    <RadioGroup value={formData.workMode} onValueChange={(value) => handleInputChange('workMode', value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="remote" id="remote" />
                        <Label htmlFor="remote">Remote</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="onsite" id="onsite" />
                        <Label htmlFor="onsite">On-site</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hybrid" id="hybrid" />
                        <Label htmlFor="hybrid">Hybrid</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredLocation">Preferred Work Location</Label>
                    <Input
                      id="preferredLocation"
                      value={formData.preferredLocation}
                      onChange={(e) => handleInputChange('preferredLocation', e.target.value)}
                      placeholder="City, Country (if not remote)"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Industry Interests (Select all that apply)</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {['Tech', 'Marketing', 'Finance', 'Design', 'Healthcare', 'Education', 'Consulting', 'Media', 'Non-profit', 'Research'].map((industry) => (
                      <div key={industry} className="flex items-center space-x-2">
                        <Checkbox
                          id={industry}
                          checked={formData.industryInterests.includes(industry)}
                          // onCheckedChange={(checked) => handleArrayChange('industryInterests', industry, checked as boolean)}
                        />
                        <Label htmlFor={industry}>{industry}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Role Preference *</Label>
                    <Select value={formData.rolePreference} onValueChange={(value) => handleInputChange('rolePreference', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="researcher">Researcher</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Work Environment Preference *</Label>
                    <Select value={formData.workEnvironment} onValueChange={(value) => handleInputChange('workEnvironment', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="mnc">Multinational Corporation (MNC)</SelectItem>
                        <SelectItem value="ngo">Non-Governmental Organization (NGO)</SelectItem>
                        <SelectItem value="research-lab">Research Lab</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="small-business">Small Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              {/* Education Section */}
              <TabsContent value="education" className="space-y-6 text-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Current Education Level *</Label>
                    <Select value={formData.educationLevel} onValueChange={(value) => handleInputChange('educationLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="bootcamp">Bootcamp</SelectItem>
                        <SelectItem value="certificate">Certificate Program</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy">Field of Study / Major *</Label>
                    <Input
                      id="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                      placeholder="e.g., Computer Science, Business, Design"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="university">University / College Name *</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      placeholder="Name of your educational institution"
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* Skills and Goal section  */}
              <TabsContent value="skills" className="space-y-6 text-black">
                <div className="space-y-4">
                  <Label htmlFor="learningGoals">Learning Goals</Label>
                  <Textarea
                    id="learningGoals"
                    value={formData.learningGoals}
                    onChange={(e) => handleInputChange('learningGoals', e.target.value)}
                    placeholder="What do you hope to learn and achieve during your internship?"
                    className="min-h-24"
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>Hard Skills (Select all that apply)</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {['Programming', 'Web Development', 'Mobile Development', 'Data Analysis', 'Design', 'Digital Marketing', 'Content Writing', 'Project Management', 'Research', 'Financial Analysis'].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={formData.hardSkills.includes(skill)}
                          // onCheckedChange={(checked) => handleArrayChange('hardSkills', skill, checked as boolean)}
                        />
                        <Label htmlFor={skill}>{skill}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Soft Skills (Select all that apply)</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {['Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Time Management', 'Adaptability', 'Critical Thinking', 'Creativity', 'Public Speaking', 'Negotiation'].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={formData.softSkills.includes(skill)}
                          // onCheckedChange={(checked) => handleArrayChange('softSkills', skill, checked as boolean)}
                        />
                        <Label htmlFor={skill}>{skill}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-8 pt-6 border-t border-orange-200">
              <Button
                variant="outline"
                onClick={() => {
                  const tabs = ['personal', 'preferences', 'education', 'skills'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex > 0) {
                    setActiveTab(tabs[currentIndex - 1]);
                  }
                }}
                disabled={activeTab === 'personal'}
                className="border-orange-300 text-orange-700 hover:bg-orange-50 sm:w-auto w-full"
              >
                Previous
              </Button>
              
              {activeTab === 'skills' ? (
                <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 text-white sm:w-auto w-full">
                  Submit Application
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    const tabs = ['personal', 'preferences', 'education', 'skills'];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1]);
                    }
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white sm:w-auto w-full"
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Internships Section */}
        <Card className="shadow-lg border-orange-200 mt-8">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Target className="h-6 w-6" />
              Recommended Internships
            </CardTitle>
            <CardDescription className="text-orange-700">
              Based on your preferences, here are some internships that might be perfect for you
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedInternships.map((internship) => (
                <Dialog key={internship.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow border-orange-100 hover:border-orange-300">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-orange-900 mb-1">{internship.title}</h3>
                              <p className="text-gray-600">{internship.company}</p>
                            </div>
                            {appliedInternships.includes(internship.id) && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Applied
                              </Badge>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{internship.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{internship.duration} • {internship.workMode}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                              <DollarSign className="h-4 w-4" />
                              <span>{internship.stipend}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-orange-700 border-orange-300">
                              {internship.industry}
                            </Badge>
                            {internship.mentorship && (
                              <Badge variant="outline" className="text-blue-700 border-blue-300">
                                Mentorship
                              </Badge>
                            )}
                            {internship.certificate && (
                              <Badge variant="outline" className="text-green-700 border-green-300">
                                Certificate
                              </Badge>
                            )}
                          </div>
                          
                          <Button 
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInternship(internship);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-orange-900">{internship.title}</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        {internship.company} • {internship.location}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <Clock className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                          <p className="text-orange-900">{internship.duration}</p>
                        </div>
                        
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <DollarSign className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                          <p className="text-orange-900">{internship.stipend}</p>
                        </div>
                        
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <MapPin className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                          <p className="text-orange-900">{internship.workMode}</p>
                        </div>
                        
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <Building className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                          <p className="text-orange-900">{internship.companyType}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-orange-900 mb-2">Description</h4>
                        <p className="text-gray-600">{internship.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-orange-900 mb-2">Key Responsibilities</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {internship.responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-orange-900 mb-2">Requirements</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {internship.requirements.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-orange-900 mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {internship.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-orange-700 border-orange-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                        <div>
                          <p><strong>Company Size:</strong> {internship.companySize}</p>
                          <p><strong>Start Date:</strong> {new Date(internship.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p><strong>Application Deadline:</strong> {new Date(internship.applicationDeadline).toLocaleDateString()}</p>
                          <div className="flex items-center gap-4 mt-2">
                            {internship.mentorship && (
                              <Badge variant="outline" className="text-blue-700 border-blue-300">
                                <Users className="h-3 w-3 mr-1" />
                                Mentorship Included
                              </Badge>
                            )}
                            {internship.certificate && (
                              <Badge variant="outline" className="text-green-700 border-green-300">
                                <GraduationCap className="h-3 w-3 mr-1" />
                                Certificate Provided
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <Button 
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => handleApply(internship.id)}
                          disabled={appliedInternships.includes(internship.id)}
                        >
                          {appliedInternships.includes(internship.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Application Submitted
                            </>
                          ) : (
                            'Apply Now'
                          )}
                        </Button>
                        <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                          Save for Later
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}