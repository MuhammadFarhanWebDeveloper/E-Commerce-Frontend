export const getOneProduct = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/get-one-product/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch product");
  }
};
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
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/product/get-many-poducts?${queryParams.toString()}`,
      { cache: "no-store" }
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

/*
export const getManyProducts = async(
  page = 1,
  limit = 8,
  category = "",
  search = "",
  sortBy = "createdAt",
  order = "desc",
  seller = ""
) => {
  try {

    const offset = (page - 1) * limit;

    const filters = {};

    if (category) {
      filters.category = { name: category };
    }

    if (search) {
      const searchTerms = search.split(" ");
      filters.OR = searchTerms.map((term) => ({
        OR: [
          { name: { contains: term, mode: "insensitive" } },
          { description: { contains: term, mode: "insensitive" } },
        ],
      }));
    }

    if (seller) {
      const sellerUser = await prisma.seller.findFirst({
        where: { id: seller },
      });
      if (!sellerUser) {
        return res.status(404).json({
          success: false,
          message: "Can't find seller having this id",
        });
      }
      filters.sellerId = parseInt(seller);
    }

    const products = await prisma.product.findMany({
      where: filters,
      include: {
        seller: true,
        category: true,
        images: true,
      },
      orderBy: {
        [sortBy]: order,
      },
      skip: offset,
      take: limit,
    });

    const totalCount = await prisma.product.count({
      where: filters,
    });

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
 */

export const createProduct = async (product) => {
  "use client";
  const { name, description, price, categoryName, images, stock } = product;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("stock", stock);
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
};

export const editProduct = async (id, product) => {
  "use client";

  const { name, description, price, categoryName, images, oldImages } = product;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("categoryName", categoryName);

  images.forEach((image) => {
    formData.append("images", image);
  });
  formData.append("oldImages", JSON.stringify(oldImages));
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/edit-product/${id}`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
        cache: "no-store",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const deleteProduct = async (id) => {
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
};
