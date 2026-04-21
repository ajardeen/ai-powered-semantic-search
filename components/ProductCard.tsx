interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  stock: number;
  inStock: boolean;
  tags: string[];
  score?: number;
}
function ProductCard({
  product,
  enableAiSearch,
  metric,
}: {
  product: Product;
  enableAiSearch: boolean;
  metric?: any;
}) {
  return (
    <div
      key={product._id}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-white/10 dark:bg-[#17191d]"
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
          {product.category}
        </div>

        {/* AI Match Badge
        {enableAiSearch && metric && (
          <div
            className={`absolute top-4 right-4 rounded-full px-3 py-1 text-[11px] font-bold shadow-lg backdrop-blur-md ${metric.bg} ${metric.color} border border-current/20`}
          >
            {metric.label} • {metric.pct}%
          </div>
        )} */}

        {/* Out of Stock */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="text-sm flex items-center gap-2 justify-between">
          <p>Ai Match Score</p>
          {/* AI Match Badge */}
          {enableAiSearch && metric && (
            <div
              className={` top-4 right-4 rounded-full px-3 py-0.5 text-[11px] font-semibold  backdrop-blur-md ${metric.bg} ${metric.color} border border-current/20`}
            >
              {metric.label} • {metric.pct}%
            </div>
          )}
        </div>
        {/* <hr /> */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              {product.brand}
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                ★ {product.rating}
              </div>

              <span className="text-xs text-slate-500 dark:text-slate-400">
                {product.reviewCount} reviews
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              ₹{product.price.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              {product.stock} left
            </p>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
