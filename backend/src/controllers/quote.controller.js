
const quotes = [
  "You are capable of amazing things.",
  "Every day is a new beginning.",
  "Believe in yourself and all that you are.",
  "Happiness is a choice, choose it today.",
  "Small steps every day lead to big results.",
  "You are stronger than you think.",
  "Positive thoughts create positive life.",
  "Keep going, you are doing great!",
  "Progress, not perfection, is what matters",
  "You deserve kindness, especially from yourself",
  "Every small step forward is meaningful",
  "You are enough, just as you are",
  "Your mental health matters and so do you",
  "This moment will pass, and you will be okay",
  "You are worthy of love and happiness",
  "Today is full of possibilities",
  "Your feelings are valid and important",
  "You have the strength to overcome challenges",
  
];

export const getRandomQuote = (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  res.json({ quote });
};
