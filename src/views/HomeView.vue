<script setup lang="ts">
import { salarySettings } from "@/settings/salary.settings";
import { calculateSalaryForMonth } from "@/utils/salary-calculator";
import { computed, ref, watch } from "vue";

const baseSalary = ref<number>(0);
const totalWorkDays = ref<number>(20);
const workDays = ref<number>(20);
const lifeInsurance = ref<number>(0);

const net = computed(() =>
  salarySettings.map((setting, index) => ({
    id: index + 1,
    name: setting.name,
    salary: calculateSalaryForMonth({
      gross: baseSalary.value,
      totalWorkingDays: totalWorkDays.value,
      workedDays: workDays.value,
      lifeInsurance: lifeInsurance.value,
      settings: setting,
    }),
  })),
);

const selectedIndex = ref<number>(0);

const selectedSalary = computed(() => net.value.at(selectedIndex.value)?.salary);

watch(totalWorkDays, (value: number) => {
  if (workDays.value > value) workDays.value = value;
});

watch(workDays, (value: number) => {
  if (totalWorkDays.value < value) totalWorkDays.value = value;
});
</script>

<template>
  <main>
    base:
    <input type="number" v-model.number="baseSalary" />
    life:
    <input type="number" v-model.number="lifeInsurance" />
    totalWorkDays:
    <input type="number" v-model.number="totalWorkDays" />
    workDays:
    <input type="number" v-model.number="workDays" />
    <br />

    <ul class="flex gap-2 my-4">
      <li v-for="{ name, id } in net" :key="id" @click="selectedIndex = id - 1">{{ name }}</li>
    </ul>
    <div class="max-w-96" v-if="selectedSalary">
      <div class="flex justify-between">
        Gross:
        <div class="font-bold">{{ selectedSalary.gross.toFixed(2) }}</div>
      </div>
      <div class="flex justify-between">
        Taxes:
        <div class="font-bold">{{ selectedSalary.tax.toFixed(2) }}</div>
      </div>
      <div class="flex justify-between">
        Social tax:
        <div class="font-bold">{{ selectedSalary.social.toFixed(2) }}</div>
      </div>
      <div class="flex justify-between">
        Insurance fee:
        <div class="font-bold">{{ selectedSalary.insurance.toFixed(2) }}</div>
      </div>
      <div class="flex justify-between">
        Unemployment tax:
        <div class="font-bold">{{ selectedSalary.unemployment.toFixed(2) }}</div>
      </div>
      <div class="flex justify-between">
        Net amount:
        <div class="font-bold">{{ selectedSalary.net.toFixed(2) }}</div>
      </div>
    </div>
  </main>
</template>
