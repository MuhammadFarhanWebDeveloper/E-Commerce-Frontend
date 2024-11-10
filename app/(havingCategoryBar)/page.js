import CategoryList from "@/components/Categories/CategoryList";
import ProductsContainer from "@/components/Products/ProductsContainer";
import SimpleCarousel from "@/components/carousel/SimpleCarousel";
import { getAllCategories } from "@/lib/apiCalls/category";
import { getProducts } from "@/lib/apiCalls/products";
import Image from "next/image";

export const dynamic = "force-dynamic";
export default async function Home() {
  const { products } = await getProducts();

  return (
    <div>
      <SimpleCarousel>
        <div className="h-[430px]">
          <Image
            src={"/slide-1.webp"}
            width={1366}
            height={400}
            alt="A Product Image"
          />
        </div>
        <div className="h-[430px]">
          <Image
            src={"/slide-2.webp"}
            width={1366}
            height={400}
            alt="A Product Image"
          />
        </div>
        <div className="h-[430px]">
          <Image
            src={"/slide-3.webp"}
            width={1366}
            height={400}
            alt="A Product Image"
          />
        </div>
      </SimpleCarousel>

      <ProductsContainer products={products} />
    </div>
  );
}
