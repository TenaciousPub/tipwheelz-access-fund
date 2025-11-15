import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this a donation?",
    answer: "It's a creator tip, not a donation. Tips are not tax-deductible, but they directly support content creation, accessibility features, and real-world advocacy.",
  },
  {
    question: "Where does my tip go?",
    answer: "Every dollar goes toward filming, editing, professional captions, transit costs, and equipment upgrades. Bigger tips mean more frequent videos and higher production quality.",
  },
  {
    question: "Can I cancel monthly support?",
    answer: "Yes, anytime. You'll receive a receipt link via email where you can manage or cancel your subscription with one click. No hassle, no hard feelings.",
  },
  {
    question: "Can I tip via PayPal?",
    answer: "Absolutely. Both Stripe and PayPal are available for one-time and monthly tips. Same perks, your choice of platform.",
  },
  {
    question: "What about refunds?",
    answer: "Digital perks are delivered instantly, so tips are non-refundable. However, if there's a billing error on our end, we'll happily fix it—just email hey@mrwheelz.com.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl text-center mb-8 text-foreground">
          FAQ
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
