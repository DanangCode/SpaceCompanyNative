import React from 'react';
import {StyleSheet} from 'react-native';
import {Machine, ResourceType} from '../types';
import {useResource, useResourceCount} from '../hooks';
import ThemedButton from './ThemedButton';
import ThemedView from './ThemedView';
import ThemedText from './ThemedText';
import ResourceCost from './ResourceBullet';

const styles = StyleSheet.create({
  machineCard: {
    alignSelf: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  valueBox: {
    width: '50%',
  },
});

const Cost = ({
  resourceType,
  cost,
}: {
  resourceType: ResourceType;
  cost: number | undefined;
}) => {
  const data = useResource(resourceType);
  const count = useResourceCount(resourceType);

  return (
    <ResourceCost
      name={data.name}
      dps={count.perSecond}
      cost={cost ? cost : 0}
      current={count.current}
      storage={count.capacity}
    />
  );
};

const ResourceMachine = ({machine}: {machine: Machine}) => {
  return (
    <ThemedView style={styles.machineCard}>
      <ThemedView>
        <ThemedText variant="heading">{machine.name}</ThemedText>
        <ThemedText variant="body">{machine.desc}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.valueContainer}>
        <ThemedView style={styles.valueBox}>
          <ThemedText variant="title">Cost:</ThemedText>
          {Object.keys(machine.cost).map((resourceCost) => (
            <Cost
              cost={machine.cost[resourceCost as ResourceType]}
              resourceType={resourceCost as ResourceType}
            />
          ))}
        </ThemedView>
        <ThemedView style={styles.valueBox}>
          <ThemedText variant="title">Input:</ThemedText>
          <ThemedText variant="title">Output:</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <ThemedButton onPress={() => {}}>Get 1</ThemedButton>
      </ThemedView>
    </ThemedView>
  );
};

export default ResourceMachine;
