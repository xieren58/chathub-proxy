import useReflare from "reflare";

export interface Env {}

async function handleRequest(request: Request): Promise<Response> {
  const reflare = await useReflare();

  reflare.push({
    path: "/v1/chat/completions",
    upstream: {
      domain: "api.openai.com",
      protocol: "https",
    },
    cors: { origin: true },
  });

  reflare.push({
    path: "/turing/conversation/create",
    upstream: {
      domain: "www.bing.com",
      protocol: "https",
    },
    cors: { origin: true },
  });

  return reflare.handle(request);
}

export default {
  async fetch(request: Request): Promise<Response> {
    return handleRequest(request);
  },
};
