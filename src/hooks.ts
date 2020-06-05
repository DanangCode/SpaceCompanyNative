import {useContext, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {chain} from 'lodash';
import {ReduxState} from './redux/store';
import {ResourceType} from './types';
import {ThemeContext} from './';
import {machinesData} from './data/machinesData';
import {ResearchId} from './data/researchData';

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useResource = (resourceId: ResourceType) => {
  return useSelector((state: ReduxState) => state.resource[resourceId]);
};

export const useResources = () => {
  const resources = useSelector((state: ReduxState) => state.resource);

  const resourceGroups = chain(Object.values(resources))
    .pickBy((r) => r.unlocked)
    .filter(
      (r) =>
        r !== undefined &&
        r.category !== 'rocketFuel' &&
        r.category !== 'spacecraft' &&
        r.category !== 'science',
    )
    .groupBy((r) => r && r.category)
    .value();

  return Object.keys(resourceGroups).map((key) => {
    return {
      header: key,
      data: resourceGroups[key],
    };
  });
};

export const useMachines = (resourceId: ResourceType) => {
  const machines = useSelector((state: ReduxState) => state.machine);
  return Object.values(machines)
    .filter(
      (machine) =>
        machine.unlocked && machinesData[machine.id].resource === resourceId,
    )
    .sort((a, b) => machinesData[a.id].tier - machinesData[b.id].tier)
    .map((machine) => machine.id);
};

export const useResearches = () => {
  const research = useSelector((state: ReduxState) => state.research);
  return useMemo(() => {
    const researchIds = Object.keys(research);
    return researchIds.filter((id) => research[id as ResearchId].unlocked);
  }, [research]);
};

export const useResearch = (type: ResearchId) => {
  return useSelector((state: ReduxState) => state.research[type]);
};
