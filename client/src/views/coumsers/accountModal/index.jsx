import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
//components
import SModal from '@/components/Modal'
import AccountModalContent from './accountModalContent'
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { Button } from 'ss-ui-library';
import { CONTRACT_ADDRESS, abi } from "@/config/contract";
//style
import style from './index.module.less'

//账户添加编辑
const AccountModal = forwardRef((props, ref) => {
    const web3ModalRef = useRef();
    const [walletConnected, setWalletConnected] = useState(false);
    const [accountLength, setAccountsLength] = useState(0);
    const [hasJoinedAccount, setHasJoinedAccount] = useState(false); // 该用户是否已经加入
    const [modalVisble, setModalVisble] = useState(false);
    const [currentModalData, setCurrentModalData] = useState({});// 存储当前传进来的值
    const [loading, setLoading] = useState(false);
    const [currentAccount, setCurrentAccount] = useState('ox...');
    useEffect(() => {
        // 如果钱包没有链接，那么生成新的web3modal实例，并且链接MetaMask钱包
        if (!walletConnected || modalVisble) {
          web3ModalRef.current = new Web3Modal({
            network: "goerli",
            providerOptions: {},
            disableInjectedProvider: false,
          });
          connectWallet();
        }
        console.log('walletConnected', walletConnected)
         // eslint-disable-next-line
      }, [walletConnected, modalVisble]);
    

    const connectWallet = async () => {
        try {
            // 获取MeataMask的provider,这里默认使用MetaMask
            await getProviderOrSigner(true);
            setWalletConnected(true);

            checkIfAddressInWhitelist();
            getNumberOfWhitelisted();
        } catch (err) {
            console.error(err);
        }
    };
    const getNumberOfWhitelisted = async () => {
        try {
          // 用provider读取blockchain信息
          const provider = await getProviderOrSigner();
          // 使用provider链接contract， 只有只读权限
          const whitelistContract = new Contract(
            CONTRACT_ADDRESS,
            abi,
            provider
          );
          const _number = await whitelistContract.listCount();
          setAccountsLength(_number);
        } catch (err) {
          console.error(err);
        }
    };
    
      const checkIfAddressInWhitelist = async () => {
        try {
          // Signers 也是一种providers
          const signer = await getProviderOrSigner(true);
          const whitelistContract = new Contract(
            CONTRACT_ADDRESS,
            abi,
            signer
          );
          // 获得MetaMask的账户地址
          const address = await signer.getAddress();
          setCurrentAccount(address);
          // call the whitelistedAddresses from the contract
          const _hasJoined = await whitelistContract.accounts(address);// mapping address就是参数， 因为：自动会生成 get函数
          setHasJoinedAccount(_hasJoined);
        } catch (err) {
          console.error(err);
        }
    };
    const getProviderOrSigner = async (needSigner = false) => {
        // 链接 Metamask
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);
    
        // 如果判断没有链接上goerli的测试网络就抛出异常
        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 5) {
          window.alert("Change the network to Goerli");
          throw new Error("Change network to Goerli");
        }
    
        if (needSigner) {
          const signer = web3Provider.getSigner();
          return signer;
        }
        return web3Provider;
      };
    const addAddressToWhitelist = async () => {
        try {
            // We need a Signer here since this is a 'write' transaction.
            const signer = await getProviderOrSigner(true);
            // Create a new instance of the Contract with a Signer, which allows
            // update methods
            const whitelistContract = new Contract(
                CONTRACT_ADDRESS,
                abi,
                signer
            );
            setLoading(true);
            // 加入合约中
            const tx = await whitelistContract.addMember();
            // 等待返回结果，等待transaction被mined
            const res = await tx.wait();
            console.log('res', res)
            setLoading(false);
            setModalVisble(false);
            // 获取下最新名单长度
            await getNumberOfWhitelisted();
            setHasJoinedAccount(true);
        } catch (err) {
            console.error(err);
        }
    };
    const operateModal = (status = false, data = null) => {
        if (data) {
            status && setCurrentModalData(data)
        }
        if(!status){
            addAddressToWhitelist();
        } else {
            setModalVisble(status);
        }
       

    }
    useImperativeHandle(ref, () => ({
        operateModal
    }));
    
    return (
        <>
            <SModal
                title={<>{walletConnected ? currentAccount : '还没有登录'}</>}
                width={currentModalData.width || '500px'}
                maskNotUse={true}
                mask={false}
                maskClosable={false}
                visible={modalVisble}
                buttonCenter={currentModalData.buttonCenter}
                onCancel={()=>{ setModalVisble(false);}}
                footer={[
                    <Button key="submit" type="primary" disabled={hasJoinedAccount} loading={loading} onClick={()=>{operateModal()}}>
                        {hasJoinedAccount ? '已入住' : '申请入住'}
                    </Button>,
                    <div key="info">
                        {`当前入驻人数(${accountLength})`}
                    </div>,
                ]}>
                <div className={style.accountModalContainer}>
                    <AccountModalContent></AccountModalContent>
                </div>
            </SModal>
        </>
    )
})

export default AccountModal