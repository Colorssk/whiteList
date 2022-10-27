import React from 'react'
//style
import style from './index.module.less'
//components
import { UInput } from '@/components/Unity'
import { Form } from 'antd'
import SRadio from '@/components/Radio'


const BondModalContent = (props) => {
    const { form } = props;
    const { getFieldDecorator } = form;

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
            title: ['角色'],
            isSplit: false,// single column
            isRequired: [true],
            isRadio: true, // 表示当前是radio，需要默认背景底色
            children: [getFieldDecorator("role", {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        message: "请输入债券全称",
                    },
                ],
                initialValue: "1", // 初始值
            })(
                <SRadio.Group>
                    <SRadio value={"1"}>交易员</SRadio>
                    <SRadio value={"2"}>投资经理</SRadio>
                    <SRadio value={"3"}>研究员</SRadio>
                </SRadio.Group>
            )]
        },
        {
            title: ['状态'],
            isSplit: false,// single column
            isRequired: [true],
            isRadio: true,
            children: [getFieldDecorator("status", {
                initialValue: "1", // 初始值
            })(
                <SRadio.Group>
                    <SRadio value={"1"}>正常</SRadio>
                    <SRadio value={"2"}>冻结</SRadio>
                </SRadio.Group>
            )]
        },
        {
            title: ['姓名'],
            isSplit: false,// single column
            isRequired: [true],
            children: [getFieldDecorator("name", {
                initialValue: "name", // 初始值
            })(
                <UInput />
            )]
        },
        {
            title: ['登录邮箱'],
            isSplit: false,// single column
            isRequired: [true],
            children: [getFieldDecorator("email", {
                initialValue: "email", // 初始值
            })(
                <UInput />
            )]
        },
        {
            title: ['手机'],
            isSplit: false,// single column
            isRequired: [false],
            children: [getFieldDecorator("phone", {
                initialValue: "phone", // 初始值
            })(
                <UInput />
            )]
        },
        {
            title: ['职位'],
            isSplit: false,// single column
            isRequired: [false],
            children: [getFieldDecorator("position", {
                initialValue: "position", // 初始值
            })(
                <UInput />
            )]
        },
        {
            title: ['团队'],
            isSplit: false,// single column
            isRequired: [false],
            children: [getFieldDecorator("team", {
                initialValue: "team", // 初始值
            })(
                <UInput />
            )]
        },
    ]
    /**
     * 
     * @param {*} itemConfig: isSplit: true 2列， false 一列 
     * @returns 
     */
    const renderItem = (itemConfig, index) => {
        // 样式上只支持2列 当前弹窗内容只有一列 后面可能会拓展两列
        const { isSplit = false, children = [<></>, <></>], title = ['', ''], isRadio = false, isRequired = [false, false], } = itemConfig
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
                        <div className={`${style.singleConditionContent} ${isRadio ? style.lineBlockRadio : ''}`}>
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