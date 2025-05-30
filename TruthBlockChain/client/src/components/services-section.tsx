import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesSection() {
  const services = [
    {
      icon: "fas fa-shield-alt",
      title: "Deepfake Detection",
      description: "Advanced AI algorithms detect synthetic media and deepfake videos with 99.7% accuracy rate.",
      color: "cyber",
      features: ["Real-time scanning", "Batch processing", "API integration"]
    },
    {
      icon: "fas fa-fingerprint",
      title: "Content Authentication",
      description: "Blockchain-based verification creates immutable proof of content authenticity and origin.",
      color: "electric",
      features: ["Digital signatures", "Timestamp verification", "Chain of custody"]
    },
    {
      icon: "fas fa-search",
      title: "Forensic Analysis",
      description: "Comprehensive video forensics including manipulation detection and metadata analysis.",
      color: "neural",
      features: ["Frame analysis", "Audio synchronization", "Detailed reports"]
    },
    {
      icon: "fas fa-cloud",
      title: "Enterprise Solutions",
      description: "Scalable cloud-based platform for organizations requiring high-volume video verification.",
      color: "cyber",
      features: ["Custom dashboards", "Team collaboration", "Priority support"]
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile Integration",
      description: "Native mobile SDKs for real-time video verification in mobile applications.",
      color: "electric",
      features: ["iOS & Android SDKs", "Offline capabilities", "Low latency"]
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Training & Consulting",
      description: "Expert consultation and training programs for media literacy and verification techniques.",
      color: "neural",
      features: ["Workshop sessions", "Best practices", "Certification programs"]
    }
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case 'cyber': return 'hsl(var(--cyber))';
      case 'electric': return 'hsl(var(--electric))';
      case 'neural': return 'hsl(var(--neural))';
      default: return 'hsl(var(--cyber))';
    }
  };

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text-neural">
            Our Services
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive video verification solutions for businesses, media organizations, and institutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-morphism p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 group border-slate-700 h-full">
                <CardContent className="p-0">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br from-[${getColorClass(service.color)}] to-[${getColorClass('electric')}] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className={`${service.icon} text-2xl text-white`}></i>
                  </motion.div>
                  <h3 className={`text-2xl font-bold mb-4 text-[${getColorClass(service.color)}]`}>
                    {service.title}
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {service.description}
                  </p>
                  <div className="text-sm text-slate-400">
                    {service.features.map((feature, idx) => (
                      <div key={idx}>
                        <i className="fas fa-check mr-2"></i>{feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
