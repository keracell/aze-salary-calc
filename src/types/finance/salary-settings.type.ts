export type ThresholdPenalties = {
  from: number;
  to: number;
  penalty: number;
};

export type SalaryResult = {
  gross: number;
  tax: number;
  social: number;
  unemployment: number;
  insurance: number;
  net: number;
};

export type SalarySettings = {
  name: string;
  taxes: ThresholdPenalties[];
  socials: ThresholdPenalties[];
  unemployments: ThresholdPenalties[];
  insurances: ThresholdPenalties[];
  includeMeal?: boolean;
  allowLifeInsurance?: boolean;
  mealPerDay?: number;
};
