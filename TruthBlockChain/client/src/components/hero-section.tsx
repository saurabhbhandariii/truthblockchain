import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function HeroSection() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analysisId, setAnalysisId] = useState<number | null>(null);
  const titleRef = useScrollAnimation();
  const contentRef = useScrollAnimation();
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('video', file);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await apiRequest('POST', '/api/video/upload', formData);
      clearInterval(interval);
      setUploadProgress(100);
      
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisId(data.analysisId);
      toast({
        title: "Upload Successful!",
        description: "Video analysis has started. Results will appear shortly.",
      });
    },
    onError: () => {
      setUploadProgress(0);
      toast({
        title: "Upload Failed",
        description: "Please try again with a valid video file.",
        variant: "destructive",
      });
    }
  });

  const { data: analysisData } = useQuery({
    queryKey: ['/api/video/analysis', analysisId],
    enabled: !!analysisId,
    refetchInterval: 1000,
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadProgress(0);
      setAnalysisId(null);
      uploadMutation.mutate(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Soft decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[hsl(var(--electric))] to-[hsl(var(--cyber))] rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[hsl(var(--neural))] to-[hsl(var(--electric))] rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-[hsl(var(--cyber))] to-[hsl(var(--neural))] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 
                ref={titleRef as any}
                className="scroll-animate text-5xl md:text-7xl font-bold mb-6 text-black"
              >
                DETECTIFY
              </h1>
              <p 
                ref={contentRef as any}
                className="scroll-animate text-xl md:text-2xl mb-8 text-gray-800 leading-relaxed font-medium"
              >
                Advanced AI-powered video verification platform using{' '}
                <span className="text-[hsl(var(--electric))] font-bold bg-purple-50 px-2 py-1 rounded-lg">blockchain</span>,{' '}
                <span className="text-[hsl(var(--cyber))] font-bold bg-purple-50 px-2 py-1 rounded-lg">NLP</span>, and{' '}
                <span className="text-[hsl(var(--neural))] font-bold bg-purple-50 px-2 py-1 rounded-lg">machine learning</span>{' '}
                to detect deepfakes and verify video authenticity.
              </p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button 
                  onClick={triggerFileUpload}
                  className="px-8 py-4 bg-[hsl(var(--electric))] text-white font-semibold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                  disabled={uploadMutation.isPending}
                >
                  <i className="fas fa-upload mr-2"></i>
                  {uploadMutation.isPending ? 'Uploading...' : 'Upload Video'}
                </Button>
                <Button 
                  variant="outline"
                  className="px-8 py-4 border-2 border-[hsl(var(--electric))] text-[hsl(var(--electric))] font-semibold rounded-2xl hover:bg-[hsl(var(--electric))] hover:text-white transition-all duration-300"
                  onClick={() => scrollToSection('about')}
                >
                  <i className="fas fa-info-circle mr-2"></i>
                  Learn More
                </Button>
              </motion.div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="video/*"
                className="hidden"
              />
            </motion.div>

            {/* Right Column - Upload/Analysis Interface */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="glass-morphism p-8 rounded-3xl border-purple-100">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--electric))]">
                    Video Truth Detection
                  </h3>
                  
                  {!analysisId && !uploadMutation.isPending && (
                    <div 
                      className="border-2 border-dashed border-[hsl(var(--electric))] rounded-2xl p-12 text-center cursor-pointer hover:border-[hsl(var(--neural))] transition-colors duration-300 bg-gradient-to-br from-purple-50 to-indigo-50"
                      onClick={triggerFileUpload}
                    >
                      <i className="fas fa-cloud-upload-alt text-4xl text-[hsl(var(--electric))] mb-4"></i>
                      <p className="text-lg text-gray-700">
                        Drop your video here or click to upload
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Supports MP4, AVI, MOV files up to 100MB
                      </p>
                    </div>
                  )}

                  {uploadMutation.isPending && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--cyber))] to-[hsl(var(--electric))] rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                        <i className="fas fa-upload text-2xl text-white"></i>
                      </div>
                      <p className="text-lg text-slate-300 mb-4">Uploading video...</p>
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-sm text-slate-400 mt-2">{uploadProgress}% complete</p>
                    </div>
                  )}

                  {(analysisData as any)?.analysis && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-[hsl(var(--electric))] mb-2">
                          Analysis Results
                        </h4>
                        <p className="text-sm text-slate-400">
                          File: {(analysisData as any).analysis.fileName}
                        </p>
                      </div>

                      {(analysisData as any).analysis.analysisStatus === 'processing' && (
                        <div className="text-center py-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--neural))] to-[hsl(var(--cyber))] rounded-full mx-auto mb-3 flex items-center justify-center animate-spin">
                            <i className="fas fa-cog text-xl text-white"></i>
                          </div>
                          <p className="text-slate-300">AI analysis in progress...</p>
                        </div>
                      )}

                      {(analysisData as any).analysis.analysisStatus === 'completed' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 glass-morphism rounded-xl">
                              <div className={`text-3xl font-bold mb-2 ${
                                (analysisData as any).analysis.truthScore >= 80 ? 'text-[hsl(var(--electric))]' : 
                                (analysisData as any).analysis.truthScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {(analysisData as any).analysis.truthScore}%
                              </div>
                              <p className="text-sm text-slate-400">Truth Score</p>
                            </div>
                            <div className="text-center p-4 glass-morphism rounded-xl">
                              <div className="text-3xl font-bold mb-2 text-[hsl(var(--cyber))]">
                                {(analysisData as any).analysis.aiConfidence}%
                              </div>
                              <p className="text-sm text-slate-400">AI Confidence</p>
                            </div>
                          </div>

                          <div className="p-4 glass-morphism rounded-xl">
                            <h5 className="font-bold text-[hsl(var(--neural))] mb-2">
                              Verification Sources:
                            </h5>
                            <ul className="space-y-1 text-sm text-slate-300">
                              {(analysisData as any).analysis.analysisResults?.verificationSources?.map((source: string, idx: number) => (
                                <li key={idx} className="flex items-center">
                                  <i className="fas fa-check text-[hsl(var(--electric))] mr-2 text-xs"></i>
                                  {source}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {(analysisData as any).analysis.deepfakeDetected && (
                            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                              <h5 className="font-bold text-red-400 mb-2">
                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                Potential Manipulation Detected
                              </h5>
                              <ul className="text-sm text-red-300">
                                {(analysisData as any).analysis.manipulationSources?.map((source: string, idx: number) => (
                                  <li key={idx}>• {source}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="text-center">
                            <p className="text-xs text-slate-400">
                              Blockchain Hash: {(analysisData as any).analysis.blockchainHash?.slice(0, 16)}...
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
