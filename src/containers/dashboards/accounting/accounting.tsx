import type { Component } from 'solid-js';
import './planning.css'
import ChartPlanning from './chart-accounting';
import { Icon } from '@iconify-icon/solid';

const Accounting: Component = () => {
  return (
    <div class="plan">
        <div class="box-1">
            <div class="component-1">
                <ChartPlanning/>
            </div>            
        </div>
    </div>
  );
};

export default Accounting;
