import React from 'react';
import Images from '../config/Images';
import * as CustomButton from '../custom-files/CustomButton.js';
import * as Utils from '../utils';
import { ButtonSolid, ScreenContainer, withTheme } from '@draftbit/ui';
import { Image, StyleSheet, View } from 'react-native';

const BlankScreen = props => {
  const { theme } = props;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View style={styles.View3ea2d9b8}>
        <Utils.CustomCodeErrorBoundary>
          <CustomButton.ButtonLike>
            <ButtonSolid
              style={[
                styles.ButtonSolidb2c8d410,
                { backgroundColor: theme.colors.primary },
              ]}
              title={'Get Started'}
            />
          </CustomButton.ButtonLike>
        </Utils.CustomCodeErrorBoundary>
      </View>

      <View style={styles.View3ea2d9b8}>
        <Utils.CustomCodeErrorBoundary>
          <CustomButton.ButtonLike>
            <Image style={styles.Imagee65b0c4c} source={Images.Icon} />
          </CustomButton.ButtonLike>
        </Utils.CustomCodeErrorBoundary>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonSolidb2c8d410: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    width: 200,
  },
  Imagee65b0c4c: {
    height: 250,
    width: 250,
  },
  View3ea2d9b8: {
    alignItems: 'center',
    flex: 1,
  },
});

export default withTheme(BlankScreen);
