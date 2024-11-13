import {
  addShopifyPerformanceData,
  addShopifyPerformanceImport,
  addShopifyPerformanceInitialization,
  checkAppDelegateIsObjectiveC,
  MATCH_DID_FINISH_LAUNCHING_IOS,
} from "../withPerformance.ios";
import { getFixture } from "./fixtures/getFixture";

describe("MATCH_DID_FINISH_LAUNCHING_IOS", () => {
  it(`matches React AppDelegate`, () => {
    expect(
      `- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions`,
    ).toMatch(MATCH_DID_FINISH_LAUNCHING_IOS);
  });
});

describe("withIOSAppDelegateSetup", () => {
  it(`adds Shopify Performance import and initialization to AppDelegate`, () => {
    const result = addShopifyPerformanceData(getFixture("AppDelegate.mm"));
    expect(result).toMatchSnapshot();
  });

  it(`adds Shopify Performance import to AppDelegate`, () => {
    const results = addShopifyPerformanceImport(getFixture("AppDelegate.mm"));
    expect(results.contents).toMatch(
      "#import <ReactNativePerformance/ReactNativePerformance.h>",
    );
    // did add new content
    expect(results.didMerge).toBe(true);
    // didn't remove old content
    expect(results.didClear).toBe(false);
  });

  it(`adds Shopify Performance initialization to AppDelegate`, () => {
    const results = addShopifyPerformanceInitialization(
      getFixture("AppDelegate.mm"),
    );
    expect(results.contents).toMatch(
      "[ReactNativePerformance onAppStarted];\n",
    );
    // did add new content
    expect(results.didMerge).toBe(true);
    // didn't remove old content
    expect(results.didClear).toBe(false);
  });

  it(`fails to add to a malformed app delegate`, () => {
    expect(() =>
      checkAppDelegateIsObjectiveC(`swift`),
    ).toThrowErrorMatchingInlineSnapshot(
      `"shopify-react-native-performance-expo-plugin config plugin does not support AppDelegate' that aren't Objective-C(++) yet."`,
    );
  });
});
