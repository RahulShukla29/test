import * as React from 'react';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/DraftbitTheme.js';
import LinkingConfiguration from './LinkingConfiguration.js';

import AuthloginScreen from './screens/AuthloginScreen';
import AuthpasswordupdateScreen from './screens/AuthpasswordupdateScreen';
import AuthregistrationScreen from './screens/AuthregistrationScreen';
import AuthwelcomeScreen from './screens/AuthwelcomeScreen';
import ChathomeScreen from './screens/ChathomeScreen';
import JourneyhomeScreen from './screens/JourneyhomeScreen';
import LaunchScreen from './screens/LaunchScreen';
import LearndetailsScreen from './screens/LearndetailsScreen';
import LearnhomeScreen from './screens/LearnhomeScreen';
import MainactionScreen from './screens/MainactionScreen';
import MainhomeScreen from './screens/MainhomeScreen';
import MainsupportScreen from './screens/MainsupportScreen';
import MainsupportdetailsScreen from './screens/MainsupportdetailsScreen';
import SettingshomeScreen from './screens/SettingshomeScreen';
import SocialhomeScreen from './screens/SocialhomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Placeholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#131A2A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#FFF',
        }}
      >
        Missing Screen
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        This screen is not in a navigator.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        Go to Navigation mode, and click the + (plus) icon in the Navigator tab
        on the left side to add this screen to a Navigator.
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 16, color: '#FFF' }}>
        If the screen is in a Tab Navigator, make sure the screen is assigned to
        a tab in the Config panel on the right.
      </Text>
    </View>
  );
}
function LearnNavigator() {
  return (
    <Stack.Navigator initialRouteName="LearnhomeScreen">
      <Stack.Screen
        name="LearnhomeScreen"
        component={LearnhomeScreen}
        options={{
          headerShown: false,
          headerTitle: 'Lesson',
          title: 'Learn - home',
        }}
      />
      <Stack.Screen
        name="LearndetailsScreen"
        component={LearndetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.white1,
          },
          headerTitle: '  ',
          headerTitleAlign: 'left',
          headerTransparent: false,
          headerBackTitle: 'Back',
          title: 'Learn - details',
        }}
      />
    </Stack.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainhomeScreen">
      <Stack.Screen
        name="MainhomeScreen"
        component={MainhomeScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
          title: 'Main - home',
        }}
      />
      <Stack.Screen
        name="MainsupportScreen"
        component={MainsupportScreen}
        options={{
          headerTitle: ' ',
          headerBackTitle: 'Home',
          title: 'Main - support',
        }}
      />
      <Stack.Screen
        name="MainsupportdetailsScreen"
        component={MainsupportdetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.white1,
          },
          headerTitle: ' ',
          headerBackTitle: 'Support',
          title: 'Main - support details',
        }}
      />
      <Stack.Screen
        name="SettingshomeScreen"
        component={SettingshomeScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.light,
          },
          cardStyle: {
            backgroundColor: theme.colors.light,
          },
          headerTitle: ' ',
          headerTransparent: true,
          animationEnabled: true,
          headerBackTitle: 'Home',
          title: 'Settings - home',
        }}
      />
      <Stack.Screen
        name="MainactionScreen"
        component={MainactionScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.white1,
          },
          headerTitle: ' ',
          headerBackTitle: 'Home',
          title: 'Main - action',
        }}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="MainNavigator"
      tabBarOptions={{
        showLabel: true,
        keyboardHidesTabBar: true,
        labelPosition: 'below-icon',
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.mediumLight,
        style: {
          backgroundColor: theme.colors.light,
          borderTopColor: theme.colors.divider,
        },
      }}
      backBehavior="none"
    >
      <Tab.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Ionicons/home-outline"
              size={25}
              color={focused ? theme.colors.primary : theme.colors.mediumLight}
            />
          ),
          tabBarLabel: 'Home',
          title: 'Main Navigator',
        }}
      />
      <Tab.Screen
        name="ChathomeScreen"
        component={ChathomeScreen}
        options={{
          tabBarVisible: true,
          title: 'Chat - home',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Ionicons/chatbox-outline"
              size={25}
              color={focused ? theme.colors.primary : theme.colors.mediumLight}
            />
          ),
          tabBarLabel: 'Chat',
        }}
      />
      <Tab.Screen
        name="JourneyhomeScreen"
        component={JourneyhomeScreen}
        options={{
          title: 'Journey - home',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialCommunityIcons/chart-line"
              size={25}
              color={focused ? theme.colors.primary : theme.colors.mediumLight}
            />
          ),
          tabBarLabel: 'Journey',
        }}
      />
      <Tab.Screen
        name="LearnNavigator"
        component={LearnNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialIcons/library-books"
              size={25}
              color={focused ? theme.colors.primary : theme.colors.mediumLight}
            />
          ),
          tabBarLabel: 'Learn',
          title: 'Learn Navigator',
        }}
      />
      <Tab.Screen
        name="SocialhomeScreen"
        component={SocialhomeScreen}
        options={{
          title: 'Social - home',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Ionicons/people-outline"
              size={25}
              color={focused ? theme.colors.primary : theme.colors.mediumLight}
            />
          ),
          tabBarLabel: 'Social',
        }}
      />
    </Tab.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="AuthwelcomeScreen">
      <Stack.Screen
        name="AuthloginScreen"
        component={AuthloginScreen}
        options={{
          headerTitle: ' ',
          headerTransparent: true,
          headerBackTitle: 'Back',
          title: 'Auth - login',
        }}
      />
      <Stack.Screen
        name="AuthregistrationScreen"
        component={AuthregistrationScreen}
        options={{
          headerTitle: ' ',
          headerTransparent: true,
          headerBackTitle: 'Back',
          title: 'Auth - registration',
        }}
      />
      <Stack.Screen
        name="AuthwelcomeScreen"
        component={AuthwelcomeScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          title: 'Auth - welcome',
        }}
      />
      <Stack.Screen
        name="AuthpasswordupdateScreen"
        component={AuthpasswordupdateScreen}
        options={{
          headerTitle: ' ',
          headerTransparent: true,
          headerBackTitle: 'Back',
          title: 'Auth - password update',
        }}
      />
    </Stack.Navigator>
  );
}

export default function RootAppNavigator() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="LaunchScreen"
        screenOptions={{
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitle: 'StudyBot',
        }}
      >
        <Stack.Screen
          name="LaunchScreen"
          component={LaunchScreen}
          options={{
            cardStyle: {
              backgroundColor: theme.colors.primary,
            },
            title: 'Launch',
          }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({
    ios: {
      marginRight: 6,
    },
  }),
  headerIconRight: Platform.select({
    ios: {
      marginLeft: 6,
    },
  }),
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({
    ios: {
      marginLeft: 8,
    },
  }),
  headerContainerRight: Platform.select({
    ios: {
      marginRight: 8,
    },
  }),
  headerLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerLabel: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
});
