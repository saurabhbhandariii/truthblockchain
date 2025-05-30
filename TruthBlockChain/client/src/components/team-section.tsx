import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Dr. Alex Chen",
      role: "CEO & Founder",
      description: "Former AI Research Lead at Google, PhD in Computer Vision from MIT",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      color: "cyber"
    },
    {
      name: "Sarah Rodriguez",
      role: "CTO",
      description: "Blockchain architect, former Microsoft Azure team, 15+ years in distributed systems",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      color: "electric"
    },
    {
      name: "Dr. Marcus Kim",
      role: "Head of AI Research",
      description: "Machine Learning expert, published researcher, former Facebook AI team",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      color: "neural"
    },
    {
      name: "Elena Petrov",
      role: "Head of Security",
      description: "Cybersecurity expert, former NSA, specializing in digital forensics and verification",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      color: "cyber"
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
    <section id="team" className="py-20 bg-gradient-to-br from-[hsl(var(--deep))]/50 to-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text-electric">
            Expert Team
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Leading researchers and engineers from top tech companies and academic institutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-morphism p-6 rounded-2xl text-center hover:shadow-2xl transition-all duration-300 group border-slate-700">
                <CardContent className="p-0">
                  <motion.img 
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className={`w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-[${getColorClass(member.color)}] group-hover:border-[hsl(var(--electric))] transition-colors duration-300`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3 className={`text-xl font-bold text-[${getColorClass(member.color)}] mb-2`}>
                    {member.name}
                  </h3>
                  <p className="text-[hsl(var(--electric))] text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="glass-morphism p-8 rounded-2xl inline-block border-slate-700">
            <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--cyber))]">Join Our Mission</h3>
            <p className="text-slate-300 mb-6 max-w-2xl">
              We're looking for passionate individuals who believe in the power of truth and want to shape the future of digital verification.
            </p>
            <Button className="px-6 py-3 bg-gradient-to-r from-[hsl(var(--electric))] to-[hsl(var(--cyber))] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300">
              <i className="fas fa-users mr-2"></i>
              View Open Positions
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
