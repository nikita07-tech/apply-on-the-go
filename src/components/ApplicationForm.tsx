import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, User, Mail, Phone, FileText, MapPin, Briefcase, CheckCircle } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  location: string;
  coverLetter: string;
  resume: File | null;
  portfolio: string;
}

const ApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    location: "",
    coverLetter: "",
    resume: null,
    portfolio: "",
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleInputChange = (field: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange("resume", file);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.position && formData.experience && formData.location;
      case 3:
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
        title: "Please fill in all required fields",
        description: "Complete all fields before proceeding to the next step.",
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
        title: "Please fill in all required fields",
        description: "Complete all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Application submitted successfully!",
      description: "We'll review your application and get back to you soon.",
    });
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto animate-bounce-in">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your interest in joining our team. We've received your application and will review it carefully.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>You'll receive a confirmation email shortly.</p>
            <p>We typically respond within 3-5 business days.</p>
          </div>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            className="mt-6"
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto animate-slide-up">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-foreground">Job Application</CardTitle>
        <CardDescription className="text-center">
          Step {step} of {totalSteps}
        </CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      
      <CardContent className="p-6">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Professional Details</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Position Applied For *</Label>
              <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                  <SelectItem value="backend-developer">Backend Developer</SelectItem>
                  <SelectItem value="fullstack-developer">Full Stack Developer</SelectItem>
                  <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                  <SelectItem value="product-manager">Product Manager</SelectItem>
                  <SelectItem value="data-scientist">Data Scientist</SelectItem>
                  <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                  <SelectItem value="marketing-specialist">Marketing Specialist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience *</Label>
              <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years (Entry Level)</SelectItem>
                  <SelectItem value="2-3">2-3 years (Junior)</SelectItem>
                  <SelectItem value="4-6">4-6 years (Mid-Level)</SelectItem>
                  <SelectItem value="7-10">7-10 years (Senior)</SelectItem>
                  <SelectItem value="10+">10+ years (Expert)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Preferred Work Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select work preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite-nyc">On-site (New York)</SelectItem>
                    <SelectItem value="onsite-sf">On-site (San Francisco)</SelectItem>
                    <SelectItem value="onsite-la">On-site (Los Angeles)</SelectItem>
                    <SelectItem value="onsite-chicago">On-site (Chicago)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio/LinkedIn URL (Optional)</Label>
              <Input
                id="portfolio"
                type="url"
                value={formData.portfolio}
                onChange={(e) => handleInputChange("portfolio", e.target.value)}
                placeholder="https://yourportfolio.com or https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Additional Information</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resume">Resume Upload (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <span className="text-sm text-muted-foreground">
                    {formData.resume ? formData.resume.name : "Click to upload your resume (PDF, DOC, DOCX)"}
                  </span>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter *</Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                placeholder="Tell us why you're interested in this position and what makes you a great fit for our team..."
                className="min-h-[120px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {formData.coverLetter.length}/500 characters
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
            className="w-24"
          >
            Previous
          </Button>
          
          {step < totalSteps ? (
            <Button
              onClick={nextStep}
              variant="gradient"
              className="w-24"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              variant="success"
              className="w-32"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationForm;