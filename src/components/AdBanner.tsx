import React, { useEffect, useRef, useState } from 'react';
import { AD_CONFIG } from '../config/ads';
import { AppLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Info, X } from 'lucide-react';

interface AdBannerProps {
  placement?: 'bottom-banner' | 'in-feed' | 'study-card';
  currentLanguage?: AppLanguage;
  slotIdOverride?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  placement = 'bottom-banner',
  currentLanguage = 'bn',
  slotIdOverride,
}) => {
  const adRef = useRef<HTMLDivElement | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const t = TRANSLATIONS[currentLanguage];
  const activeSlotId = slotIdOverride || AD_CONFIG.slotId;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && AD_CONFIG.enabled) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.log('AdSense / AdMob banner init:', e);
    }
  }, []);

  if (dismissed || !AD_CONFIG.enabled) {
    return null;
  }

  return (
    <div
      ref={adRef}
      className="my-3 w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-2 shadow-2xs transition-all"
    >
      <div className="flex items-center justify-between px-2 pb-1 text-[11px] text-slate-400">
        <div className="flex items-center gap-1">
          <Info className="w-3 h-3 text-slate-400" />
          <span>{t.adSponsored}</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="rounded p-0.5 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          title={t.closeAd}
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      <div className="flex min-h-[50px] sm:min-h-[60px] items-center justify-center rounded-xl bg-slate-50 text-center">
        {/* Google AdSense / AdMob ins tag */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={AD_CONFIG.publisherId}
          data-ad-slot={activeSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        {/* Fallback info card when ads are in test/pending review */}
        <div className="p-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-600">{t.adActive}</span> • {activeSlotId}
        </div>
      </div>
    </div>
  );
};
