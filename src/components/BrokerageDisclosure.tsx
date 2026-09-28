/**
 * The only on-page place for the brokerage name and Nevada license number.
 */
export function BrokerageDisclosure() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#070b10] text-blue-100">
      <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs leading-relaxed sm:px-6 lg:px-8">
        © {year} The Vistas Summerlin. Berkshire Hathaway HomeServices Nevada Properties. Nevada real estate license S.0197614.LLC.
      </p>
    </footer>
  );
}
