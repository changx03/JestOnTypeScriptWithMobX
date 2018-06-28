import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import { MaxHeap, genRandomInt } from './bonController';

interface BestOfNViewProps {}

@observer
export default class BestOfNView extends React.Component<BestOfNViewProps, {}> {
  maxHeap: MaxHeap;
  min: number;
  max: number;
  bon = 4;
  @observable nums: number[];
  @observable result: string | null;

  @computed
  get sortedResult(): number[] {
    // sort will not update observable array inplace
    return this.nums.slice().sort((a, b) => {
      if (a > b) { return 1; 
      } else if (a < b) { 
        return -1; 
      } else { return 0; }
    }).slice(0, this.bon);
  }

  constructor(props: BestOfNViewProps) {
    super(props);

    this.min = 0;
    this.max = 1000;
    this.nums = [];
    for (let i = 0; i < 10; i++) {
      this.nums.push(genRandomInt(this.min, this.max));
    }
    this.maxHeap = new MaxHeap(this.nums.slice(0, this.bon));
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.nums.push(genRandomInt(this.min, this.max));
            this.result = null;
            this.maxHeap = new MaxHeap(this.nums.slice(0, this.bon));
          }}
          className="btn-add"
        >
          Add
        </button>
        <ul>
          {this.nums.map((v, i) => (
            <li key={i} className="list-item">
              {v}
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            this.nums.slice(this.bon).forEach(i => {
              if (i < this.maxHeap.root) {
                this.maxHeap.replace(i);
              }
            });
            this.result = this.maxHeap.list.join(', ');
          }}
          disabled={!!this.result}
          className="btn-find"
        >
          {`Find ${this.bon} samllest numbers`}
        </button>
        {this.result && <div className="result">{this.result}</div>}
        <h2>Result by sorting</h2>
        <ul>{this.sortedResult.map(i => <li key={'sortLi' + i}>{i}</li>)}</ul>
      </div>
    );
  }
}
