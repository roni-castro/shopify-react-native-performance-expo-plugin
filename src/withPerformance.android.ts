import { ProjectFile } from "@expo/config-plugins/build/android/Paths";
import { addImports } from "@expo/config-plugins/build/android/codeMod";
import {
  mergeContents,
  MergeResults,
} from "@expo/config-plugins/build/utils/generateCode";
import { ConfigPlugin, withMainApplication } from "expo/config-plugins";

const INITIALIZATION = "  	ReactNativePerformance.onAppStarted()";
const IMPORT_STATEMENT =
  "com.shopify.reactnativeperformance.ReactNativePerformance";
export const MATCH_ON_CREATE = /super\.onCreate\(\);?/;

export const withAndroidMainApplicationSetup: ConfigPlugin = (expoConfig) => {
  return withMainApplication(expoConfig, (androidConfig) => {
    const isJava = isJavaExtension(androidConfig.modResults.language);

    const newContents = addShopifyPerformanceData(
      androidConfig.modResults.contents,
      isJava,
    );
    androidConfig.modResults.contents = newContents;

    return androidConfig;
  });
};

export const isJavaExtension = (language: ProjectFile["language"]): boolean => {
  return language === "java";
};

export const addShopifyPerformanceImport = (
  src: string,
  isJava: boolean,
): string => {
  const srcWithNewImport = addImports(src, [IMPORT_STATEMENT], isJava);
  return srcWithNewImport;
};

export const addShopifyPerformanceInitialization = (
  src: string,
  isJava: boolean,
): MergeResults => {
  const newLine = `${INITIALIZATION}${isJava ? ";" : ""}\n`;
  return mergeContents({
    tag: "react-native-performance-onCreate-android",
    src,
    newSrc: newLine,
    anchor: MATCH_ON_CREATE,
    offset: 0,
    comment: "//",
  });
};

export const addShopifyPerformanceData = (
  src: string,
  isJava: boolean,
): string => {
  const srcWithNewImport = addShopifyPerformanceImport(src, isJava);
  return addShopifyPerformanceInitialization(srcWithNewImport, isJava).contents;
};
