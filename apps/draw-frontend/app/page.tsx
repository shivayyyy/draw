"use client"

import React, { useState } from 'react';
import { 
  Pen, 
  Users, 
  Download, 
  Zap, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Menu, 
  X,
  Palette,
  Share2,
  Clock,
  Shield
} from 'lucide-react';
import Button from "@repo/ui/button"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Pen className="w-8 h-8 text-purple-400" />,
      title: "Hand-drawn Style",
      description: "Create beautiful diagrams with a natural, sketchy feel that makes your ideas stand out."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with your team. See changes instantly as others draw and edit."
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-400" />,
      title: "Rich Drawing Tools",
      description: "Access a complete set of drawing tools including shapes, arrows, text, and freehand drawing."
    },
    {
      icon: <Download className="w-8 h-8 text-purple-400" />,
      title: "Export Anywhere",
      description: "Export your creations as PNG, SVG, or PDF. Perfect for presentations and documentation."
    },
    {
      icon: <Share2 className="w-8 h-8 text-purple-400" />,
      title: "Easy Sharing",
      description: "Share your diagrams with a simple link. Control permissions and access levels."
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-400" />,
      title: "Version History",
      description: "Never lose your work. Access previous versions and restore any changes you need."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "UX Designer at TechCorp",
      content: "This tool has revolutionized how our design team collaborates. The hand-drawn style makes our wireframes feel more approachable.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager at StartupXYZ",
      content: "Perfect for brainstorming sessions. The real-time collaboration keeps everyone engaged and creative.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Engineering Lead at DevCo",
      content: "We use this for system architecture diagrams. It's simple enough for quick sketches but powerful for detailed designs.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <Pen className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DrawFlow</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-300 hover:text-purple-400 transition-colors">Reviews</a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Login</a>
              <Button onClick={()=>{}} size="sm">
                Try Free
              </Button>
            </nav>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-gray-300 hover:text-purple-400 transition-colors">Features</a>
              <a href="#testimonials" className="block py-2 text-gray-300 hover:text-purple-400 transition-colors">Reviews</a>
              <a href="#" className="block py-2 text-gray-300 hover:text-purple-400 transition-colors">Login</a>
              <Button className="w-full mt-2" size="sm">
                Try Free
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Create Beautiful
              <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent"> Diagrams</span>
              <br />
              That Inspire
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into stunning hand-drawn style diagrams. Collaborate in real-time, 
              export anywhere, and bring your concepts to life with our intuitive drawing tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" iconPosition='left' icon={ArrowRight} className="flex px-4 justify-evenly  group">
                Start Drawing Free
              </Button>
             
            </div>
            <p className="text-sm text-gray-400 mt-4">No credit card required • Free forever plan available</p>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-cyan-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-500 rounded-full opacity-10 animate-bounce"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Everything You Need to Create
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make diagramming simple, collaborative, and beautiful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 hover:shadow-lg transition-all duration-300 group">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Loved by Teams Worldwide
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of professionals who trust DrawFlow for their diagramming needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Pen className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">DrawFlow</span>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                The most intuitive diagramming tool for teams who want to create beautiful, hand-drawn style diagrams.
              </p>
              <div className="flex space-x-4">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">SOC 2 Compliant</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 DrawFlow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

