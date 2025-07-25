import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  ElementRef,
  ComponentPropsWithoutRef
} from "react";

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { PartnerForm } from '@/components/forms/PartnerForm';

const BecomePartner = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-[30vh] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-8">
              Become a Partner
            </h1>
            <p className="mt-8 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
              Join us in shaping the future of digital creation and innovation
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white shadow-sm rounded-lg p-8">
              <PartnerForm />
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BecomePartner; 
