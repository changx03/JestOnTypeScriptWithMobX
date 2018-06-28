import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import { MaxHeap, genRandomInt } from './bonController';
import styled from 'styled-components';

interface BestOfNViewProps {}

const Container = styled.div`
  button {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }

  button:hover {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
`;

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
    return this.nums
      .slice()
      .sort((a, b) => {
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }
      })
      .slice(0, this.bon);
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
      <Container>
        <button
          onClick={() => {
            this.nums.push(genRandomInt(this.min, this.max));
            this.result = null;
            this.maxHeap = new MaxHeap(this.nums.slice(0, this.bon));
          }}
          className="btn-add"
        >
          Push random int
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
        <h2>Result by max heap</h2>
        {this.result && <div className="result">{this.result}</div>}
        <br />
        <h2>Result by sorting</h2>
        <div>{this.sortedResult.join(', ')}</div>
      </Container>
    );
  }
}
