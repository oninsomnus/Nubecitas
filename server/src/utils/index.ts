export const delay = (sleepTime: number) => new Promise((resolve) => setTimeout(() => {resolve(true)}, sleepTime));
export const waitForWebSocketClient = async (client: any) => {
    await new Promise(async resolve => {
        while (client.readyState != client.OPEN) await delay(1000);
        resolve(true);
    })
};
