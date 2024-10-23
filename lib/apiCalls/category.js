export const getAllCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/getall`,
      { cache: "no-store" }
    );

    if (!response.ok) {
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};
