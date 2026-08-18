const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_API is not configured");
}

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  revalidate?: number;
  tags?: string[];
};

export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { method = "GET", body, revalidate = 60, tags = [] } = options;

  const url = `${API_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const res = await fetch(url, {
    method,

    headers: {
      "Content-Type": "application/json",
    },

    ...(body
      ? {
          body: JSON.stringify(body),
        }
      : {}),

    ...(method === "GET"
      ? {
          next: {
            revalidate,
            ...(tags.length ? { tags } : {}),
          },
        }
      : {
          cache: "no-store",
        }),
  });

  if (!res.ok) {
    let message = `API Error: ${res.status}`;

    try {
      const error = await res.json();

      if (error?.message) {
        message = error.message;
      }
    } catch {
      // Ignore invalid JSON error response
    }

    throw new Error(message);
  }

  return res.json();
}
