import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  FileText,
  CheckCircle,
  Star,
  Clock
} from "lucide-react";

interface MobileApplicationProps {
  onBack: () => void;
}

const MobileApplication = ({ onBack }: MobileApplicationProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    company: "",
    experience: "",
    education: "",
    location: "",
    skills: "",
    coverLetter: "",
    resume: null as File | null,
    profilePhoto: null as File | null,
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (type: 'resume' | 'profilePhoto') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange(type, file);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.position && formData.company && formData.experience;
      case 3:
        return formData.education && formData.location && formData.skills;
      case 4:
        return formData.coverLetter;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to continue.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      toast({
        title: "Incomplete Application",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Application Submitted! 🎉",
      description: "We'll be in touch within 24 hours.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-mobile-light flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white rounded-3xl shadow-mobile-glow animate-bounce-in">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-mobile rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">You're All Set!</h2>
            <p className="text-gray-600 mb-6">
              Your application has been submitted successfully. We'll review it and get back to you soon.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-mobile-primary" />
                  <span className="text-sm text-gray-600">Response Time</span>
                </div>
                <Badge variant="secondary" className="bg-mobile-primary/10 text-mobile-primary">
                  24-48 hours
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">Application ID</span>
                </div>
                <span className="text-sm font-mono text-gray-800">#AP2024{Math.floor(Math.random() * 1000)}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  setFormData({
                    firstName: "", lastName: "", email: "", phone: "",
                    position: "", company: "", experience: "", education: "",
                    location: "", skills: "", coverLetter: "",
                    resume: null, profilePhoto: null
                  });
                }}
                className="w-full bg-gradient-mobile text-white h-12 rounded-xl"
              >
                Submit Another Application
              </Button>
              
              <Button 
                onClick={onBack}
                variant="outline" 
                className="w-full h-12 rounded-xl"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mobile-light">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={step === 1 ? onBack : prevStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 1 ? "Home" : "Back"}
          </Button>
          
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</div>
            <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
              <div 
                className="h-full bg-gradient-mobile rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 pb-24">
        <Card className="bg-white rounded-3xl shadow-mobile overflow-hidden">
          <CardHeader className="pb-4">
            <div className="text-center">
              {step === 1 && (
                <div className="space-y-2">
                  <User className="w-8 h-8 text-mobile-primary mx-auto" />
                  <h2 className="text-xl font-bold text-gray-800">Personal Info</h2>
                  <p className="text-sm text-gray-600">Let's start with the basics</p>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-2">
                  <Briefcase className="w-8 h-8 text-mobile-primary mx-auto" />
                  <h2 className="text-xl font-bold text-gray-800">Job Details</h2>
                  <p className="text-sm text-gray-600">Tell us about your target role</p>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-2">
                  <GraduationCap className="w-8 h-8 text-mobile-primary mx-auto" />
                  <h2 className="text-xl font-bold text-gray-800">Background</h2>
                  <p className="text-sm text-gray-600">Your education and skills</p>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-2">
                  <FileText className="w-8 h-8 text-mobile-primary mx-auto" />
                  <h2 className="text-xl font-bold text-gray-800">Final Details</h2>
                  <p className="text-sm text-gray-600">Cover letter and documents</p>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                {/* Profile Photo Upload */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-gradient-mobile rounded-full flex items-center justify-center mx-auto mb-2">
                      {formData.profilePhoto ? (
                        <img 
                          src={URL.createObjectURL(formData.profilePhoto)} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <Camera className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload('profilePhoto')}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Add a professional photo</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="John"
                      className="h-12 rounded-xl border-2 focus:border-mobile-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Doe"
                      className="h-12 rounded-xl border-2 focus:border-mobile-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john.doe@example.com"
                      className="h-12 pl-12 rounded-xl border-2 focus:border-mobile-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="h-12 pl-12 rounded-xl border-2 focus:border-mobile-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-sm font-medium">Position Applied For *</Label>
                  <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                    <SelectTrigger className="h-12 rounded-xl border-2 focus:border-mobile-primary">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend Developer</SelectItem>
                      <SelectItem value="backend">Backend Developer</SelectItem>
                      <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                      <SelectItem value="mobile">Mobile Developer</SelectItem>
                      <SelectItem value="designer">UI/UX Designer</SelectItem>
                      <SelectItem value="product">Product Manager</SelectItem>
                      <SelectItem value="data">Data Scientist</SelectItem>
                      <SelectItem value="devops">DevOps Engineer</SelectItem>
                      <SelectItem value="marketing">Marketing Specialist</SelectItem>
                      <SelectItem value="sales">Sales Representative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">Target Company *</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Company name or 'Open to opportunities'"
                      className="h-12 pl-12 rounded-xl border-2 focus:border-mobile-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium">Years of Experience *</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger className="h-12 rounded-xl border-2 focus:border-mobile-primary">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years (Entry Level)</SelectItem>
                      <SelectItem value="2-3">2-3 years (Junior)</SelectItem>
                      <SelectItem value="4-6">4-6 years (Mid-Level)</SelectItem>
                      <SelectItem value="7-10">7-10 years (Senior)</SelectItem>
                      <SelectItem value="10+">10+ years (Expert/Lead)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="education" className="text-sm font-medium">Education *</Label>
                  <Select value={formData.education} onValueChange={(value) => handleInputChange("education", value)}>
                    <SelectTrigger className="h-12 rounded-xl border-2 focus:border-mobile-primary">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="bootcamp">Coding Bootcamp</SelectItem>
                      <SelectItem value="associate">Associate Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="self-taught">Self-Taught</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">Preferred Work Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                    <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                      <SelectTrigger className="h-12 pl-12 rounded-xl border-2 focus:border-mobile-primary">
                        <SelectValue placeholder="Select work preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="onsite-nyc">On-site (New York)</SelectItem>
                        <SelectItem value="onsite-sf">On-site (San Francisco)</SelectItem>
                        <SelectItem value="onsite-la">On-site (Los Angeles)</SelectItem>
                        <SelectItem value="onsite-chicago">On-site (Chicago)</SelectItem>
                        <SelectItem value="onsite-other">On-site (Other)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-sm font-medium">Key Skills *</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                    placeholder="React, Node.js, Python, TypeScript, AWS..."
                    className="min-h-[80px] rounded-xl border-2 focus:border-mobile-primary resize-none"
                  />
                  <p className="text-xs text-gray-500">Separate skills with commas</p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-sm font-medium">Resume Upload (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-mobile-primary transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <span className="text-sm text-gray-600">
                        {formData.resume ? formData.resume.name : "Tap to upload your resume"}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 5MB)</div>
                      <input
                        id="resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload('resume')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coverLetter" className="text-sm font-medium">Cover Letter *</Label>
                  <Textarea
                    id="coverLetter"
                    value={formData.coverLetter}
                    onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    className="min-h-[120px] rounded-xl border-2 focus:border-mobile-primary resize-none"
                  />
                  <p className="text-xs text-gray-500">{formData.coverLetter.length}/500 characters</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3">
          {step < totalSteps ? (
            <Button
              onClick={nextStep}
              className="flex-1 bg-gradient-mobile text-white h-12 rounded-xl font-medium"
            >
              Continue
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-gradient-mobile text-white h-12 rounded-xl font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileApplication;