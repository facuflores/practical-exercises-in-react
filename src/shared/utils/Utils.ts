export default class Utils {
  static generateId(ids: Array<number>) {
    return (ids.length > 0) ? (Math.max(...ids) + 9999) : -1;
  };
};