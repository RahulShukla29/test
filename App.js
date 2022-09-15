import * as React from 'react';
import { AppState } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider as ThemeProvider } from '@draftbit/ui';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppNavigator from './AppNavigator';
import DraftbitTheme from './themes/DraftbitTheme.js';
import cacheAssetsAsync from './config/cacheAssetsAsync';
import { GlobalVariableProvider } from './config/GlobalVariableContext';
import { useFonts } from 'expo-font';
import {
  NotoSans_400Regular,
  NotoSans_400Regular_Italic,
  NotoSans_700Bold,
} from '@expo-google-fonts/noto-sans';
import {
  NotoSerif_400Regular,
  NotoSerif_700Bold,
} from '@expo-google-fonts/noto-serif';
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const queryClient = new QueryClient();

const App = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular,
    NotoSans_400Regular_Italic,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSans_700Bold,
    NotoSerif_400Regular,
    NotoSerif_400Regular,
    NotoSerif_400Regular,
    NotoSerif_400Regular,
    NotoSerif_400Regular,
    NotoSerif_400Regular,
    NotoSerif_400Regular,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
    NotoSerif_700Bold,
    NotoSerif_700Bold,
    NotoSerif_700Bold,
    NotoSerif_700Bold,
    NotoSerif_700Bold,
    NotoSerif_700Bold,
    NotoSerif_700Bold,
    NotoSerif_700Bold,
    NotoSerif_700Bold,
    NotoSerif_700Bold,
    NotoSerif_700Bold,
  });

  React.useEffect(() => {
    async function prepare() {
      try {
        await cacheAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (isReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded]);

  if (!isReady || !fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={DraftbitTheme}>
            <AppNavigator />
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalVariableProvider>
    </SafeAreaProvider>
  );
};

export default App;
