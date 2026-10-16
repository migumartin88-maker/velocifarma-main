export type InfusionInput = {
  drugId: string;
  doseMg: number;
  volumeMl: number;
  administrationNumber: number;
};

export type InfusionStep = {
  rateMlPerHour: number;
  durationMinutes: number;
};

const RITUXIMAB_FIRST_ADMINISTRATION_RATES_MG_PER_HOUR = [
  50, 100, 150, 200, 250, 300, 350, 400,
];
const RITUXIMAB_SECOND_ADMINISTRATION_RATES_MG_PER_HOUR = [100, 200, 300, 400];
const STEP_DURATION_MINUTES = 30;
const PREPARATION_VOLUME_ML = 250;
const RITUXIMAB_LATER_ADMINISTRATION_STEPS: InfusionStep[] = [
  { rateMlPerHour: 100, durationMinutes: 30 },
  { rateMlPerHour: 200, durationMinutes: 30 },
  { rateMlPerHour: 200, durationMinutes: 30 },
];

/**
 * Genera los tramos configurados para rituximab. Las dos primeras
 * administraciones usan velocidades en mg/h, convertidas a mL/h según la
 * dosis y el volumen preparados. Desde la tercera, el esquema está expresado
 * directamente en mL/h: 100 mL/h durante 30 minutos, seguido de
 * 200 mL/h durante dos tramos de 30 minutos (90 minutos en total).
 */
export function createInfusionSteps(input: InfusionInput): InfusionStep[] {
  if (
    input.drugId !== 'rituximab' ||
    !Number.isInteger(input.administrationNumber) ||
    input.administrationNumber < 1
  ) {
    throw new RangeError('La pauta requiere rituximab y un número de administración entero positivo.');
  }

  if (!Number.isFinite(input.doseMg) || input.doseMg <= 0) {
    throw new RangeError('La dosis debe ser un número mayor que cero.');
  }

  if (input.volumeMl !== PREPARATION_VOLUME_ML) {
    throw new RangeError(`La pauta configurada requiere un volumen de ${PREPARATION_VOLUME_ML} mL.`);
  }

  if (input.administrationNumber >= 3) {
    return RITUXIMAB_LATER_ADMINISTRATION_STEPS.map((step) => ({ ...step }));
  }

  const ratesMgPerHour = input.administrationNumber === 1
    ? RITUXIMAB_FIRST_ADMINISTRATION_RATES_MG_PER_HOUR
    : RITUXIMAB_SECOND_ADMINISTRATION_RATES_MG_PER_HOUR;
  const concentrationMgPerMl = input.doseMg / PREPARATION_VOLUME_ML;
  let remainingDoseMg = input.doseMg;

  const steps: InfusionStep[] = [];
  ratesMgPerHour.forEach((rateMgPerHour, index) => {
    const isMaximumRate = index === ratesMgPerHour.length - 1;

    while (remainingDoseMg > 0) {
      const dosePerStepMg = rateMgPerHour * STEP_DURATION_MINUTES / 60;
      const completesDose = remainingDoseMg <= dosePerStepMg;
      const durationMinutes = completesDose
        ? remainingDoseMg / rateMgPerHour * 60
        : STEP_DURATION_MINUTES;

      steps.push({
        rateMlPerHour: rateMgPerHour / concentrationMgPerMl,
        durationMinutes,
      });
      remainingDoseMg = completesDose ? 0 : remainingDoseMg - dosePerStepMg;

      if (!isMaximumRate || completesDose) break;
    }
  });

  return steps;
}
