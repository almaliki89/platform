export interface AppliancePreset {
  id: string;
  nameAr: string;
  categoryAr: string;
  defaultPowerW: number;
  typicalHoursPerDay: number;
  recommendedFuseA: number;
}

export interface ElectricalEnergyState {
  voltageV: number;
  powerW: number;
  timeHours: number;
  selectedApplianceId: string;
}

export interface ElectricalEnergyResult {
  currentA: number;
  equivalentResistanceOhm: number;
  powerW: number;
  powerKW: number;
  energyJoules: number;
  energyKWh: number;
  recommendedFuseA: number;
  safetyAdviceAr: string;
}
