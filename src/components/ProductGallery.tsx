import React, { useContext, useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import TestimonialCard from './TestimonialCard';
import DecorativeElements from './DecorativeElements';
import { ProviderContext } from './ProviderContext';
import { motion } from 'motion/react';

const initialProducts = [
  {
    id: 1,
    name: 'Paradiso Maldiviano',
    description: 'Esperienza indimenticabile in un paradiso tropicale con acque cristalline e spiagge bianche.',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '1.3',
    available: 10,
    location: 'Maldive',
    duration: '7 giorni',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Nuova Zelanda Estrema',
    description: 'Avventura nella terra di mezzo tra vette maestose, fiordi profondi e cultura Maori.',
    imageUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '1.2',
    available: 3,
    location: 'Nuova Zelanda',
    duration: '12 giorni',
    rating: 4.7
  },
  {
    id: 3,
    name: 'Costa Ovest USA',
    description: 'Dalle spiagge di California ai parchi nazionali, scopri la bellezza selvaggia dell\'America.',
    imageUrl: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '2.12',
    available: 5,
    location: 'Stati Uniti',
    duration: '14 giorni',
    rating: 4.8
  },
  {
    id: 4,
    name: 'Scoperta del Giappone',
    description: 'Un viaggio tra tradizione e futuro, dalle antiche pagode di Kyoto ai grattacieli di Tokyo.',
    imageUrl: 'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '3.55',
    available: 2,
    location: 'Giappone',
    duration: '10 giorni',
    rating: 4.9
  }
];

const ProductGallery = () => {
  const { provider } = useContext(ProviderContext);
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('recommended');

  const handlePurchase = (productId) => {
    setProducts(currentProducts =>
      currentProducts.map(product =>
        product.id === productId ? { ...product, available: product.available - 1 } : product,
      ),
    );
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    if (filter === 'available') return product.available > 0;
    return product.location.toLowerCase() === filter.toLowerCase();
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
    if (sortOrder === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
    if (sortOrder === 'rating') return b.rating - a.rating;
    return 0;
  });

  const locations = [...new Set(products.map(p => p.location))];

  return (
    <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <DecorativeElements type="badge" text="[DESTINATIONS]" variant="outline" />
          <DecorativeElements type="asterisk" />
          <span className="label-sm text-gray-500">2024</span>
        </div>

        <h2 className="display-md mb-4">
          it's - about <br />
          journeys <DecorativeElements type="asterisk" /> ©24
        </h2>

        <p className="body-lg text-gray-600 max-w-2xl">
          From timeless classics to bold statement pieces, our curated collection is designed to celebrate your unique style in every moment.
        </p>
      </motion.div>

      {/* Filters & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === 'all'
              ? 'bg-black text-white border-2 border-black'
              : 'bg-white text-black border border-gray-300 hover:border-black'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === 'available'
              ? 'bg-black text-white border-2 border-black'
              : 'bg-white text-black border border-gray-300 hover:border-black'
              }`}
          >
            Available
          </button>

          {locations.map(location => (
            <button
              key={location}
              onClick={() => setFilter(location)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === location
                ? 'bg-black text-white border-2 border-black'
                : 'bg-white text-black border border-gray-300 hover:border-black'
                }`}
            >
              {location}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-full py-2 pl-5 pr-10 text-sm font-medium hover:border-black transition-colors focus:outline-none focus:border-black"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low-High</option>
            <option value="price-high">Price: High-Low</option>
            <option value="rating">Rating</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Products Grid - Editorial Asymmetric Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
          >
            <ProductItem
              product={product}
              onPurchase={handlePurchase}
              featured={index === 0}
            />
          </motion.div>
        ))}

        {/* Testimonial Card integrated in grid */}
        {sortedProducts.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:block"
          >
            <TestimonialCard
              quote="Booking my Maldives trip with crypto was seamless! The blockchain verification gave me complete peace of mind. Voyage is the future of travel."
              author="Emma Rodriguez"
              handle="@travelwithemma"
              rating={5}
              avatar="https://randomuser.me/api/portraits/women/44.jpg"
            />
          </motion.div>
        )}
      </div>

      {/* Learn More Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16"
      >
        <a href="#how-it-works" className="arrow-link text-lg">
          Learn More
          <svg className="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-6">No destinations found with current filters.</p>
          <button
            onClick={() => setFilter('all')}
            className="btn-secondary"
          >
            Show All
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGallery;