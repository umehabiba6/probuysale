import { useEffect } from "react";

export default function AdUnit({ slotId, className = "", style = {} }) {
  useEffect(() => {
    // Ensure ads are (re)initialized after React mounts/updates.
    // Google AdSense exposes a global queue: window.adsbygoogle.
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch {
      // Avoid breaking the page if AdSense script is blocked/unavailable.
    }
  }, [slotId]);

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={"ca-pub-6087131991867287"}

        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

