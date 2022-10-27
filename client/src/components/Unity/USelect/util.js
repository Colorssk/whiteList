export const distinctByFilter = (keyMapper) => {
    const keySet = new Set();
    return (i) => {
      const key = keyMapper(i);
      const hasKey = keySet.has(key);
      keySet.add(key);
      return !hasKey;
    };
};