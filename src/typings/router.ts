import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  CreatePost: undefined;
  Profile: undefined;
  Post: { id: string };
};

export type Props<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

type CreateRoutePropsParamList = {
  SelectContent: undefined;
  UploadContent: undefined;
};

export type CreateRouteProps<T extends keyof CreateRoutePropsParamList> = NativeStackScreenProps<CreateRoutePropsParamList, T>;
