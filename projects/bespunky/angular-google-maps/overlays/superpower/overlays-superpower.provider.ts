import { createSuperpowerProvider } from '@bespunky/angular-google-maps/core';
import { OverlaysSuperpower       } from './services/overlays-superpower.service';

export const OverlaysSuperpowerProvider = createSuperpowerProvider(OverlaysSuperpower);