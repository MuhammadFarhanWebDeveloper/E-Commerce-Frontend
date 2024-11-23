import { verifyToken } from "@/lib/server-actions/auth";
import prisma from "@/util/db.config";
export const getUser = async (authtoken) => {
  try {
    const { id } = await verifyToken(authtoken);

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        bio: true,
        isSeller: true,
        profilePicture: true,
        phoneNumber: true,
        address: true,
        seller: {
          select: {
            id: true,
            storeName: true,
            storeDescription: true,
            storeLogo: true,
            businessAddress: true,
          },
        },
      },
    });

    if (!user) return null;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
