import type { SalarySettings } from "@/types/finance/salary-settings.type";

export const salarySettings: SalarySettings[] = [
  {
    name: "Governement: Azercell",
    taxes: [
      { from: 0, to: 2500, penalty: 14 },
      { from: 2500, to: 10000000, penalty: 25 },
    ],
    socials: [{ from: 0, to: 10000000, penalty: 3 }],
    unemployments: [{ from: 0, to: 10000000, penalty: 0.5 }],
    insurances: [
      { from: 0, to: 8000, penalty: 2 },
      { from: 8000, to: 10000000, penalty: 0.5 },
    ],
    allowLifeInsurance: true,
    includeMeal: true,
    mealPerDay: 11.111
  },
  {
    name: "Governement: Current",
    taxes: [
      { from: 0, to: 2500, penalty: 14 },
      { from: 2500, to: 10000000, penalty: 25 },
    ],
    socials: [{ from: 0, to: 10000000, penalty: 3 }],
    unemployments: [{ from: 0, to: 10000000, penalty: 0.5 }],
    insurances: [
      { from: 0, to: 8000, penalty: 2 },
      { from: 8000, to: 10000000, penalty: 0.5 },
    ],
    allowLifeInsurance: true,
  },
  {
    name: "Private: Current",
    taxes: [
      { from: 0, to: 8000, penalty: 0 },
      { from: 8000, to: 10000000, penalty: 14 },
    ],
    socials: [
      { from: 0, to: 200, penalty: 3 },
      { from: 200, to: 10000000, penalty: 10 },
    ],
    unemployments: [{ from: 0, to: 10000000, penalty: 0.5 }],
    insurances: [
      { from: 0, to: 8000, penalty: 2 },
      { from: 8000, to: 10000000, penalty: 0.5 },
    ],
  },
];
