import React, { useState, memo } from "react";

const Newsletter: React.FC = memo(() => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call - replace with actual email service integration
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-12 md:py-16 flex items-center justify-center bg-gradient-to-r from-[#614ea5] to-[#493b7b]" id="Newsletter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="text-white text-left max-w-lg">
                      <h2 className="font-inter text-sm font-normal mb-2 lowercase italic">Newsletter</h2>
                      <h1 className="font-inter text-2xl sm:text-3xl font-bold mb-4 md:mb-6 leading-tight">Stay Connected</h1>
                      <p className="font-inter text-sm leading-relaxed opacity-90">
                        Subscribe to our newsletter for exclusive updates on upcoming events, data analytics insights, workshops, and career opportunities in the tech industry.
                      </p>
                    </div>

        <div className="flex justify-center lg:justify-end">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="bg-white/20 backdrop-blur-lg rounded-full p-2 shadow-lg flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-transparent text-white placeholder-white/70 px-4 py-3 rounded-full border-none outline-none font-inter text-sm"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-white/20 backdrop-blur-md text-white font-inter font-semibold px-6 py-3 rounded-full hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                disabled={isLoading || isSubscribed}
              >
                {isLoading ? "Subscribing..." : isSubscribed ? "Subscribed!" : "Submit"}
              </button>
            </div>
            {isSubscribed && (
              <p className="font-inter text-white text-sm mt-3 text-center opacity-90">
                Thank you for subscribing! Check your email for confirmation.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
});

Newsletter.displayName = 'Newsletter';

export default Newsletter;
