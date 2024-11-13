import { ConfigPlugin } from "@expo/config-plugins";

import { withAndroidMainApplicationSetup } from "./withPerformance.android";
import { withIOSAppDelegateSetup } from "./withPerformance.ios";

const withShopifyPerformance: ConfigPlugin<{ name?: string }> = (
  config,
  { name = "shopify-react-native-performance-expo-plugin" } = {},
) => {
  config = withAndroidMainApplicationSetup(config);
  config = withIOSAppDelegateSetup(config);
  config.name = name;

  return config;
};

export default withShopifyPerformance;
