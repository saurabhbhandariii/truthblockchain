import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function TechnologySection() {
  const titleRef = useScrollAnimation();
  const descRef = useScrollAnimation(200);
  const cardRefs = [useScrollAnimation(300), useScrollAnimation(500), useScrollAnimation(700)];

  return (
    <section id="technology" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef as any}
            className="scroll-animate text-5xl font-bold mb-6 text-black"
          >
            Technology Stack
          </h2>
          <p 
            ref={descRef as any}
            className="scroll-animate text-xl text-gray-800 max-w-3xl mx-auto font-medium"
          >
            Built on cutting-edge technologies that push the boundaries of what's possible in video verification.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* AI & Machine Learning */}
          <Card 
            ref={cardRefs[0] as any}
            className="scroll-animate glass-morphism p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-purple-100"
          >
            <CardContent className="p-0">
              <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--electric))] to-[hsl(var(--cyber))] rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-brain text-white text-2xl"></i>
                  </div>
                  <span className="text-gray-700 font-medium">Neural Networks</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Artificial Intelligence</h3>
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--electric))] mr-3"></i><span className="font-medium">Deep Learning Models</span></li>
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--electric))] mr-3"></i><span className="font-medium">Computer Vision</span></li>
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--electric))] mr-3"></i><span className="font-medium">Pattern Recognition</span></li>
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--electric))] mr-3"></i><span className="font-medium">Real-time Analysis</span></li>
              </ul>
            </CardContent>
          </Card>

          {/* Blockchain */}
          <Card 
            ref={cardRefs[1] as any}
            className="scroll-animate glass-morphism p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-purple-100"
          >
            <CardContent className="p-0">
              <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--cyber))] to-[hsl(var(--neural))] rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-link text-white text-2xl"></i>
                  </div>
                  <span className="text-gray-700 font-medium">Immutable Ledger</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Blockchain Technology</h3>
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--cyber))] mr-3"></i><span className="font-medium">Decentralized Storage</span></li>
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--cyber))] mr-3"></i><span className="font-medium">Smart Contracts</span></li>
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--cyber))] mr-3"></i><span className="font-medium">Tamper-proof Records</span></li>
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--cyber))] mr-3"></i><span className="font-medium">Consensus Mechanisms</span></li>
              </ul>
            </CardContent>
          </Card>

          {/* NLP */}
          <Card 
            ref={cardRefs[2] as any}
            className="scroll-animate glass-morphism p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-purple-100"
          >
            <CardContent className="p-0">
              <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--neural))] to-[hsl(var(--electric))] rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-comments text-white text-2xl"></i>
                  </div>
                  <span className="text-gray-700 font-medium">Language Processing</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Natural Language Processing</h3>
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--neural))] mr-3"></i><span className="font-medium">Speech Recognition</span></li>
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--neural))] mr-3"></i><span className="font-medium">Sentiment Analysis</span></li>
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--neural))] mr-3"></i><span className="font-medium">Context Understanding</span></li>
                <li className="flex items-center"><i className="fas fa-check text-[hsl(var(--neural))] mr-3"></i><span className="font-medium">Audio-Visual Sync</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Demo Section */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-purple-100">
            <h3 className="text-3xl font-bold mb-8 text-black">How It Works</h3>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                { icon: "fas fa-upload", title: "Upload", desc: "Video Upload" },
                { icon: "fas fa-search", title: "Analyze", desc: "AI Analysis" },
                { icon: "fas fa-shield-alt", title: "Verify", desc: "Authenticity Check" },
                { icon: "fas fa-link", title: "Store", desc: "Blockchain Record" },
                { icon: "fas fa-certificate", title: "Report", desc: "Verification Result" }
              ].map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--electric))] to-[hsl(var(--cyber))] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className={`${step.icon} text-white text-xl`}></i>
                  </div>
                  <h4 className="text-lg font-bold text-black mb-2">{step.title}</h4>
                  <p className="text-gray-700 text-sm font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}