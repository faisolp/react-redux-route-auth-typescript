import {
    NavigateFunction,
      Params,
  } from "react-router-dom";

  
import type { Path , Key} from "history";

export interface Location<T=any> extends Path {
  /**
   * A value of arbitrary data associated with this location.
   *
   * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#location.state
   */
  state: T;
  /**
   * A unique string associated with this location. May be used to safely store
   * and retrieve data in some other storage API, like `localStorage`.
   *
   * Note: This value is always "default" on the initial location.
   *
   * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#location.key
   */
  key: Key;
}
  
export interface INavigation<T=any>{
    navigate:NavigateFunction
    location:Location<T>
    params: Readonly<Params<string>>
  }