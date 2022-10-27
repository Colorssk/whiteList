//数字字典

//债券状态
let bondStatus = [
    {
        label: '已分配',
        value: 'ASSIGNED'
    },
    {
        label: '已完成',
        value: 'DONE'
    },
    {
        label: '未截标',
        value: 'NO_CLOSING'
    },
    {
        label: '等待分配',
        value: 'WAIT_ASSIGN'
    },
    {
        label: '等待交易',
        value: 'WAIT_TRADING'
    },
]

// 债券类型
let bondType = [
    {
        label: '国债',
        value: 'A101'
    },
    {
        label: '央票',
        value: 'A102'
    },
    {
        label: '地方债',
        value: 'A103'
    },
    {
        label: '金融债',
        value: 'A104'
    },
    {
        label: '短融',
        value: 'A105'
    },
    {
        label: '中票',
        value: 'A106'
    },
    {
        label: '企业债',
        value: 'A107'
    },
    {
        label: '公司债',
        value: 'A108'
    },
    {
        label: 'PPN',
        value: 'A109'
    },
    {
        label: 'ABS',
        value: 'A110'
    },
    {
        label: '金融机构债',
        value: 'A111'
    },
    {
        label: '集合债',
        value: 'A112'
    },
    {
        label: '可转债',
        value: 'A113'
    },
    {
        label: 'NCD',
        value: 'A114'
    },
    {
        label: 'CRM',
        value: 'A115'
    },
    {
        label: '其他',
        value: 'A116'
    },
]

// 期限
let securityTerm = [
    {
        label: '1M',
        value: '1M'
    },
    {
        label: '3M',
        value: '3M'
    },
    {
        label: '6M',
        value: '6M'
    },
    {
        label: '9M',
        value: '9M'
    },
    {
        label: '1Y',
        value: '1Y'
    },
    {
        label: '5Y',
        value: '5Y'
    },
    {
        label: '7Y',
        value: '7Y'
    },
    {
        label: '10Y',
        value: '10Y'
    },
    {
        label: '>10Y',
        value: '>10Y'
    },
]

// 评级
let bondRatingLevelLatest = [
    {
        label: 'AAA+',
        value: 'AAA_PLUS'
    },
    {
        label: 'AAA',
        value: 'AAA'
    },
    {
        label: 'AAA-',
        value: 'AAA_MINUS'
    },
    {
        label: 'AA+',
        value: 'AA_PLUS'
    },
    {
        label: 'AA',
        value: 'AA'
    },
    {
        label: 'AA-',
        value: 'AA_MINUS'
    },
    {
        label: 'A+',
        value: 'A_PLUS'
    },
    {
        label: '其他',
        value: 'OTH'
    },
]

// 企业
let institutionSubtype = [
    {
        label: '央企',
        value: 'CGE'
    },
    {
        label: '国企',
        value: 'LGE'
    },
    {
        label: '民企',
        value: 'PVE'
    },
    {
        label: '其他',
        value: 'OTE'
    },
]
export {
    bondStatus,
    bondType,
    securityTerm,
    bondRatingLevelLatest,
    institutionSubtype
}