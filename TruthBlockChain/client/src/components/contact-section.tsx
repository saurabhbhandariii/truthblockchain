import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest('POST', '/api/contacts', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message! We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while sending your message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text-neural">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ready to revolutionize your video verification process? Let's discuss how DETECTIFY can help secure your digital content.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-morphism p-8 rounded-2xl border-slate-700">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--cyber))]">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-medium text-slate-300 mb-2">First Name</Label>
                      <Input 
                        type="text" 
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-[hsl(var(--cyber))] focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-slate-300 mb-2">Last Name</Label>
                      <Input 
                        type="text" 
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-[hsl(var(--cyber))] focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-slate-300 mb-2">Email Address</Label>
                    <Input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-[hsl(var(--cyber))] focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-slate-300 mb-2">Company</Label>
                    <Input 
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-[hsl(var(--cyber))] focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-slate-300 mb-2">How can we help you?</Label>
                    <Textarea 
                      rows={4} 
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-[hsl(var(--cyber))] focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={contactMutation.isPending}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[hsl(var(--cyber))] to-[hsl(var(--electric))] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-morphism p-6 rounded-2xl border-slate-700">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--cyber))] to-[hsl(var(--electric))] rounded-xl flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[hsl(var(--cyber))]">Headquarters</h4>
                    <p className="text-slate-300">Zurich, Switzerland</p>
                    <p className="text-slate-400 text-sm">Innovation Hub, Central Europe</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism p-6 rounded-2xl border-slate-700">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--electric))] to-[hsl(var(--neural))] rounded-xl flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[hsl(var(--electric))]">Email</h4>
                    <p className="text-slate-300">beforelyf07@gmail.com</p>
                    <p className="text-slate-400 text-sm">We respond within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism p-6 rounded-2xl border-slate-700">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--neural))] to-[hsl(var(--cyber))] rounded-xl flex items-center justify-center mr-4">
                    <i className="fas fa-phone text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[hsl(var(--neural))]">Phone</h4>
                    <p className="text-slate-300">+91 7668779153</p>
                    <p className="text-slate-400 text-sm">Monday - Friday, 9 AM - 6 PM CET</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism p-6 rounded-2xl border-slate-700">
              <CardContent className="p-0">
                <h4 className="text-lg font-bold text-[hsl(var(--cyber))] mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--cyber))] to-[hsl(var(--electric))] rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-twitter text-white"></i>
                  </motion.a>
                  <motion.a 
                    href="https://www.linkedin.com/in/saurabh-bhandari-b1966b252/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--electric))] to-[hsl(var(--neural))] rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-linkedin text-white"></i>
                  </motion.a>
                  <motion.a 
                    href="https://www.instagram.com/saurabh_bhandariii/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--neural))] to-[hsl(var(--cyber))] rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-instagram text-white"></i>
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
