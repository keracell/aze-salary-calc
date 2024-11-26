import type {
  SalaryResult,
  SalarySettings,
  ThresholdPenalties,
} from "@/types/finance/salary-settings.type";

export function calculateThreshold(gross: number, thresholds: ThresholdPenalties[]): number {
  const sorted: ThresholdPenalties[] = [...thresholds].sort((a, b) => a.from - b.from);
  return (
    Math.round(
      100 *
        sorted.reduce((acc: number, { from, to, penalty }: ThresholdPenalties) => {
          if (gross < from) return acc;
          const diff = to - from;
          const value = gross - from > diff ? diff : gross - from;
          const result = acc + (value * penalty) / 100;
          return result;
        }, 0),
    ) / 100
  );
}

export function calculateSalaryForMonth({
  gross,
  totalWorkingDays,
  workedDays,
  lifeInsurance,
  settings,
}: {
  gross: number;
  totalWorkingDays: number;
  workedDays: number;
  lifeInsurance: number;
  settings: SalarySettings;
}) {
  const { includeMeal, mealPerDay } = settings;
  const workCoefficient = Math.min(1, workedDays / totalWorkingDays);
  const meal = includeMeal && mealPerDay ? mealPerDay * workedDays : 0;
  const _gross = Math.round(100 * gross * workCoefficient) / 100;
  return calculateSalary(_gross, meal, lifeInsurance, settings);
}

export function calculateSalary(
  gross: number,
  meal: number,
  lifeInsurance: number,
  settings: SalarySettings,
): SalaryResult {
  const _gross =
    gross + (settings.includeMeal ? meal : 0) - (settings.allowLifeInsurance ? lifeInsurance : 0);
  const tax = calculateThreshold(_gross, settings.taxes);
  const social = calculateThreshold(_gross, settings.socials);
  const insurance = calculateThreshold(gross, settings.insurances);
  const unemployment = calculateThreshold(gross, settings.unemployments);
  const net = Math.round(100 * (_gross - tax - social - insurance - unemployment)) / 100;
  return {
    gross,
    tax,
    social,
    insurance,
    unemployment,
    net,
  };
}
