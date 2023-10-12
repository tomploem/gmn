import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  SecondPage: { id: string };
};

export type Props<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
