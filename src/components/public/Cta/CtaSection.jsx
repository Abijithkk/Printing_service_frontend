import { FileText, MapPin, Upload, Phone } from 'lucide-react';
import graphicDesign from '../../../assets/images/graphic-design.png';

const CtaSection = ({ quickActions, settings }) => {
  const fallbackActions = [
    { icon: <FileText size={24} />, label: 'Request a Quote' },
    { icon: <MapPin size={24} />, label: 'Visit Our Shops' },
    { icon: <Upload size={24} />, label: 'Upload Your Files' },
    { icon: <Phone size={24} />, label: 'Call Us' },
  ];

  const actions =
    Array.isArray(quickActions) && quickActions.length
      ? quickActions.map((item) => ({
          icon: null,
          label: item.title || item.text || '',
        }))
      : fallbackActions;

  return (
    <section className="bg-white px-4 py-10 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-stretch">
          {/* Left Column */}
          <div className="flex flex-col gap-3 md:w-2/5">
            {actions.map((action, index) => (
              <button
                key={index}
                className="flex flex-1 items-center gap-4 bg-[#111111] px-8 py-6 text-white transition-all hover:bg-black"
              >
                <div className="text-white">
                  {action.icon}
                </div>
                <span className="text-[18px] font-medium">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="overflow-hidden">
              <img
                src={graphicDesign}
                alt="Reliable Printing"
                className="h-[180px] w-full object-cover"
              />
            </div>
            <div className="mt-6">
              <h2
                className="mb-4 text-[38px] font-light leading-[1.1] tracking-tight md:text-[52px]"
                style={{ color: '#252525' }}
              >
                Need{' '}
                <span className="font-extrabold" style={{ color: '#252525' }}>
                  Reliable &
                </span>
                <br />
                <span className="font-extrabold" style={{ color: '#252525' }}>
                  Budget-
                </span>
                Friendly <span className="font-normal">Printing?</span>
              </h2>
              <p
                className="max-w-md text-[17px] font-light leading-relaxed"
                style={{ color: '#252525' }}
              >
                We&apos;re here to make your next project simple, smooth, and
                hassle-free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
