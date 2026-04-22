import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import Card from "./../components/Card/Card";
import SkeletonGrid from "../components/Skeletons/SkeletonGrid";
import Title from "../components/Title/Title";
import Filter from "../components/Filter/Filter";

export default function Shop() {
    const { category } = useParams();
    const { products, filters, setFilters, loading } = useProducts();
    const [categories, setCategories] = useState([]);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    // Reset filters when on /shop (all products)
    useEffect(() => {
        if (!category) {
            setFilters({
                minPrice: 0,
                maxPrice: Infinity,
                minRating: 0,
                categories: []
            });
        }
    }, [category, setFilters]);

    // Sync URL category to shared filters if not already selected
    useEffect(() => {
        if (category) {
            const decodedCategory = decodeURIComponent(category);
            if (!filters.categories.includes(decodedCategory)) {
                setFilters(prev => ({
                    ...prev,
                    categories: [...prev.categories, decodedCategory]
                }));
            }
        }
    }, [category, filters.categories, setFilters]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
          .then((res) => res.json())
          .then(setCategories);
    }, []);

    // Compute filtered products using shared filters + URL category
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // URL category (always apply if present)
        if (category) {
            const decodedCategory = decodeURIComponent(category);
            filtered = filtered.filter(p => p.category === decodedCategory);
        }

        // Shared filters
        // Price
        if (filters.minPrice > 0) {
            filtered = filtered.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice < Infinity) {
            filtered = filtered.filter(p => p.price <= filters.maxPrice);
        }

        // Rating
        if (filters.minRating > 0) {
            filtered = filtered.filter(p => p.rating.rate >= filters.minRating);
        }

        // Categories
        if (filters.categories.length > 0) {
            filtered = filtered.filter(p => filters.categories.includes(p.category));
        }

        return filtered;
    }, [products, category, filters]);

    return (
      <div className="lg:px-17.5 px-10 py-10 max-w-7xl mx-auto">
        <Title title={category ? decodeURIComponent(category) : "All Products"} />

        <button
          className="lg:hidden p-3 bg-black text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex gap-2 text-sm font-medium mt-3 w-fit"
          onClick={() => setShowMobileFilter(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455 .232 8.083 .678 .533 .109 .917 .556 .917 1.096v1.091c0 .54-.417 .994-.917 1.096-2.628 .446-5.328 .678-8.083 .678-2.755 0-5.455 .232-8.083 .678-.533 .109-.917 .556-.917 1.096v1.091c0 .54 .417 .994 .917 1.096 2.628 .446 5.328 .678 8.083 .678 2.755 0 5.455 .232 8.083 .678 .533 .109 .917 .556 .917 1.096v1.091c0 .54-.417 .994-.917 1.096-2.628 .446-5.328 .678-8.083 .678m0 0c-.255 .449-.92 .979-2 .979s-1.745-.53-2-.979m0 0c-.255 .449-.92 .979-2 .979-.621 0-1.134-.42-1.134-.979 0-.538 .513-.979 1.134-.979s1.379 .441 2 .979z" />
          </svg>
          Filter
        </button>

        <div className="flex flex-col lg:flex-row gap-8 mt-10 mb-10">
          <div className="hidden lg:block lg:w-64 shrink-0">
            <Filter categories={categories} />
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pt-12">
                <SkeletonGrid count={12} />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">No products found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredProducts.map((pro) => (
                  <Card key={pro.id} link={pro} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Filter Drawer */}
        <div className="lg:hidden">
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
              showMobileFilter ? 'opacity-100' : 'opacity-0 invisible pointer-events-none'
            }`}
            onClick={() => setShowMobileFilter(false)}
          />
          {/* Drawer */}
          <div 
            className={`fixed z-50 bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl h-[75vh] border-t transition-all duration-300 ease-in-out transform ${
              showMobileFilter 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-full opacity-0'
            }`}
          >
            <div className="h-full p-4 ">
              <Filter categories={categories} onClose={() => setShowMobileFilter(false)} />

            </div>
          </div>
        </div>
      </div>
    );
}

