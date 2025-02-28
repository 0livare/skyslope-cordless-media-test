declare global {
  interface Window {
    cmWrapper: CMWrapper | undefined
  }
}

/**
 * `cmWrapper`, the CordlessMedia object, which is a global object that is
 * used to interact with the CordlessMedia ad server.
 *
 * @see @see https://cdn.cordlessmedia.com/documentation/index.html#display.md */
export type CMWrapper = {
  ads: {
    /**
     * This define function should be used if your page supports infinite scrolling.
     * Please consult with us if that is the case. Constructs ad slot for the unit with the
     * provided name. The ID is the ID of the element used to contain the ad unit on the page.
     * Targeting array and the callback are optional parameters. If the targeting array is provided,
     * unit based targeting will be set for this unit. The callback will provide the slot defined by
     * GPT as well as the name of the unit.
     * ```js
     * cmWrapper.ads.define("atf_banner_1", "div-gpt-ad-01", [["key1", "value1"], ["key2", "value2"], ["key3", "value3"]], callback);
     * ```
     * @param {string} name The name of the ad unit being defined.
     * @param {string} id  The id of the container element on page where the unit will be rendered.
     * @param {string[]} targeting An array of key/value pairs for unit specific targeting
     * @param {Function} callbackFn A callback function which will provide the name of the unit defined and the GPT slot.
     */
    define(
      name: string,
      id: string,
      targeting?: Array<[string, string]>,
      callbackFn?: (data: unknown) => void,
    ): void

    /**
     * Constructs ad slot for the ID and associates targeting pairs with the unit. Targeting array
     * is an optional parameter and if provided will set key/value targeting for this unit.
     * ```js
     * cmWrapper.ads.defineUnit("div-gpt-ad-0000000000000-1", [["key1", "value1"], ["key2", "value2"], ["key3", "value3"]]);
     * ```
     * @param {string} id The ID of the ad unit being defined.
     * @param {string[]} targeting An array of key/value pairs for unit specific targeting
     */
    defineUnit(id: string, targeting?: Array<[TargetingKey, string]>): void

    /**
     * Constructs ad slots for the previously defined IDs, associates slots with the corresponding
     * div element on the page, and renders the unit. Global targeting array and callback are
     * optional parameters. If globalTargeting is provided the key/values will be set as global
     * key/value targeting. If a unit fails to render the callback is executed.
     * ```js
     * cmWrapper.ads.requestUnits([["key1", "value1"], ["key2", "value2"], ["key3", "value3"]], callback);
     * ```
     * @param {string[]} globalTargeting An array of key/value pairs for global targeting
     * @param {Function} callback Called when an ad unit renders.
     */
    requestUnits(
      globalTargeting?: Array<[TargetingKey, string]>,
      callback?: (data: {
        id: string
        message: string
        rendered: boolean
      }) => void,
    ): void

    /**
     * Fetches and displays new ads for the IDs provided. If no IDs are provided then all units will be refreshed.
     * ```js
     * cmWrapper.ads.refreshUnits(["div-gpt-ad-0000000000000-1", "div-gpt-ad-0000000000000-1", "div-gpt-ad-0000000000000-1"]);
     * ```
     * @param {string[]} ids An array of ad unit IDs
     */
    refreshUnits(ids: string[]): void

    /**
     * Destroys the units for the given IDs, removing all objects related with managing this unit
     * aside from the div element which contains the unit. If no IDs are provided then all units
     * on the page will be destroyed.
     * @param {string[]} ids An array of ad unit IDs
     */
    destroyUnits(ids: string[]): void
  }

  /**
   * Reference to the global command queue for asynchronous execution of CordlessMedia-related calls.
   * This mechanism allows CordlessMedia to reduce latency by fetching the JS asynchronously while
   * allowing the browser to continue rendering the page.
   * ```js
   * cmWrapper.que.push(function() {
   *   cmWrapper.ads.requestUnits();
   * });
   * ```
   */
  que: Array<() => void> | undefined
}

type TargetingKey =
  | 'propertyType'
  | 'listPrice'
  | 'address'
  | 'apt'
  | 'city'
  | 'state'
  | 'zip'
