export const repository = "https://github.com/mrnicholasbcarter-code/verdict-core";

export const revision = "72cb3642269684f122e590c390166cd6cebcf68e";

export const blob = (path: string) => `${repository}/blob/${revision}/${path}`;
export const tree = (path: string) => `${repository}/tree/${revision}/${path}`;
