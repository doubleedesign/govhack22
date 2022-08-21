import React, { useEffect } from 'react';
import { useDeepCompareMemoize } from './useDeepCompareMemoize';

export function useDeepCompareEffectForMaps(
	callback: React.EffectCallback,
	dependencies: any[]
) {
	useEffect(callback, dependencies.map(useDeepCompareMemoize));
}