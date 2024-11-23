import cloudinary from '@/util/cloudinary.config';
import prisma from '@/util/db.config';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const {
      storeName,
      storeDescription,
      businessAddress,
      socialMediaLinks,
      sellerId,
      logo,
    } = Object.fromEntries(formData);

    const seller = await prisma.seller.findUnique({
      where: { id: parseInt(sellerId) },
    });

    if (!seller) {
      return NextResponse.json({ success: false, message: "Seller not found" }, { status: 404 });
    }

    let storeLogo = seller.storeLogo;

    if (logo) {
      
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "storeLogos" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      storeLogo = uploadResult.secure_url;
    }

    const updatedSeller = await prisma.seller.update({
      where: { id: seller.id },
      data: {
        storeName: storeName || seller.storeName,
        storeDescription: storeDescription || seller.storeDescription,
        businessAddress: businessAddress || seller.businessAddress,
        socialMediaLinks: socialMediaLinks
          ? JSON.parse(socialMediaLinks)
          : seller.socialMediaLinks,
        storeLogo: storeLogo,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Seller information updated successfully",
      seller: updatedSeller,
    }, { status: 200 });

  } catch (error) {
    console.error('Error in update seller route:', error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}