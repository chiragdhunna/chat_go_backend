const corsOption = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.CLIENT_URL,
  ],
  credentials: true,
};

const CHATGO_TOKEN = "chatgo-token";

export { corsOption, CHATGO_TOKEN };
