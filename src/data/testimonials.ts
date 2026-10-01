export type Testimonial = {
  name: string;
  occasion: string;
  quote: string;
  /** Longer version for the reviews page. */
  full?: string;
  image: string;
  gallery?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Caroline Buskes",
    occasion: "Wedding",
    quote: "She made our wedding day so much more special and less stressful. She is everything and more you would want from a wedding planner!",
    full: "Meg was amazing! She went above and beyond what she needed to do. She made our wedding day so much more special and less stressful. She is everything and more you would want from a wedding planner!",
    image: "stacey-steve-14",
  },
  {
    name: "Emil Lime",
    occasion: "Wedding",
    quote: "If there was a higher rating than 5 stars we would give it. Megan was the calm through the storm.",
    full: "If you're looking for a wedding planner who gets stuff done on time and makes life seem like a breeze, we would HIGHLY recommend Megara Events & Weddings. If there was a higher rating than 5 stars we would give it — they gave us the stars and beyond on our special day. Megan was the calm through the storm. She saved us from a seating nightmare to talking us through the order of proceedings. I've never met anyone so calm and diplomatic while taking both my and my partner's needs and wants into consideration. I really can't thank Megan enough for the special day she created for us.",
    image: "aidan-bianca-13",
  },
  {
    name: "Nick Rothwell",
    occasion: "Wedding",
    quote: "You took so many loose ideas and in such a short space of time created something so incredible, intimate and beautiful.",
    full: "Thank you Megara for such an amazing job with our wedding! It was really something fabulous. You took so many loose ideas and in such a short space of time created something so incredible, intimate and beautiful — a day we will never forget. Everything was so smooth and effortless on the day and you had such wonderful ideas and foresight. I don't suppose I'll be getting married again any time soon, but if I do, I would definitely choose you guys again!",
    image: "julia-sander-11",
  },
  {
    name: "Erin Besnard",
    occasion: "21st birthday",
    quote: "Words just aren't enough! Thank you for bringing my dream to life and creating the most incredible 21st for me. I was blown away!",
    full: "Words just aren't enough! Thank you for bringing my dream to life and creating the most incredible 21st for me. I was blown away! Meg and the Megara team did the most amazing job, nothing was too much to ask for and they really went above and beyond. From the very start right up until when I walked into the venue on the day, you made me feel so special and included every step of the way. Thank you! Thank you! Thank you!",
    image: "erin-21st-12",
    gallery: "erin-21st",
  },
  {
    name: "Jessica Giles",
    occasion: "Husband's 40th",
    quote: "An initial meeting to run through requirements and they took care of the rest, allowing us both to enjoy the night.",
    full: "Megara effortlessly organised a simple and stylish party for my husband's 40th birthday. An initial meeting to run through requirements and they took care of the rest, allowing us both to enjoy the night. Delicious food, well-trained bar staff and even most of the clean-up was taken care of. I would highly recommend contacting Megara for your next event. I look forward to planning my 40th with them later on this year.",
    image: "kg-45th-11",
  },
  {
    name: "Melvin",
    occasion: "Woolworths brand activation",
    quote: "On behalf of my team, a huge thank you for a very exciting and successful campaign.",
    full: "On behalf of my team, a huge thank you for a very exciting and successful campaign. It certainly added some festivities to the trading period that lies ahead. We look forward to working with the Megara team again in the near future.",
    image: "woolworths-03",
    gallery: "woolworths",
  },
];
