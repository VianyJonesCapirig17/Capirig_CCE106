export type Quote = {
  quote: string;
  author: string;
};

const QUOTE_URL = 'https://dummyjson.com/quotes/random';

/** Fetches one random quote from the public DummyJSON quotes API. */
export async function fetchRandomQuote(): Promise<Quote | null> {
  const response = await fetch(QUOTE_URL);

  if (!response.ok) {
    throw new Error('Quote service unavailable');
  }

  const data: Quote = await response.json();
  return data.quote && data.author ? data : null;
}
