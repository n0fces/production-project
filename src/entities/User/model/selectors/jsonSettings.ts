import { buildSelector } from '@/shared/lib/store';
import { JsonSettings } from '../types/jsonSettings';

// отдельно вынесли дефолтный объект настроек, чтобы этот объект каждый раз не пересоздавался при вызове селектора
const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
	(state) => state.user?.authData?.jsonSettings ?? defaultJsonSettings,
);
