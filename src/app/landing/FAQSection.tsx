"use client";

import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is DevFinder?",
    answer: "DevFinder is a lightweight platform specifically engineered for discovering and joining developer collaboration rooms. It facilitates peer-to-peer technical knowledge transfer through a streamlined interface."
  },
  {
    question: "Is there an integrated IDE?",
    answer: "No. DevFinder is a dedicated collaboration space providing high-quality video, audio, and screen sharing capabilities. We believe developers work best in their own local environments, so we focus on the meeting layer rather than providing a browser-based IDE."
  },
  {
    question: "How do I join a room?",
    answer: "Browse the active grid on the homepage. You can filter by technology tags (e.g., React, Go, Docker) or use keywords. Once you find a room that matches your interest, click \"Join\" to enter the session instantly."
  },
  {
    question: "Can I manage my own rooms?",
    answer: "Yes. Authorized users have full control over their sessions. You can create new rooms, edit existing room metadata (like tags and descriptions), and delete rooms once the session is complete."
  },
  {
    question: "Does it integrate with GitHub?",
    answer: "Yes. When creating a room, you can link a specific GitHub repository. This helps other developers understand the context of the session and review the codebase before joining."
  }
];

export default function FAQSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-surface-container-low border-t border-outline-variant/10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          
          <h2 className="font-headline text-4xl font-bold tracking-tighter"><span className="font-label  uppercase  text-primary block mb-2">FAQ</span></h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-surface-container-high ghost-border p-6 cursor-pointer">
              <summary className="flex items-center justify-between list-none">
                <h3 className="font-headline text-lg font-bold text-on-surface">{faq.question}</h3>
                <ChevronDown className="text-primary group-open:rotate-180 transition-transform w-5 h-5" />
              </summary>
              <div className="mt-4 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/20 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
