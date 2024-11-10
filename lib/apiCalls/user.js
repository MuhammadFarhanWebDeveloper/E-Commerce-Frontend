export const getUser = async (authtoken) => {
  if (!authtoken) {
    return { success: false, message: "Token not found or invalid" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/getuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: authtoken,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const becomeSeller = async ({
  storeName,
  storeDescription,
  businessAddress,
  logo,
}) => {
  const formData = new FormData();

  formData.append("storeName", storeName);

  if (storeDescription) {
    formData.append("storeDescription", storeDescription);
  }

  if (businessAddress) {
    formData.append("businessAddress", businessAddress);
  }

  if (logo) {
    formData.append("logo", logo); // Add the store logo to the formData
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/become-seller`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.message || "Error occurred" };
    }

    return { success: true, message: result.message, user: result.user };
  } catch (error) {
    console.log(error.message || "Something went wrong");
    return { success: false, message: "Something went wrong" };
  }
};
