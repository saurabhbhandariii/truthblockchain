import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import TechnologySection from "@/components/technology-section";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[hsl(var(--soft-bg))] via-[hsl(var(--background))] to-[hsl(var(--glass))] text-[hsl(var(--foreground))] overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TechnologySection />
      <ServicesSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold gradient-text-cyber mb-4">
                DETECTIFY
              </div>
              <p className="text-slate-400 text-sm">
                Pioneering the future of video verification through AI, blockchain, and natural language processing.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[hsl(var(--cyber))] mb-4">Products</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-[hsl(var(--cyber))] transition-colors">Deepfake Detection</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--cyber))] transition-colors">Content Authentication</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--cyber))] transition-colors">Forensic Analysis</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--cyber))] transition-colors">Enterprise Solutions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[hsl(var(--electric))] mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-[hsl(var(--electric))] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--electric))] transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--electric))] transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--electric))] transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[hsl(var(--neural))] mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-[hsl(var(--neural))] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--neural))] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--neural))] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--neural))] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-400 text-sm">
              © 2025 DETECTIFY. All rights reserved. Built with cutting-edge technology for a transparent future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
