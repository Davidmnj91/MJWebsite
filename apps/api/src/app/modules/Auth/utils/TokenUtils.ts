export const bearerToToken = (bearer: string): string => bearer.replace('Bearer', '').trim();
