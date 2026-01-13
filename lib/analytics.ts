import { track } from '@vercel/analytics';

/**
 * Analytics utility functions for tracking user interactions
 */

// Event types for better type safety
export const AnalyticsEvents = {
  // Navigation events
  NAVIGATION_CLICK: 'navigation_click',
  EXTERNAL_LINK_CLICK: 'external_link_click',

  // Content engagement
  SERMON_PLAY: 'sermon_play',
  SERMON_PAUSE: 'sermon_pause',
  SERMON_COMPLETE: 'sermon_complete',
  SERMON_DOWNLOAD: 'sermon_download',

  // Form interactions
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_ERROR: 'contact_form_error',

  // CTA interactions
  CTA_CLICK: 'cta_click',
  GIVE_BUTTON_CLICK: 'give_button_click',

  // Gallery interactions
  IMAGE_VIEW: 'image_view',
  VIDEO_PLAY: 'video_play',

  // Ministry interactions
  MINISTRY_VIEW: 'ministry_view',

  // Social media
  SOCIAL_MEDIA_CLICK: 'social_media_click',
} as const;

export type AnalyticsEvent = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

/**
 * Track a custom analytics event
 */
export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined') {
    track(event, properties);
  }
}

/**
 * Track navigation clicks
 */
export function trackNavigation(destination: string, section?: string) {
  trackEvent(AnalyticsEvents.NAVIGATION_CLICK, {
    destination,
    ...(section && { section }),
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, label?: string) {
  trackEvent(AnalyticsEvents.EXTERNAL_LINK_CLICK, {
    url,
    ...(label && { label }),
  });
}

/**
 * Track sermon interactions
 */
export function trackSermonPlay(sermonTitle: string, sermonId?: string) {
  trackEvent(AnalyticsEvents.SERMON_PLAY, {
    sermon_title: sermonTitle,
    ...(sermonId && { sermon_id: sermonId }),
  });
}

export function trackSermonPause(sermonTitle: string, progress: number) {
  trackEvent(AnalyticsEvents.SERMON_PAUSE, {
    sermon_title: sermonTitle,
    progress_percent: Math.round(progress * 100),
  });
}

export function trackSermonComplete(sermonTitle: string) {
  trackEvent(AnalyticsEvents.SERMON_COMPLETE, {
    sermon_title: sermonTitle,
  });
}

export function trackSermonDownload(sermonTitle: string) {
  trackEvent(AnalyticsEvents.SERMON_DOWNLOAD, {
    sermon_title: sermonTitle,
  });
}

/**
 * Track form submissions
 */
export function trackContactFormSubmit(formType: string) {
  trackEvent(AnalyticsEvents.CONTACT_FORM_SUBMIT, {
    form_type: formType,
  });
}

export function trackContactFormError(errorType: string) {
  trackEvent(AnalyticsEvents.CONTACT_FORM_ERROR, {
    error_type: errorType,
  });
}

/**
 * Track CTA interactions
 */
export function trackCTAClick(ctaName: string, location?: string) {
  trackEvent(AnalyticsEvents.CTA_CLICK, {
    cta_name: ctaName,
    ...(location && { location }),
  });
}

export function trackGiveClick(source?: string) {
  trackEvent(AnalyticsEvents.GIVE_BUTTON_CLICK, {
    ...(source && { source }),
  });
}

/**
 * Track media interactions
 */
export function trackImageView(imageTitle: string, galleryName?: string) {
  trackEvent(AnalyticsEvents.IMAGE_VIEW, {
    image_title: imageTitle,
    ...(galleryName && { gallery_name: galleryName }),
  });
}

export function trackVideoPlay(videoTitle: string) {
  trackEvent(AnalyticsEvents.VIDEO_PLAY, {
    video_title: videoTitle,
  });
}

/**
 * Track ministry interactions
 */
export function trackMinistryView(ministryName: string) {
  trackEvent(AnalyticsEvents.MINISTRY_VIEW, {
    ministry_name: ministryName,
  });
}

/**
 * Track social media clicks
 */
export function trackSocialMediaClick(platform: string, location?: string) {
  trackEvent(AnalyticsEvents.SOCIAL_MEDIA_CLICK, {
    platform,
    ...(location && { location }),
  });
}
