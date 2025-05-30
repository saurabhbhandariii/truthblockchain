import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutSection() {
  const titleRef = useScrollAnimation();
  const descRef = useScrollAnimation(200);
  const cardRefs = [useScrollAnimation(300), useScrollAnimation(500), useScrollAnimation(700)];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef as any}
            className="scroll-animate text-5xl font-bold mb-6 text-black"
          >
            The Future of Truth
          </h2>
          <p 
            ref={descRef as any}
            className="scroll-animate text-xl text-gray-800 max-w-3xl mx-auto font-medium"
          >
            In an era of deepfakes and digital manipulation, DETECTIFY stands as the guardian of authenticity, 
            using cutting-edge technology to verify the truth behind every frame.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Card 
              ref={cardRefs[0] as any}
              className="scroll-animate glass-morphism p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-purple-100"
            >
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--electric))] to-[hsl(var(--cyber))] rounded-xl flex items-center justify-center mr-4">
                    <i className="fas fa-brain text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-black">AI Detection</h3>
                </div>
                <p className="text-gray-800 font-medium">
                  Advanced neural networks analyze video patterns, compression artifacts, 
                  and temporal inconsistencies to identify deepfakes with 99.7% accuracy.
                </p>
              </CardContent>
            </Card>

            <Card 
              ref={cardRefs[1] as any}
              className="scroll-animate glass-morphism p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-purple-100"
            >
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--cyber))] to-[hsl(var(--neural))] rounded-xl flex items-center justify-center mr-4">
                    <i className="fas fa-link text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-black">Blockchain Security</h3>
                </div>
                <p className="text-gray-800 font-medium">
                  Every verification result is immutably stored on blockchain, 
                  creating an unalterable record of video authenticity.
                </p>
              </CardContent>
            </Card>

            <Card 
              ref={cardRefs[2] as any}
              className="scroll-animate glass-morphism p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-purple-100"
            >
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--neural))] to-[hsl(var(--electric))] rounded-xl flex items-center justify-center mr-4">
                    <i className="fas fa-comments text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-black">NLP Analysis</h3>
                </div>
                <p className="text-gray-800 font-medium">
                  Natural language processing examines audio-visual synchronization 
                  and contextual coherence to detect manipulated content.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[hsl(var(--electric))] to-[hsl(var(--cyber))] rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-shield-alt text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">99.7% Accuracy</h3>
                <p className="text-gray-800 font-medium">
                  Our AI-powered verification system achieves industry-leading accuracy in detecting manipulated video content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}