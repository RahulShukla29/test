import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { StyleSheet, Text } from 'react-native';

const HomeScreen = props => {
  const { theme } = props;

  return (
    <ScreenContainer
      style={styles.screen}
      hasSafeArea={false}
      scrollable={false}
    >
      <Text style={[styles.Textc551d69c, { color: theme.colors.strong }]}>
        {'Home'}
      </Text>

      <Text style={{ color: theme.colors.strong }}>
        {'param: '}
        {props.route?.params?.test ?? 'test'}
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Textc551d69c: {
    fontFamily: 'OpenSans_800ExtraBold',
    fontSize: 40,
  },
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(HomeScreen);
