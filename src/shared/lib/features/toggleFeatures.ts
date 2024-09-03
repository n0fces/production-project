import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from './setGetFeatures';

// используется дженерик, чтобы можно было в качестве фичи потом отдавать
// самые разные штуки (компоненты, строки с определенными значениями и так далее)
interface ToggleFeaturesOptions<T> {
	name: keyof FeatureFlags;
	on: () => T;
	off: () => T;
}

// если для текущего пользователя данная с именем name фича включена, то будет вызов on, а иначе вызов off
export function toggleFeatures<T>({
	off,
	on,
	name,
}: ToggleFeaturesOptions<T>): T {
	if (getFeatureFlag(name)) {
		return on();
	}

	return off();
}
