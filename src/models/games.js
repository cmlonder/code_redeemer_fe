import Api from '../lib/api';
import HandleErrorMessage from '../lib/format-error-messages';
import initialState from '../store/games';
import Config from "../constants/config";
import {errorMessages} from "../constants/messages";

/**
 * Transform the endpoint data structure into our redux store format
 * @param {obj} item
 */
const transform = (item) => ({
  id: item.id,
  name: item.name,
  icon: Config.apiBaseUrl + item.icon.url,
  /**
   * TODO: how ?
   * */
  codes: item.codes,
});

export default {
  namespace: 'games',

  /**
   *  Initial state
   */
  state: initialState,

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
    /**
     * Get a list from the API
     * @param {obj} rootState
     * @returns {Promise}
     */
    async fetchList({ forceSync = false } = {}, rootState) {
      const { games = {} } = rootState;

      try {
        const response = await Api.get(`/games`);
        const { data, headers } = response;

        return !data || data.length < 1
          ? true
          : dispatch.games.replace({ data, headers });
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

    /**
     * Get a single item from the API
     * @param {number} id
     * @returns {Promise[obj]}
     */
    async fetchSingle(id) {
      try {
        const response = await Api.get(`/games/${id}`);
        const { data } = response;

        if (!data) {
          throw new Error({ message: errorMessages.game404 });
        }

        return transform(data);
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

  }),

  /**
   * Reducers
   */
  reducers: {
    /**
     * Replace list in store
     * @param {obj} state
     * @param {obj} payload
     */
    replace(state, payload) {
      let newList = null;
      const { data, headers } = payload;

      // Loop data array, saving items in a usable format
      if (data && typeof data === 'object') {
        newList = data.map((item) => transform(item));
      }

      // Create our paginated and flat lists
      const listFlat = Object.keys(newList).map((k) => newList[k]).flat() || [];

      return newList
        ? {
          ...state,
          listFlat,
        }
        : initialState;
    },
  },
};
