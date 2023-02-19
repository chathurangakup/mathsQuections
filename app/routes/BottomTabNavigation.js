import  React,{ useEffect, useRef }  from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import SubjectMain from '../screens/subjects/SubjectsMain';
import ProfileMain from '../screens/profile/ProfileMain';
import BattleMarks from '../screens/battleMarks/BattleMarks';

import Icon,{Icons} from '../components/Icons';
import {colors} from '../config/styles';


const Tab = createBottomTabNavigator();

const TabArr=[
  { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: SubjectMain },
  // { route: 'Levels', label: 'Battle Marks', type: Icons.Ionicons, icon: 'md-checkmark-done-circle', component: BattleMarks },
  { route: 'Profile', label: 'Profile', type: Icons.AntDesign, icon: 'setting', component: ProfileMain },
  // { route: 'Search', label: 'Search', type: Icons.MaterialCommunityIcons, activeIcon: 'timeline-plus', inActiveIcon: 'timeline-plus-outline', component: ColorScreen },
  // { route: 'Account', label: 'Account', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: ColorScreen },
]

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? colors.white : colors.primaryColor1} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

export const BottomTabs = () => {
  return (
    <Tab.Navigator
     // tabBar={(props) => <OffTripBottomTabContent {...props} onTrip={true} backBehavior='history'/>}
      initialRouteName="Home">
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
          
            options={{
              headerShown:false,
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: colors.white,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor1,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: colors.primaryColor1,
  }
})

