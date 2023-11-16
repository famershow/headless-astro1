import { useIsDev } from "~/hooks/useIsDev";
import { useIsInIframe } from "~/hooks/useIsInIframe";

export function SanityStudioLink(props: { port?: string }) {
  const isDev = useIsDev();
  const isInIframe = useIsInIframe();
  const { port } = props;
  const studioLink = `http://localhost:${port}`;

  if (!isDev || isInIframe || !port) return null;

  return (
    <div className="fixed bottom-1 right-1 z-50 rounded-full bg-white">
      <a href={studioLink} target="_blank" rel="noreferrer">
        <SanitySymbol />
      </a>
    </div>
  );
}

function SanitySymbol() {
  return (
    <svg
      className="h-9 w-9"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_816)">
        <rect width="128" height="128" fill="#F03E2F" />
        <path
          d="M39.4229 33.1629C39.4229 44.1614 46.3362 50.7055 60.1767 54.1563L74.8429 57.4971C87.9417 60.453 95.9185 67.7945 95.9185 79.7554C96.0204 84.9662 94.296 90.053 91.0345 94.1634C91.0345 82.23 84.751 75.7822 69.595 71.9052L55.1947 68.6881C43.6633 66.1035 34.7628 60.068 34.7628 47.076C34.7021 42.0589 36.3415 37.1644 39.4229 33.1629"
          fill="white"
        />
        <path
          d="M82.0221 76.827C88.2777 80.759 91.0206 86.2583 91.0206 94.1497C85.8426 100.666 76.7462 104.323 66.0545 104.323C48.0576 104.323 35.4626 95.6207 32.6637 80.4978H49.9469C52.172 87.4406 58.0636 90.6577 65.9285 90.6577C75.5287 90.6577 81.9102 85.6258 82.0361 76.7995"
          fill="#F9B1AB"
        />
        <path
          d="M48.4074 49.4682C45.5509 47.8004 43.2074 45.404 41.6255 42.5332C40.0437 39.6624 39.2826 36.4244 39.423 33.1629C44.419 26.7013 53.1096 22.7556 63.7034 22.7556C82.0361 22.7556 92.6439 32.2693 95.2608 45.66H78.6354C76.8022 40.3807 72.212 36.27 63.8433 36.27C54.9008 36.27 48.7993 41.3843 48.4494 49.4682"
          fill="#F9B1AB"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_816">
          <rect width="128" height="128" rx="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}