import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    // For demo purposes, just show a toast
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message! I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setLoading(false);
    }, 1000);
  };
  
  return (
    <section ref={sectionRef} className="py-20 bg-background" id="contact">
      <div className="container mx-auto px-4">
        <div className={`section-transition ${isInView ? 'visible' : ''}`}>
          <div className="mb-16">
            <h2 className="section-heading">Get in Touch</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className={`md:col-span-2 section-transition ${isInView ? 'visible' : ''}`}>
            <div className="bg-card p-6 md:p-8 rounded-md border border-muted">
              <h3 className="text-2xl font-bold text-primary mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <i className="ri-mail-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">vrutantpanchal1454@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <i className="ri-phone-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground">+918141824437</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <i className="ri-map-pin-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Location</h4>
                    <p className="text-muted-foreground">Vadodara, Gujarat, India, 390003</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <i className="ri-linkedin-box-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">LinkedIn</h4>
                    <p className="text-muted-foreground">www.linkedin.com/in/vrutantpanchal</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-muted">
                <Button className="w-full">
                  <i className="ri-download-line mr-2"></i>
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
          
          <div className={`md:col-span-3 section-transition ${isInView ? 'visible' : ''}`}>
            <div className="bg-card p-6 md:p-8 rounded-md border border-muted">
              <h3 className="text-2xl font-bold text-primary mb-8">Send a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-foreground">Name <span className="text-primary">*</span></label>
                    <Input 
                      type="text" 
                      id="name" 
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-background border-muted"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-foreground">Email <span className="text-primary">*</span></label>
                    <Input 
                      type="email" 
                      id="email" 
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-background border-muted"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 font-medium text-foreground">Subject</label>
                    <Input 
                      type="text" 
                      id="subject" 
                      placeholder="Message subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-background border-muted"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium text-foreground">Message <span className="text-primary">*</span></label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-background border-muted"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="ri-loader-2-line animate-spin mr-2"></i>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-line mr-2"></i>
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
