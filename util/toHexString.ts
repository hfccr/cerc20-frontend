export const toHexString = (bytes: number[]): string =>
  bytes.reduce(
    (str: string, byte: number) => str + byte.toString(16).padStart(2, "0"),
    ""
  );
