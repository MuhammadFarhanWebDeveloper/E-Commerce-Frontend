export const getUser = async (authtoken) => {
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
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error || "something went wrong");
  }
};

export const updateUser = async ({
  firstName,
  lastName,
  bio,
  address,
  phoneNumber,
  profilePicture,
}) => {
  const formData = new FormData();

  const fields = {
    firstName,
    lastName,
    bio,
    address,
    phoneNumber,
  };

  Object.entries(fields).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  if (profilePicture) {
    formData.append("profilePicture", profilePicture);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/update-user`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    return { success: false, message: "Something went wrong" };
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
