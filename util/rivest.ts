import { Chain } from "@rainbow-me/rainbowkit";

export const rivest = {
  id: 21097,
  name: "Inco Rivest Testnet",
  iconUrl:
    "https://docs.inco.org/~gitbook/image?url=https%3A%2F%2F2921198789-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fb3FC48Xiy8fSq6XARds8%252Ficon%252FQlrBRTtastb5mRQNLhpk%252Fsymbol_brand.png%3Falt%3Dmedia%26token%3D79eebbe3-7881-4b26-bafc-13325a6c080d&width=32&dpr=1&quality=100&sign=428413e3&sv=1",
  iconBackground: "#fff",
  nativeCurrency: { name: "Inco", symbol: "tINCO", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://validator.rivest.inco.org/"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://explorer.rivest.inco.org/" },
  },
} as const satisfies Chain;
