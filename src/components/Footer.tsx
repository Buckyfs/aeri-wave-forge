
import { ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-primary font-heading mb-4">
              <span className="text-xl font-bold tracking-tighter">AERI</span>
              <span className="block text-xs tracking-wide text-gray-600 mt-1">APPLIED ENGINEERING RESEARCH INSTITUTE</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Empowering the next generation of innovators to solve environmental challenges through applied engineering research.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-sm text-gray-600 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#projects" className="text-sm text-gray-600 hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#community" className="text-sm text-gray-600 hover:text-primary transition-colors">Community</a></li>
              <li><a href="#impact" className="text-sm text-gray-600 hover:text-primary transition-colors">Impact</a></li>
              <li><a href="#collaborate" className="text-sm text-gray-600 hover:text-primary transition-colors">Collaborate</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-heading text-sm font-semibold mb-4 text-primary">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center">
                Research Papers <ArrowRight size={12} className="ml-1" />
              </a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center">
                Newsletters <ArrowRight size={12} className="ml-1" />
              </a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center">
                Events <ArrowRight size={12} className="ml-1" />
              </a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center">
                Media Kit <ArrowRight size={12} className="ml-1" />
              </a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold mb-4 text-primary">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">123 Innovation Way</li>
              <li className="text-sm text-gray-600">Research Park, CA 94103</li>
              <li className="text-sm text-gray-600">contact@aeri.org</li>
              <li className="text-sm text-gray-600">(555) 123-4567</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">&copy; {currentYear} AERI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
