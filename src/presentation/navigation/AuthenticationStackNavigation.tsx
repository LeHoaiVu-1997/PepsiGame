import React from 'react';
import TermOfService from '../screens/authentication/terms/term.view';
import SignIn from '../screens/authentication/sign-in/signIn.view';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../screens/authentication/sign-up/signUp.view';
import VerifyOtp from '../screens/authentication/otp/otpVerification.view';
import MainScreen from '../screens/authorized/mainscreen/main-screen';
import Game from '../screens/authorized/game/game';
import Congratulation from '../screens/authorized/congratulation/congratulation';

const Stack = createStackNavigator();

export const AuthenticationNavigatior: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign in" component={SignIn} />
      <Stack.Screen name="Sign up" component={SignUp} />
      <Stack.Screen name="Term of Service" component={TermOfService} />
      <Stack.Screen name="VerifyOTP" component={VerifyOtp} />
      <Stack.Screen name="Main screen" component={MainScreen} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="Congratulation" component={Congratulation} />
    </Stack.Navigator>
  );
};
