interface GenerateUrlOptions {
  url: string;
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

export default function generateUrl({ url, params, query }: GenerateUrlOptions): string {
  let constructedUrl = url;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      constructedUrl = constructedUrl.replace(`:${key}`, String(value));
    });
  }

  if (query) {
    const queryString = new URLSearchParams(
      Object.entries(query).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        },
        {} as Record<string, string>,
      ),
    ).toString();

    if (queryString) {
      constructedUrl += `?${queryString}`;
    }
  }

  return constructedUrl;
}
