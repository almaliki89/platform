export type SimulationViewMode = 'layers-explorer' | 'radio-propagation';

export type WavePropagationType = 'ground-wave' | 'sky-wave' | 'satellite-space';

export interface AtmosphereLayerInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  minAltKm: number;
  maxAltKm: number;
  tempTrendAr: string;
  keyFeaturesAr: string[];
  color: string;
}

export interface AtmosphericCommunicationsState {
  viewMode: SimulationViewMode;
  altitudeKm: number; // 0 to 600 km
  selectedWaveType: WavePropagationType;
  carrierFrequencyMHz: number;
  stationDistanceKm: number;
}

export interface PropagationResult {
  waveTypeAr: string;
  frequencyBandAr: string;
  propagationPathAr: string;
  ionosphereInteractionAr: string;
  maxCoverageRangeKm: number;
  practicalApplicationsAr: string;
}
