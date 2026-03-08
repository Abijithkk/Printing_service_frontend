import { useEffect, useMemo, useRef, useState } from 'react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import useNewsletter from '../../hooks/useNewsletter';
import { useToast } from '../../hooks/useToast';

const NewsletterSubmissionsPage = () => {
  const { success, error: showError } = useToast();
  const { data, isLoading, error, fetchSubscribers, removeError } =
    useNewsletter();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchSubscribers();
  }, [fetchSubscribers]);

  useEffect(() => {
    if (error) {
      showError(error);
      removeError();
    }
  }, [error, showError, removeError]);

  const sortedSubscribers = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }, [data]);

  const filteredSubscribers = useMemo(() => {
    if (!searchTerm.trim()) return sortedSubscribers;

    const term = searchTerm.toLowerCase();
    return sortedSubscribers.filter((subscriber) => {
      const firstName = subscriber.firstName || '';
      const lastName = subscriber.lastName || '';
      const email = subscriber.email || '';

      const fullName = `${firstName} ${lastName}`.toLowerCase().trim();

      return (
        firstName.toLowerCase().includes(term) ||
        lastName.toLowerCase().includes(term) ||
        fullName.includes(term) ||
        email.toLowerCase().includes(term)
      );
    });
  }, [sortedSubscribers, searchTerm]);

  const totalItems = filteredSubscribers.length;
  const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / pageSize);
  const currentPageSafe = Math.min(currentPage, totalPages);
  const startIndex = (currentPageSafe - 1) * pageSize;
  const paginatedSubscribers = filteredSubscribers.slice(
    startIndex,
    startIndex + pageSize,
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleExport = () => {
    if (!Array.isArray(filteredSubscribers) || filteredSubscribers.length === 0) {
      showError('No subscribers to export');
      return;
    }

    const header = 'First Name,Last Name,Email,Subscribed At\n';
    const rows = filteredSubscribers
      .map((subscriber) => {
        const firstName = (subscriber.firstName || '').replace(/"/g, '""');
        const lastName = (subscriber.lastName || '').replace(/"/g, '""');
        const email = (subscriber.email || '').replace(/"/g, '""');
        const createdAt = subscriber.createdAt
          ? new Date(subscriber.createdAt).toISOString()
          : '';

        return `"${firstName}","${lastName}","${email}","${createdAt}"`;
      })
      .join('\n');

    const csvContent = header + rows;
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'newsletter-subscribers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    success('Export started');
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (row) => {
        const firstName = row.firstName || '';
        const lastName = row.lastName || '';
        const fullName = `${firstName} ${lastName}`.trim();

        return (
          <span className="font-medium text-gray-900">
            {fullName || '—'}
          </span>
        );
      },
    },
    {
      header: 'Email',
      accessor: 'email',
      render: (row) => (
        <span className="font-mono text-sm text-gray-700">{row.email}</span>
      ),
    },
    {
      header: 'Subscribed On',
      accessor: 'createdAt',
      render: (row) => (
        <span className="text-sm text-gray-500">
          {row.createdAt
            ? new Date(row.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : '—'}
        </span>
      ),
    },
  ];

  const showingFrom =
    totalItems === 0 ? 0 : Math.min(startIndex + 1, totalItems);
  const showingTo = Math.min(startIndex + pageSize, totalItems);

  return (
    <div className="mx-auto max-w-6xl pb-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Newsletter Subscribers
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View, search, and export the list of users who have opted in via the
            newsletter form.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name or email"
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <Button
            onClick={handleExport}
            icon={ArrowDownTrayIcon}
            className="px-4 py-2.5"
            loading={isLoading}
          >
            Export CSV
          </Button>
        </div>
      </div>

      <Table columns={columns} data={paginatedSubscribers} rowIdKey="_id" />

      <div className="mt-4 flex flex-col items-start justify-between gap-3 text-sm text-gray-500 sm:flex-row sm:items-center">
        <p>
          Showing {showingFrom}-{showingTo} of {totalItems} subscribers
        </p>
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
            disabled={currentPageSafe === 1}
            className={`relative inline-flex items-center rounded-l-md border border-gray-300 px-3 py-1.5 text-xs font-medium ${
              currentPageSafe === 1
                ? 'cursor-not-allowed bg-gray-50 text-gray-300'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages ? prev + 1 : prev,
              )
            }
            disabled={currentPageSafe === totalPages || totalItems === 0}
            className={`relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 px-3 py-1.5 text-xs font-medium ${
              currentPageSafe === totalPages || totalItems === 0
                ? 'cursor-not-allowed bg-gray-50 text-gray-300'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubmissionsPage;
