"use strict";
import * as React from 'react';
const Tabs = require('antd/lib/tabs');
const Icon = require('antd/lib/icon');
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const TabPane = Tabs.TabPane;
import { ShowList } from './Show/ShowList';
import { VisTree } from './Show/VisTree';
import {App} from './Class/app';
import {BnfList} from './Class/bnfList';
import {GotoMap} from './Class/gotoMap';
import {Vmap} from './Class/vmap';
import {ParserShow} from './Show/ParserShow';
import {LexShow} from './Show/LexShow';
const fs = require("fs");
var brace  = require('brace');
var AceEditor  = require('react-ace');
require('brace/mode/c_cpp')

export class ShowPage extends React.Component<any, any> {
    private data: App;
    private bnf_list: BnfList;
    private goto_map: GotoMap;
    private vmap: Vmap;


    constructor(props) {
        super(props)
        this.data = this.props.data
        this.data.loadJson()
        this.bnf_list = this.data.loader.bnf_list
        this.goto_map = this.data.loader.goto_map
        this.vmap = this.data.loader.vmap
    }

    private tabContent = [
      <span><Icon type="tag-o" />词法分析状态</span>,
      <span><Icon type="tag-o" />语法分析状态</span>,
      <span><Icon type="tag-o" />语法树构建</span>,
      <span><Icon type="line-chart" />Goto表</span>,
      <span><Icon type="line-chart" />符号id映射表</span>,
      <span><Icon type="code" />生成LLVM-IR</span>,
    ];

    render() {
        return <div className='show-page-ctx'>
                <h1>过程展示</h1>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={this.tabContent[0]} key="1"><Row>
                        <LexShow data={this.data} />
                    </Row></TabPane>
                    <TabPane tab={this.tabContent[1]} key="2">
                        <ParserShow data={this.data} bnf_list={this.bnf_list} />
                    </TabPane>
                    <TabPane tab={this.tabContent[2]} key="3"><Row>
                        <Col span="18"><VisTree /></Col>
                        <Col span="6" style={{padding: '10px 15px'}}>
                            <ShowList />
                        </Col>
                    </Row></TabPane>
                    <TabPane tab={this.tabContent[3]} key="4">
                        {this.goto_map.render()}
                    </TabPane>
                    <TabPane tab={this.tabContent[4]} key="5">
                        {this.vmap.render()}
                    </TabPane>
                    <TabPane tab={this.tabContent[5]} key="6">
                        <AceEditor
                           width="100%"
                           height="600px"
                           mode="c_cpp"
                           theme="monokai"
                           name="show-LLVM-IR"
                           value={this.data.llvmIRdata}
                           fontSize={18}
                           editorProps={{$blockScrolling: true}}
                         />
                     </TabPane>
                </Tabs>
            </div>
    }
}
