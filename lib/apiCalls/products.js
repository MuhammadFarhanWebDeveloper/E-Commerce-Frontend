export const getProducts = async (
  page = 1,
  limit = 8,
  category = "",
  search = "",
  sortBy = "createdAt",
  order = "desc",
  seller = ""
) => {
  try {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (category) queryParams.append("category", category);
    if (search) queryParams.append("search", search);
    if (sortBy) queryParams.append("sortBy", sortBy);
    if (order) queryParams.append("order", order);
    if (seller) queryParams.append("seller", seller);
    // Use the query parameters to make the API request
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/product/get-many-poducts?${queryParams.toString()}`,
      { cache:"no-store" }
    );

    if (!response.ok) {
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error || "something went wrong");
    throw new Error("Failed to fetch products");
  }
};

export const getOneProduct = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/get-one-poduct/${id}`,
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

export const createProduct = async (product)=> {
  const { name, description, price, categoryName, images } = product;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("categoryName", categoryName);

  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/add-product`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export const editProduct = async (product, id)=> {
  const { name, description, price, categoryName, images } = product;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("categoryName", categoryName);

  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/edit-product/${id}`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}


export const deleteProduct = async (id)=> {

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/delete-product/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}