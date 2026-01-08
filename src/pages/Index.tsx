import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Palette, 
  Eye, 
  Share2,
  Check,
  ArrowRight,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Live Preview',
    description: 'See changes instantly as you type. No more guessing how your resume will look.',
  },
  {
    icon: Palette,
    title: 'Beautiful Templates',
    description: 'Choose from professionally designed templates that stand out to recruiters.',
  },
  {
    icon: Download,
    title: 'PDF Export',
    description: 'Download pixel-perfect PDFs optimized for ATS systems and printing.',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your resume via a public link or export to multiple formats.',
  },
  {
    icon: Sparkles,
    title: 'AI Suggestions',
    description: 'Get smart recommendations to improve your resume content and impact.',
  },
  {
    icon: FileText,
    title: 'Multiple Versions',
    description: 'Create and manage different resume versions for different opportunities.',
  },
];

const stats = [
  { value: '50K+', label: 'Resumes Created' },
  { value: '92%', label: 'Interview Rate' },
  { value: '4.9/5', label: 'User Rating' },
];

const allFeatures = [
  'Unlimited resumes',
  'All templates',
  'PDF export without watermark',
  'Custom colors & fonts',
  'Priority support',
  'Resume analytics',
  'AI suggestions',
  'Public sharing links',
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">ResumeAI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Templates</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/builder">
              <Button size="sm">Get Started - Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 hero-gradient opacity-[0.03]" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>100% Bepul Resume Builder</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
              Build resumes that
              <span className="text-gradient"> get you hired</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up delay-100">
              Create professional, ATS-friendly resumes in minutes. Real-time preview, beautiful templates, and smart suggestions to help you land your dream job.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up delay-200">
              <Link to="/builder">
                <Button variant="hero" size="xl" className="group">
                  Create Your Resume - Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="#templates">
                <Button variant="outline" size="xl">
                  View Templates
                </Button>
              </a>
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-center gap-8 md:gap-16 animate-slide-up delay-300">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Preview */}
          <div className="mt-20 max-w-5xl mx-auto animate-slide-up delay-400">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-transparent rounded-2xl blur-2xl opacity-50" />
              
              <div className="relative bg-card rounded-2xl shadow-elevated border border-border/50 overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 bg-background rounded-md text-xs text-muted-foreground">
                      resumeai.app/builder
                    </div>
                  </div>
                </div>
                
                {/* Preview content */}
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Editor side */}
                  <div className="p-6 bg-muted/30 border-r border-border/50">
                    <div className="space-y-4">
                      <div className="h-8 w-32 bg-muted rounded-lg" />
                      <div className="space-y-2">
                        <div className="h-10 bg-background rounded-lg border border-border" />
                        <div className="h-10 bg-background rounded-lg border border-border" />
                        <div className="h-20 bg-background rounded-lg border border-border" />
                      </div>
                      <div className="h-8 w-40 bg-muted rounded-lg" />
                      <div className="space-y-2">
                        <div className="h-10 bg-background rounded-lg border border-border" />
                        <div className="h-10 bg-background rounded-lg border border-border" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview side */}
                  <div className="p-6 flex items-center justify-center bg-muted/10">
                    <div className="w-full max-w-[280px] bg-white rounded-lg shadow-card p-6 space-y-4">
                      <div className="space-y-1">
                        <div className="h-5 w-32 bg-primary/80 rounded" />
                        <div className="h-3 w-24 bg-accent/60 rounded" />
                      </div>
                      <div className="h-px bg-border" />
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-muted rounded" />
                        <div className="h-3 w-4/5 bg-muted rounded" />
                        <div className="h-3 w-3/4 bg-muted rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-20 bg-primary/60 rounded" />
                        <div className="h-3 w-full bg-muted rounded" />
                        <div className="h-3 w-5/6 bg-muted rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-12 border-y border-border/50 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Bank-level Security</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">ATS Optimized</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">5-Minute Setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              Everything you need to build the perfect resume
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed to help you create professional resumes that stand out.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-6 rounded-xl bg-card border border-border/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              Professional templates for every role
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose from our collection of ATS-friendly templates designed by HR experts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Modern', 'Classic', 'Minimal'].map((template, index) => (
              <div 
                key={template}
                className="group relative bg-card rounded-xl shadow-card border border-border/50 overflow-hidden hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[3/4] bg-gradient-to-b from-muted/50 to-muted p-4">
                  <div className="h-full bg-white rounded-lg shadow-sm p-4 space-y-3">
                    <div className="space-y-1">
                      <div className="h-4 w-20 bg-primary/70 rounded" />
                      <div className="h-2 w-16 bg-accent/50 rounded" />
                    </div>
                    <div className="h-px bg-border" />
                    <div className="space-y-1.5">
                      <div className="h-2 w-full bg-muted rounded" />
                      <div className="h-2 w-4/5 bg-muted rounded" />
                      <div className="h-2 w-3/4 bg-muted rounded" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-3 w-14 bg-primary/50 rounded" />
                      <div className="h-2 w-full bg-muted rounded" />
                      <div className="h-2 w-5/6 bg-muted rounded" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 text-center">
                  <h3 className="font-display font-semibold">{template}</h3>
                  <p className="text-sm text-muted-foreground">Perfect for {index === 0 ? 'tech roles' : index === 1 ? 'corporate' : 'startups'}</p>
                </div>
                
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link to="/builder">
                    <Button variant="heroOutline" size="lg">
                      Use Template
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-6">
              <Check className="w-4 h-4" />
              <span>100% Bepul - Hech qanday to'lov yo'q</span>
            </div>
            
            <h2 className="font-display text-4xl font-bold mb-4">
              Barcha funksiyalar bepul
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Hech qanday cheklov yo'q. Barcha shablonlar, PDF yuklab olish va boshqa barcha funksiyalardan foydalaning.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-12">
              {allFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-left p-3 rounded-lg bg-card border border-border/50">
                  <Check className="w-5 h-5 text-success shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <Link to="/builder">
              <Button variant="hero" size="xl" className="group">
                Start Building - It's Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to build your perfect resume?
          </h2>
          <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10">
            Join thousands of professionals who landed their dream jobs with ResumeAI.
          </p>
          <Link to="/builder">
            <Button variant="heroOutline" size="xl" className="group bg-white/10 hover:bg-white/20">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">ResumeAI</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 ResumeAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
