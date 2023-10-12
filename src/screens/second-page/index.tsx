import {Text, View} from "react-native";
import {Props} from "../../typings/router";


export default function SecondPage ({ route }: Props<'SecondPage'>) {
  return <View>
    <Text>Second Page {route.params.id}</Text>
  </View>
}
