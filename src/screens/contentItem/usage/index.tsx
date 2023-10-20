import {Text, View} from "react-native";
import tailwind from "twrnc";
import {posts} from "../../../config/data/posts";
import {LockOutlined} from "../../../components/icons/LockOutlined";
import {ArticleOutlined} from "../../../components/icons/ArticleOutlined";


export function ContentUsage () {
  return (
    <View>
      <Text style={tailwind`text-sm mb-4 font-bold`}>Usage</Text>
      {
        posts.map(item => (
          <View style={tailwind`mb-2 rounded pb-3 border-b border-gray-100`}>
            <View style={tailwind`flex-row items-center mb-1`}>
              <Text style={tailwind`font-medium text-xs text-gray-700`}>{item.company.name}</Text>
              <Text style={tailwind`text-xs text-gray-500 ml-auto`}>2h ago</Text>
            </View>
            <View style={tailwind`flex-row items-center`}>
              <View style={tailwind`w-7 h-7 rounded flex-row items-center justify-center bg-orange-100 mr-3`}>
                <ArticleOutlined width={15} height={15} style={tailwind`text-orange-700`} />
              </View>
              <View style={tailwind`w-full flex-1`}>
                <Text style={tailwind`font-bold text-gray-800 text-xs`}>By {item.company.name}</Text>
                <View style={tailwind`flex-row flex-wrap`}>
                  <Text style={tailwind`text-xs font-medium mr-2 text-gray-700`}>
                    {item.title} -
                  </Text>
                  <Text style={tailwind`text-xs text-gray-700`}>
                    {item.content?.substring(0, 50) + '..'}
                  </Text>

                </View>
              </View>
            </View>

          </View>
        ))
      }
    </View>
  )
}
