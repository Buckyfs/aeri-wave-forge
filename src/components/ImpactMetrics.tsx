
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface MetricProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  suffix?: string;
  delay?: number;
}

const Metric = ({ value, label, icon, suffix = '', delay = 0 }: MetricProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          let start = 0;
          const duration = 2000;
          const increment = Math.ceil(value / (duration / 16));

          const timer = setInterval(() => {
            start += increment;
            if (start > value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);

          return () => clearInterval(timer);
        }, delay);

        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <Card className="relative overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center">
              <span ref={counterRef} className="font-heading text-4xl font-bold text-primary">{count}</span>
              <span className="text-primary text-2xl">{suffix}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{label}</p>
          </div>
          {icon && (
            <div className="text-secondary opacity-80">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Achievement = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
      <p className="text-sm text-gray-700">{title}</p>
    </div>
  );
};

const ImpactMetrics = () => {
  const metrics = [
    { value: 150, label: "Student Researchers", suffix: "+", delay: 0 },
    { value: 25, label: "Active Projects", delay: 200 },
    { value: 15, label: "Industry Partnerships", delay: 400 },
    { value: 500, label: "Community Members", suffix: "+", delay: 600 },
    { value: 75, label: "Research Funding", suffix: "K", delay: 800 }
  ];

  const achievements = [
    "Developed patented carbon capture membrane technology",
    "Implemented smart grid solutions in 3 cities",
    "Published 5 peer-reviewed papers",
    "Organized 12 community workshops"
  ];

  return (
    <section id="impact" className="py-20 bg-lightbg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Creating Lasting Change</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our work is measured not just in research papers and patents, but in tangible environmental impact and the growth of our innovation community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {metrics.map((metric, index) => (
            <Metric key={index} {...metric} />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10">
              <h3 className="font-heading text-xl font-semibold mb-6 text-primary">Recent Achievements</h3>
              {achievements.map((achievement, index) => (
                <Achievement key={index} title={achievement} />
              ))}
            </div>
            <div className="bg-primary relative overflow-hidden">
              <div className="absolute inset-0 bg-wave-pattern opacity-10"></div>
              <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-10 text-white">
                <h3 className="font-heading text-xl font-semibold mb-4">Our Vision for 2025</h3>
                <p className="mb-6 opacity-90">Expanding our impact through increased collaboration between academia, industry, and young innovators.</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-bold text-2xl text-secondary">300+</div>
                    <p className="opacity-80">Student Researchers</p>
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-secondary">50+</div>
                    <p className="opacity-80">Research Projects</p>
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-secondary">30+</div>
                    <p className="opacity-80">Industry Partners</p>
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-secondary">$250K</div>
                    <p className="opacity-80">Research Funding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
