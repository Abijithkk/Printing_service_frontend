import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useCategories from '../../hooks/useCategories';
import Loader from '../../components/common/Loader';

const CategoryDetailPage = () => {
  const { id } = useParams();
  const {
    data: categories,
    isLoading,
    error,
    fetchCategories,
  } = useCategories();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  const category =
    categories && categories.find((c) => c._id === id || c.id === id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-gray-600">Category not found.</p>
        <Link to="/" className="text-blue-600 underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">{category.title}</h1>
      {category.image && (
        <img
          src={category.image}
          alt={category.title}
          className="mb-6 w-full rounded-lg object-cover"
        />
      )}
      {category.description && (
        <p className="mb-6 text-gray-700">{category.description}</p>
      )}
      <Link to="/" className="text-indigo-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
};

export default CategoryDetailPage;
