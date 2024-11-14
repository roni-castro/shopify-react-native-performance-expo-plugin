import { ConfigPlugin, createRunOncePlugin } from "@expo/config-plugins";

import { withAndroidMainApplicationSetup } from "./withPerformance.android";
import { withIOSAppDelegateSetup } from "./withPerformance.ios";

const withShopifyPerformance: ConfigPlugin<{ name?: string }> = (
  config,
  _props,
) => {
  config = withAndroidMainApplicationSetup(config);
  config = withIOSAppDelegateSetup(config);

  return config;
};

export default createRunOncePlugin(
  withShopifyPerformance,
  "shopify-react-native-performance-expo-plugin",
);
