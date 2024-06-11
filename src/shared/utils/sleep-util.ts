// eslint-disable-next-line @typescript-eslint/return-await
export const sleep = async (ms = 1000) => new Promise(resolve => { setTimeout(resolve, ms); });
