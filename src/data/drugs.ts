export type Drug = {
  id: string;
  name: string;
  protocolStatus: 'pending-validation' | 'ready';
};

// El catálogo crecerá con protocolos revisados y versionados.
export const drugs: Drug[] = [
  { id: 'rituximab', name: 'Rituximab', protocolStatus: 'ready' },
];
