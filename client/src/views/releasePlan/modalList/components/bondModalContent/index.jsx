import React from 'react'
//style
import style from './index.module.less'
//components
import { UInput } from '@/components/Unity'
import { DatePicker } from 'ss-ui-library';
import SSelect from '@/components/Select'
import { Form } from 'antd'
import TimeInput from '@/common/TimeInput'


const BondModalContent = (props) => {
    const { form } = props;
    const { getFieldDecorator } = form;
    const { Option } = SSelect;
    // 提交表格
    const handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault();
        // 对所有表单字段进行检验
        form.validateFields((err, values) => {
            // 检验成功
            if (!err) {

            } else {
                console.log("检验失败!");
            }
        });
    };
    //current page render content write in this page
    const configList = [
        {
            title: ['债券全称'],
            isSplit: false,// single column
            isRequired: [true],
            children: [getFieldDecorator("data0", {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        message: "请输入债券全称",
                    },
                ],
                initialValue: "admin", // 初始值
            })(
                <UInput />
            )]
        },
        {
            title: ['债券简称'],
            isSplit: false,// single column
            isRequired: [false],
            children: [getFieldDecorator("data2", {
                initialValue: "ad", // 初始值
            })(
                <UInput />
            )]
        },
        {
            title: ['债券代码', '债券类型'],
            isSplit: true,// double column
            isRequired: [false, false],
            children: [
                getFieldDecorator("data3", {
                    initialValue: "code", // 初始值
                })(
                    <UInput />
                ),
                getFieldDecorator("data4", {
                    initialValue: "jack", // 初始值
                })(
                    <SSelect style={{ width: '100%', height: '24px' }} placeholder="请选择"
                        optionFilterProp="children">
                        <Option value="jack">张三</Option>
                        <Option value="lucy">李四</Option>
                        <Option value="tom">罗翔</Option>
                    </SSelect>
                )
            ]
        },
        {
            title: ['发行日', '缴款日'],
            isSplit: true,// double column
            isRequired: [false, false],
            children: [
                getFieldDecorator("data5", {
                })(
                    <DatePicker picker="range" style={{ width: '100%' }} />
                ),
                getFieldDecorator("data6", {
                })(
                    <DatePicker picker="range" style={{ width: '100%' }} />
                )
            ]
        },
        {
            title: ['截标时间', '上市日'],
            isSplit: true,// double column
            isRequired: [false, false],
            children: [
                getFieldDecorator("data7", {
                    initialValue: [1, 2]
                })(
                    <TimeInput></TimeInput>
                ),
                getFieldDecorator("data8", {
                })(
                    <DatePicker picker="range" style={{ width: '100%' }} />
                )
            ]
        },
        {
            title: ['发行人'],
            isSplit: false,// single column
            isRequired: [false],
            children: [getFieldDecorator("data9", {
                initialValue: "发行人", // 初始值
            })(
                <UInput />
            )]
        },
        {
            title: ['企业类型', '主体评级'],
            isSplit: true,// double column
            isRequired: [false, false],
            children: [
                getFieldDecorator("data10", {
                    initialValue: "A", // 初始值
                })(
                    <SSelect style={{ width: '100%', height: '24px' }} placeholder="请选择"
                        optionFilterProp="children">
                        <Option value="A">A</Option>
                        <Option value="B">B</Option>
                        <Option value="C">C</Option>
                    </SSelect>
                ),
                getFieldDecorator("data11", {
                    initialValue: "level", // 初始值
                })(
                    <SSelect style={{ width: '100%', height: '24px' }} placeholder="请选择"
                        optionFilterProp="children">
                        <Option value="level">等级1</Option>
                        <Option value="leve2">等级2</Option>
                        <Option value="leve3">等级3</Option>
                    </SSelect>
                )
            ]
        },
        {
            title: ['招标方式', '招标标的'],
            isSplit: true,// double column
            isRequired: [true, true],
            children: [
                getFieldDecorator("data12", {
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "请选择招标方式",
                        },
                    ],
                    initialValue: "A", // 初始值
                })(
                    <SSelect allowClear style={{ width: '100%', height: '24px' }} placeholder="请选择"
                        optionFilterProp="children">
                        <Option value="A">A~</Option>
                        <Option value="B">B~</Option>
                        <Option value="C">C~</Option>
                    </SSelect>
                ),
                getFieldDecorator("data13", {
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "请选择招标标的",
                        },
                    ],
                    initialValue: "level", // 初始值
                })(
                    <SSelect allowClear style={{ width: '100%', height: '24px' }} placeholder="请选择"
                        optionFilterProp="children">
                        <Option value="level">标的1</Option>
                        <Option value="leve2">标的2</Option>
                        <Option value="leve3">标的3</Option>
                    </SSelect>
                )
            ]
        },
    ]
    /**
     * 
     * @param {*} itemConfig: isSplit: true 2列， false 一列 
     * @returns 
     */
    const renderItem = (itemConfig, index) => {
        // 样式上只支持2列
        const { isSplit = false, children = [<></>, <></>], title = ['', ''], isRequired = [false, false], } = itemConfig
        return (
            isSplit ?
                (
                    <div className={style.splitContainer2} key={index}>
                        <div className={style.lineBlock}>
                            <div className={`${style.leftLabel} ${isRequired[0] && style.required}`}>
                                {title[0]}
                            </div>
                            <div className={style.singleConditionContent}>
                                <Form.Item>
                                    {/* 需要开放，有些受控组件需要手动获取值 */}
                                    {children[0]}
                                </Form.Item>
                            </div>
                        </div>
                        <div className={style.lineBlock}>
                            <div className={`${style.leftLabel} ${isRequired[1] && style.required}`}>
                                {title[1]}
                            </div>
                            <div className={style.singleConditionContent}>
                                <Form.Item>
                                    {children[1]}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div className={style.lineBlock} key={index}>
                        <div className={`${style.leftLabel} ${isRequired[0] && style.required}`}>
                            {title[0]}
                        </div>
                        <div className={style.singleConditionContent}>
                            <Form.Item>
                                {children[0]}
                            </Form.Item>
                        </div>
                    </div>
                )
        )

    }
    const lineSingle = () => {
        return (
            <>
                <Form onSubmit={handleSubmit} className="content">
                    {
                        configList.map((config, index) => (
                            renderItem(config, index)
                        ))
                    }
                </Form>
            </>
        )
    }
    return (
        <div className={style.BondModalContentContainer}>
            {
                lineSingle()
            }
        </div>
    )
}
const WrapBondModalContent = Form.create()(BondModalContent);
export default WrapBondModalContent