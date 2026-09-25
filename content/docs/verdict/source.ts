export const repository = "https://github.com/mrnicholasbcarter-code/verdict-core";

export const revision = "ff18aa5f2be0ea9b8ab6e32b56e713801b2d8b83";

export const blob = (path: string) => `${repository}/blob/${revision}/${path}`;
export const tree = (path: string) => `${repository}/tree/${revision}/${path}`;
