import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { StyleSheet, Text } from 'react-native';

const LinkScreen = props => {
  const { theme } = props;

  return (
    <ScreenContainer
      style={styles.screen}
      hasSafeArea={false}
      scrollable={false}
    >
      {/* Linked Message */}
      <Text style={[styles.Text618c5411, { color: theme.colors.strong }]}>
        {'Linked here with param - '}
        {props.route?.params?.test ?? 'Default Value'}
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Text618c5411: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 16,
  },
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(LinkScreen);
