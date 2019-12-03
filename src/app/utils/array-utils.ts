export class ArrayUtils {
  public static join<T>(arrays: Array<Array<T>>): Array<T> {
    let res = [];

    arrays.forEach(array => array.forEach(value => res.push(value)));

    return res;
  }

  public static removeElByIndex<T>(oldArray: Array<T>, index: number): Array<T> {
    let newArray = [];

    for (let i = 0; i < oldArray.length; i++) {
      if (i !== index) {
        newArray.push(oldArray[i]);
      }
    }

    return newArray;
  }
}
