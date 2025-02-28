export interface Indicator {
  id: number;
  indicator: string;
  type: string;
  created: string;
  is_active: number;
}

export interface Threat {
  id: string;
  name: string;
  indicators: Indicator[];
  attack_ids: string[];
  tags: string[];
  malware_families: string[];
}
