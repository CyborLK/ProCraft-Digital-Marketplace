'use client';

import { useState } from 'react';
import type { Product } from '@/lib/products';
import ProductCard from './product-card';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

type ProductListingsProps = {
  products: Product[];
};

export default function ProductListings({ products }: ProductListingsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for products or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 h-12 text-base bg-card text-card-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-lg">
          <p className="text-xl font-semibold text-card-foreground">No products found</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}
