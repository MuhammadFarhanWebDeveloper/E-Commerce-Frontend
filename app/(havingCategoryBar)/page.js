import CategoryList from "@/components/Categories/CategoryList";
import ProductsContainer from "@/components/Products/ProductsContainer";
import SimpleCarousel from "@/components/carousel/SimpleCarousel";
import { getAllCategories } from "@/lib/apiCalls/category";
import { getProducts } from "@/lib/apiCalls/products";

export const dynamic = "force-dynamic";
export default async function Home() {
  const { products } = await getProducts();

  return (
    <div>
      <SimpleCarousel>
        <div className="h-[400px] bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
          <h3>1</h3>
        </div>
        <div className="h-[400px] bg-red-500 flex items-center justify-center text-white text-4xl font-bold">
          <h3>2</h3>
        </div>
        <div className="h-[400px] bg-green-500 flex items-center justify-center text-white text-4xl font-bold">
          <h3>3</h3>
        </div>
        <div className="h-[400px] bg-yellow-500 flex items-center justify-center text-white text-4xl font-bold">
          <h3>4</h3>
        </div>
      </SimpleCarousel>

      <ProductsContainer products={products} />
    </div>
  );
}
