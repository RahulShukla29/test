import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';

const TestScreen = props => {
  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      console.log(props.route?.params?.para ?? '');
      console.log(props.route?.params?.meter ?? '');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      <Text style={{ color: theme.colors.strong }}>{'test screen'}</Text>

      <Text style={{ color: theme.colors.strong }}>
        {props.route?.params?.para ?? ''} {props.route?.params?.meter ?? ''}
      </Text>
    </ScreenContainer>
  );
};

export default withTheme(TestScreen);
