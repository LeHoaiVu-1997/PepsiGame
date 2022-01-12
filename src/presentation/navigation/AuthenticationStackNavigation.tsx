import React from 'react';
import TermOfService from '../screens/authentication/terms/term.view';
import SignIn from '../screens/authentication/sign-in/signIn.view';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../screens/authentication/sign-up/signUp.view';

const Stack = createStackNavigator();

export const AuthenticationNavigatior: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign in" component={SignIn} />
      <Stack.Screen name="Sign up" component={SignUp} />
      <Stack.Screen name="Term of Service" component={TermOfService} />
    </Stack.Navigator>
  );
};
