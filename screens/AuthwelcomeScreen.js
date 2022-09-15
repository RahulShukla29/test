import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import {
  ButtonOutline,
  ButtonSolid,
  ScreenContainer,
  Swiper,
  SwiperItem,
  withTheme,
} from '@draftbit/ui';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const AuthwelcomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      <ImageBackground
        style={styles.ImageBackground1fa04bf0}
        resizeMode={'cover'}
        source={Images.SignInBackground}
      >
        <View style={styles.View877cfc45}>
          <Text style={[styles.Text7e9cb4f2, { color: theme.colors.strong }]}>
            {'StudyBot.io'}
          </Text>
        </View>

        <Swiper
          style={[
            styles.Swiper7028a4fd,
            { backgroundColor: theme.colors.background },
          ]}
          dotColor={theme.colors.light}
          dotsTouchable={true}
          dotActiveColor={theme.colors.success}
          loop={false}
        >
          <SwiperItem style={styles.SwiperItem8a80e4ed}>
            <Image
              style={styles.Image76c877e8}
              source={Images.SignIn1}
              resizeMode={'contain'}
            />
            <Text style={[styles.Text1e97ff26, { color: theme.colors.strong }]}>
              {'A better college experience'}
            </Text>

            <Text style={[styles.Texteba79bfc, { color: theme.colors.strong }]}>
              {
                'Succeed with personalized academic coaching guidance in 5 minutes a day'
              }
            </Text>
          </SwiperItem>

          <SwiperItem style={styles.SwiperItem8a80e4ed}>
            <Image
              style={styles.Image76c877e8}
              source={Images.SignIn2}
              resizeMode={'contain'}
            />
            <Text style={[styles.Text1e97ff26, { color: theme.colors.strong }]}>
              {'Engage'}
            </Text>

            <Text style={[styles.Texteba79bfc, { color: theme.colors.strong }]}>
              {'Get help managing your work by chatting with StudyBot'}
            </Text>
          </SwiperItem>

          <SwiperItem style={styles.SwiperItem87316047}>
            <Image
              style={styles.Image76c877e8}
              source={Images.SignIn3}
              resizeMode={'contain'}
            />
            <Text style={[styles.Text1e97ff26, { color: theme.colors.strong }]}>
              {'Develop'}
            </Text>

            <Text style={[styles.Texteba79bfc, { color: theme.colors.strong }]}>
              {
                'Improve your academic well-being through tailored advice based on scientific research'
              }
            </Text>
          </SwiperItem>

          <SwiperItem style={styles.SwiperItem87316047}>
            <Image
              style={styles.Image76c877e8}
              source={Images.SignIn4}
              resizeMode={'contain'}
            />
            <Text style={[styles.Text1e97ff26, { color: theme.colors.strong }]}>
              {'Grow'}
            </Text>

            <Text style={[styles.Texteba79bfc, { color: theme.colors.strong }]}>
              {'Learn and build from your successes by tracking your progress '}
            </Text>
          </SwiperItem>
        </Swiper>

        <View style={styles.View2d6d8dcf}>
          <ButtonSolid
            onPress={() => {
              try {
                navigation.navigate('AuthregistrationScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            style={[
              styles.ButtonSolidd630a281,
              {
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.primary,
              },
            ]}
            title={'Sign Up'}
          />
          <ButtonOutline
            onPress={() => {
              try {
                navigation.navigate('AuthloginScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            style={[
              styles.ButtonOutline2fc67ba6,
              {
                backgroundColor: theme.colors.white4,
                borderColor: theme.colors.primary,
                color: theme.colors.primary,
                textDecorationColor: theme.colors.secondary,
              },
            ]}
            title={'Log In'}
          />
        </View>
      </ImageBackground>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ButtonOutline2fc67ba6: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    marginTop: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  ButtonSolidd630a281: {
    borderRadius: 8,
    fontFamily: 'NotoSans_700Bold',
    fontSize: 15,
    textAlign: 'center',
  },
  Image76c877e8: {
    height: '60%',
    maxWidth: '100%',
  },
  ImageBackground1fa04bf0: {
    height: '100%',
    justifyContent: 'space-evenly',
    paddingLeft: 16,
    paddingRight: 16,
  },
  Swiper7028a4fd: {
    height: '60%',
  },
  SwiperItem87316047: {
    alignContent: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 24,
  },
  SwiperItem8a80e4ed: {
    alignContent: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 24,
  },
  Text1e97ff26: {
    alignSelf: 'center',
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 24,
    textAlign: 'center',
  },
  Text7e9cb4f2: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 36,
    textAlign: 'center',
  },
  Texteba79bfc: {
    alignSelf: 'center',
    fontFamily: 'NotoSans_400Regular',
    fontSize: 17,
    textAlign: 'center',
  },
  View2d6d8dcf: {
    marginBottom: 24,
  },
  View877cfc45: {
    marginTop: 24,
  },
});

export default withTheme(AuthwelcomeScreen);
