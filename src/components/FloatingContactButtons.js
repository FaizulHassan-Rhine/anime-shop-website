import { MESSENGER_URL, WHATSAPP_URL } from "@/lib/contact";

const btnClass =
  "inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on Messenger"
        className={`${btnClass} bg-[#0084FF] hover:bg-[#0076e4] focus:ring-[#0084FF]`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-current"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.03 2 10.89c0 2.79 1.41 5.27 3.61 6.88L4 22l4.45-2.33A10.87 10.87 0 0012 21.78c5.52 0 10-4.03 10-8.89S17.52 2 12 2zm.55 11.96-2.82-3.01-5.51 3.01 6.06-6.45 2.89 3.01 5.42-3.01-6.04 6.45z" />
        </svg>
      </a>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`${btnClass} bg-[#25D366] hover:bg-[#20ba57] focus:ring-[#25D366]`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-current"
          aria-hidden="true"
        >
          <path d="M16.01 3.2C8.92 3.2 3.18 8.94 3.18 16.03c0 2.25.59 4.45 1.7 6.39l-1.81 6.6 6.76-1.77a12.8 12.8 0 0 0 6.17 1.57h.01c7.08 0 12.82-5.74 12.82-12.83S23.1 3.2 16.01 3.2Zm0 23.48h-.01a10.7 10.7 0 0 1-5.45-1.5l-.39-.23-4.01 1.05 1.08-3.91-.25-.4a10.67 10.67 0 0 1-1.63-5.66c0-5.9 4.8-10.7 10.7-10.7 2.85 0 5.52 1.11 7.54 3.13a10.59 10.59 0 0 1 3.14 7.56c0 5.9-4.8 10.7-10.72 10.7Zm5.87-8.02c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.58-.95-.85-1.59-1.89-1.78-2.2-.19-.32-.02-.49.14-.65.15-.15.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.35-.26-.62-.53-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.69 0 1.58 1.15 3.11 1.31 3.32.16.21 2.25 3.43 5.46 4.81.76.33 1.36.52 1.82.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </a>
    </div>
  );
}
