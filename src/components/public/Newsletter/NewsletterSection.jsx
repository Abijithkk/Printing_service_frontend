import { useState } from 'react';
import newsletterWorkspace from '../../../assets/images/newsletter-workspace.png';
import axiosInstance from '../../../config/axiosInstance';
import API_ENDPOINTS from '../../../constants/apiEndpoints';

const NewsletterSection = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFirstName || !trimmedLastName || !trimmedEmail) {
      setErrorMessage('Please fill in all fields before subscribing.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.NEWSLETTER.SUBSCRIBE,
        {
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          email: trimmedEmail,
        },
      );

      if (response.data?.success) {
        setSuccessMessage(
          response.data.message || 'Subscribed successfully. Welcome aboard!',
        );
        setFirstName('');
        setLastName('');
        setEmail('');
      } else {
        setErrorMessage(
          response.data?.message || 'Unable to subscribe at the moment.',
        );
      }
    } catch (error) {
      const apiMessage = error.response?.data?.message;
      setErrorMessage(
        apiMessage ||
          'Unable to subscribe right now. Please try again in a few moments.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f3f3f3] px-4 py-10 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden rounded-md">
              <img
                src={newsletterWorkspace}
                alt="Modern Workspace"
                className="h-[350px] w-full object-cover lg:h-[420px]"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="max-w-lg">
              <h2 className="mb-6 text-2xl font-semibold leading-snug text-gray-900 sm:text-3xl">
                Subscribe for exclusive deals and printing updates in your
                inbox.
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label
                      htmlFor="firstName"
                      className="text-xs font-medium text-gray-600"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="Your first name"
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#8ED800] focus:ring-2 focus:ring-[#8ED800]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-medium text-gray-600"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="Your last name"
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#8ED800] focus:ring-2 focus:ring-[#8ED800]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#8ED800] focus:ring-2 focus:ring-[#8ED800]"
                  />
                </div>

                {successMessage && (
                  <p className="text-xs font-medium text-green-700">
                    {successMessage}
                  </p>
                )}
                {errorMessage && (
                  <p className="text-xs font-medium text-red-600">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-4 w-full rounded-full bg-[#8ED800] py-3 text-xs font-semibold uppercase tracking-widest text-white transition ${
                    isSubmitting
                      ? 'cursor-not-allowed opacity-70'
                      : 'hover:bg-[#7BC400]'
                  }`}
                >
                  {isSubmitting ? 'Subscribing...' : 'Get Started'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
