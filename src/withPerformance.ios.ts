import { ConfigPlugin, withAppDelegate } from "@expo/config-plugins";
import {
  mergeContents,
  MergeResults,
} from "@expo/config-plugins/build/utils/generateCode";

export const MATCH_DID_FINISH_LAUNCHING_IOS =
  /-\s*\(BOOL\)\s*application:\s*\(UIApplication\s*\*\s*\)\s*\w+\s+didFinishLaunchingWithOptions:/g;

const INITIALIZATION = "  [ReactNativePerformance onAppStarted];\n";
const IMPORT_STATEMENT =
  "#import <ReactNativePerformance/ReactNativePerformance.h>";

export const withIOSAppDelegateSetup: ConfigPlugin = (expoConfig) => {
  return withAppDelegate(expoConfig, (iosConfig) => {
    checkAppDelegateIsObjectiveC(iosConfig.modResults.language);

    const newContents = addShopifyPerformanceData(
      iosConfig.modResults.contents,
    );
    iosConfig.modResults.contents = newContents;

    return iosConfig;
  });
};

export const addShopifyPerformanceImport = (src: string): MergeResults => {
  return mergeContents({
    tag: "react-native-performance-import-ios",
    src,
    newSrc: IMPORT_STATEMENT,
    offset: 0,
    comment: "//",
    anchor: "",
  });
};

export const addShopifyPerformanceInitialization = (
  src: string,
): MergeResults => {
  return mergeContents({
    tag: "react-native-performance-didFinishLaunchingWithOptions-ios",
    src,
    newSrc: INITIALIZATION,
    offset: 2,
    comment: "//",
    anchor: MATCH_DID_FINISH_LAUNCHING_IOS,
  });
};

export const checkAppDelegateIsObjectiveC = (language: string): void => {
  if (!["objc", "objcpp"].includes(language)) {
    throw new Error(
      "shopify-react-native-performance-expo-plugin config plugin does not support AppDelegate' that aren't Objective-C(++) yet.",
    );
  }
};

export const addShopifyPerformanceData = (src: string): string => {
  const srcWithNewImport = addShopifyPerformanceImport(src).contents;

  return addShopifyPerformanceInitialization(srcWithNewImport).contents;
};
