import {
  addShopifyPerformanceData,
  addShopifyPerformanceImport,
  addShopifyPerformanceInitialization,
} from "../withPerformance.android";
import { getFixture } from "./fixtures/getFixture";

describe("addShopifyPerformanceInitialization", () => {
  describe("MainApplication.kt", () => {
    const kotlinMainApplication = getFixture("MainApplication.kt");

    it("adds the Shopify Performance initialization and import to onCreate method", () => {
      const result = addShopifyPerformanceData(kotlinMainApplication, false);

      expect(result).toMatchSnapshot();
    });

    it("adds the Shopify Performance initialization to onCreate method", () => {
      const results = addShopifyPerformanceInitialization(
        kotlinMainApplication,
        false,
      );

      expect(results.contents).toMatch(
        "ReactNativePerformance.onAppStarted()\n",
      );
      // did add new content
      expect(results.didMerge).toBe(true);
      // didn't remove old content
      expect(results.didClear).toBe(false);
    });

    it("adds the Shopify Performance import", () => {
      const result = addShopifyPerformanceImport(kotlinMainApplication, false);

      expect(result).toMatch(
        "com.shopify.reactnativeperformance.ReactNativePerformance",
      );
    });
  });

  describe("MainApplication.java", () => {
    const javaMainApplication = getFixture("MainApplication.java");

    it("adds the Shopify Performance initialization and import to onCreate method", () => {
      const result = addShopifyPerformanceData(javaMainApplication, true);

      expect(result).toMatchSnapshot();
    });

    it("adds the initialization to onCreate method", () => {
      const results = addShopifyPerformanceInitialization(
        javaMainApplication,
        true,
      );

      expect(results.contents).toMatch(
        "ReactNativePerformance.onAppStarted();\n",
      );
      // did add new content
      expect(results.didMerge).toBe(true);
      // didn't remove old content
      expect(results.didClear).toBe(false);
    });

    it("adds the Shopify Performance import", () => {
      const result = addShopifyPerformanceImport(javaMainApplication, true);

      expect(result).toMatch(
        "com.shopify.reactnativeperformance.ReactNativePerformance",
      );
    });
  });
});
