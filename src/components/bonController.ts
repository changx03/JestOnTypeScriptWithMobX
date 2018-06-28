export class MaxHeap {
  private _h: number[];

  constructor(arr?: number[]) {
    this._h = new Array(1);
    if (arr && arr.length) {
      arr.forEach(v => { this.insert(v); });
    }
  }

  insert = (val: number) => {
    this._h.push(val);
    this._bubbleUp(this._h.length - 1);
  }

  /**
   * Replacing the root value with @val, and then rearrange the heap.
   */
  replace = (val: number) => {
    let p = 1;
    this._h[p] = val;
    let l = this._leftIdx(p);
    let r = this._rightIdx(p);
    while (this._h[l] > this._h[p] || this._h[r] > this._h[p]) {
      if (this._h[l] > this._h[r] || typeof this._h[r] === 'undefined') {
        this._swap(l, p);
        p = l;
      } else {
        this._swap(r, p);
        p = r;
      }
      l = this._leftIdx(p);
      r = this._rightIdx(p);
    }
  }

  get list(): number[] {
    return this._h.slice(1);
  }

  get root() {
    return this._h[1];
  }

  private _swap = (a: number, b: number) => {
    const t = this._h[a];
    this._h[a] = this._h[b];
    this._h[b] = t;
  }

  private _leftIdx(p: number): number {
    return 2 * p;
  }

  private _rightIdx(p: number): number {
    return 2 * p + 1;
  }

  private _parentIdx(c: number): number {
    const p = Math.floor(c / 2);
    return p < 1 ? 1 : p;
  }

  private _bubbleUp = (i: number) => {
    let c = i;
    let p = this._parentIdx(i);
    while (c !== p && this._h[c] > this._h[p]) {
      this._swap(c, p);
      c = p;
      p = this._parentIdx(c);
    }
  }
}

export function genRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * Math.floor(max) + min);
}
