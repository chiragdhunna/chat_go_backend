const allowedOrigins = process.env.CLIENT_URL.split(",");

const corsOption = {
  origin: allowedOrigins,
  credentials: true,
};

const CHATGO_TOKEN = "chatgo-token";

export { corsOption, CHATGO_TOKEN };
