export const storeMetaData = async (
  metadata: string | undefined,
): Promise<boolean | undefined> => {
  console.log("⚙️ Process... store task in storage", metadata);

  try {
    console.log("✅ Task processed");
  } catch (e) {
    throw new Error("Failed to process task");
  }

  return true;
};
